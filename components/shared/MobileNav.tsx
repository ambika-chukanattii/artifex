"use client"

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from 'next/navigation'
import { navLinks } from '@/constants'


const MobileNav = () => {
  const pathname = usePathname()

  return (
    <section className='fixed top-3 right-5 flex z-10 lg:hidden'>
        <Sheet>
          <SheetTrigger>
            <Image 
              src="/assets/icons/menu.svg"
              alt="menu"
              width={32}
              height={32}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent className="w-64">
            <div className='w-full'>
              <Image src="/logo.png" alt="logo" width={180} height={28}/>
            </div>
              <SignedIn>
                <ul className='flex flex-col gap-7 ml-1 mt-10 text-gray-600'>
                  {navLinks.map(link => {
                    const isActive = link.route === pathname
                    return (
                      <li key={link.route}>
                        <Link 
                          href={link.route} 
                          className={`flex flex-row items-center gap-4 font-bold ${isActive && 'text-black'}`}>
                          <Image 
                            src={link.icon} 
                            alt={link.label}
                            width={24}
                            height={24}
                            className={`${isActive && 'brightness-20'}`}
                          />
                          {link.label}
                        </Link>
                      </li>
                  )})}
                  <li className="flex flex-row font-bold items-center gap-4 cursor-pointer">
                    <UserButton/>
                    <span>User</span>
                  </li>
                </ul>
              </SignedIn>  
              <SignedOut>
                <Button asChild>
                  <Link href="/sign-in">Login</Link>
                </Button>
              </SignedOut>
          </SheetContent>
        </Sheet>
      </section>
  )
}

export default MobileNav