import { issueSignedToken } from '@vercel/blob'
import {
  handleUploadPresigned,
  type HandleUploadPresignedBody,
} from '@vercel/blob/client'
import { checkBotId } from 'botid/server'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const TOKEN_LIFETIME = 5 * 60 * 1000
const ALLOWED_CONTENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
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

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    },
  )
}

export async function POST(request: NextRequest) {
  let body: HandleUploadPresignedBody

  try {
    body = (await request.json()) as HandleUploadPresignedBody
  } catch {
    return jsonError('Invalid upload request.', 400)
  }

  if (body.type === 'blob.generate-presigned-url') {
    if (!requestComesFromThisSite(request)) {
      return jsonError('Invalid request origin.', 403)
    }

    const verification = await checkBotId({
      advancedOptions: { checkLevel: 'basic' },
    })

    if (verification.isBot) {
      return jsonError('Upload denied.', 403)
    }
  }

  try {
    const result = await handleUploadPresigned({
      request,
      body,
      getSignedToken: async (pathname) => {
        if (!CV_PATHNAME.test(pathname)) {
          throw new Error('Invalid CV pathname.')
        }

        const validUntil = Date.now() + TOKEN_LIFETIME
        const token = await issueSignedToken({
          pathname,
          operations: ['put'],
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_FILE_SIZE,
          validUntil,
          ...blobAuth(),
        })

        return {
          token,
          urlOptions: {
            allowedContentTypes: ALLOWED_CONTENT_TYPES,
            maximumSizeInBytes: MAX_FILE_SIZE,
            validUntil,
            addRandomSuffix: false,
            allowOverwrite: false,
            cacheControlMaxAge: 60,
          },
        }
      },
    })

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('CV upload authorization error:', error)
    return jsonError('Could not authorize this upload.', 400)
  }
}
