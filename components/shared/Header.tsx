"use client"

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from 'next/navigation'
import { navLinks } from '@/constants'

const Header = () => {
  const pathname = usePathname();

  return (
    <header className='fixed bg-white z-10 border mt-0 w-full flex flex-row py-2 px-6 lg:px-8 justify-between'>
      <Link href="/"><Image src="/logo.png" alt="logo" width={180} height={28}/></Link>
      <ul className='hidden lg:flex flex-row items-center md:gap-12 lg:gap-16'>
        <li><Link href="/create-image">Create</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        <SignedIn>
          <UserButton showName/>
        </SignedIn>  
        <SignedOut>
          <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </ul>
      <section className='flex lg:hidden'>
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
                <ul className='flex flex-col gap-8 mt-12'>
                  {navLinks.map(link => {
                    const isActive = link.route === pathname
                    return (
                      <li key={link.route}>
                        <Link 
                          href={link.route} 
                          className={`flex flex-row items-center gap-4 font-bold ${isActive && 'text-gray-600'}`}>
                          <Image 
                            src={link.icon} 
                            alt={link.label}
                            width={24}
                            height={24}
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
    </header>
  )
}

export default Header