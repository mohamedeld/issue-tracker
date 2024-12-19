'use client';
import Link from 'next/link'
import {usePathname} from "next/navigation"
import React from 'react'
import { AiFillBug } from "react-icons/ai"
const Navbar = () => {
  const pathname = usePathname();
  const links = [
    {
      label: 'Dashboard',
      href: "/"
    },
    {
      label: 'Issues',
      href: "/issues"
    }
  ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className='flex space-x-6'>

        {
          links?.map(item => {
            return (
              <li key={item?.label}>
                <Link className={`${pathname === item?.href ? 'text-zinc-900':'text-zinc-500'} hover:text-zinc-900 transition-colors`} href={item?.href}>{item?.label}</Link>
              </li>
            )
          })
        }


      </ul>
    </nav>
  )
}

export default Navbar