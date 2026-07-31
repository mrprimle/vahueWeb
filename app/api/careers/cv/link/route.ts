import { head, issueSignedToken, presignUrl } from '@vercel/blob'
import { checkBotId } from 'botid/server'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const LINK_LIFETIME = 7 * 24 * 60 * 60 * 1000
const ALLOWED_CONTENT_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])
const CV_PATHNAME =
  /^careers\/senior-smm\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(pdf|doc|docx)$/i

function blobAuth() {
  const storeId = process.env.BLOB_STORE_ID
  if (!storeId) throw new Error('Blob store is not configured.')

  return {
    storeId,
    ...(process.env.NODE_ENV === 'development' &&
    process.env.VERCEL_OIDC_TOKEN
      ? { oidcToken: process.env.VERCEL_OIDC_TOKEN }
      : {}),
  }
}

function requestComesFromThisSite(request: NextRequest) {
  const origin = request.headers.get('origin')
  const forwardedHost = request.headers.get('x-forwarded-host')
  const requestHost = forwardedHost ?? request.headers.get('host')

  if (!origin || !requestHost) return false

  try {
    return new URL(origin).host === requestHost
  } catch {
    return false
  }
}

function jsonResponse(body: object, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

export async function POST(request: NextRequest) {
  if (!requestComesFromThisSite(request)) {
    return jsonResponse({ error: 'Invalid request origin.' }, 403)
  }

  const verification = await checkBotId({
    advancedOptions: { checkLevel: 'basic' },
  })

  if (verification.isBot) {
    return jsonResponse({ error: 'Access denied.' }, 403)
  }

  let pathname = ''

  try {
    const body = (await request.json()) as { pathname?: unknown }
    pathname = typeof body.pathname === 'string' ? body.pathname : ''
  } catch {
    return jsonResponse({ error: 'Invalid link request.' }, 400)
  }

  if (!CV_PATHNAME.test(pathname)) {
    return jsonResponse({ error: 'Invalid CV pathname.' }, 400)
  }

  try {
    const credentials = blobAuth()
    const blob = await head(pathname, credentials)

    if (
      blob.size > MAX_FILE_SIZE ||
      !ALLOWED_CONTENT_TYPES.has(blob.contentType)
    ) {
      return jsonResponse({ error: 'Invalid CV file.' }, 400)
    }

    const validUntil = Date.now() + LINK_LIFETIME
    const signedToken = await issueSignedToken({
      pathname,
      operations: ['get'],
      validUntil,
      ...credentials,
    })
    const { presignedUrl } = await presignUrl(signedToken, {
      access: 'private',
      operation: 'get',
      pathname,
      validUntil,
      useCache: false,
    })

    return jsonResponse({
      url: presignedUrl,
      expiresAt: new Date(validUntil).toISOString(),
    })
  } catch (error) {
    console.error('CV link creation error:', error)
    return jsonResponse({ error: 'Could not create a private CV link.' }, 500)
  }
}
