import Link from 'next/link'
import { CLONE_GROUPS, CLONE_PAGES, clonePath } from '@/components/scale-clone/shared/pages'

export default function ScaleCloneIndex() {
  return (
    <div className="mx-auto max-w-[1472px] px-6 pb-32 pt-40">
      <h1 className="text-[40px] leading-[1.1] tracking-[-0.01em] md:text-[64px] md:leading-[1.05]">Scale clone pages</h1>
      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-4">
        {CLONE_GROUPS.map((group) => (
          <div key={group}>
            <p className="font-mono text-[13px] uppercase tracking-[0.05em] text-black/50">{group}</p>
            <ul className="mt-4 space-y-2">
              {CLONE_PAGES.filter((p) => p.group === group).map((p) => (
                <li key={p.slug}>
                  <Link href={clonePath(p.slug)} className="text-[16px] hover:underline">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
