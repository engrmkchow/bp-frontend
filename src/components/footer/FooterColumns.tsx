'use client'
import Link from 'next/link'

export default function FooterColumns({ columns }: { columns: Record<string, { label: string; path: string }[]> }) {
  return (
    <>
      {Object.entries(columns).map(([columnName, items], index) => (
        <div className="px-2 pt-8 text-md" key={index}>
          <h6 className="uppercase tracking-tight mb-2 font-bold text-gray-100">{columnName}</h6>
          <ul className="space-y-2 text-sm text-gray-300">
            {items.map((item, i) => (
              <li key={i}>
                <Link href={item.path} className="hover:underline hover:text-gray-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}
