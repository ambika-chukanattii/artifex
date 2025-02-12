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
    <header className='fixed top-0 left-0 right-0 bg-white z-10 border w-full flex flex-row py-2 px-6 lg:px-8 justify-between'>
      <Link href="/"><Image src="/logo.png" alt="logo" width={180} height={28}/></Link>
      <ul className='hidden lg:flex flex-row items-center md:gap-12 lg:gap-16'>
        <li><Link href="/image/actions/create">Generate</Link></li>
        <li><Link href="/credits">Buy Credits</Link></li>
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
    </header>
  )
}

export default Header