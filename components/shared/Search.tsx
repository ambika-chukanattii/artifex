"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const [query, setQuery] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: "query",
          value: query,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [router, searchParams, query]);

  return (
    <section className='w-full mt-8 flex items-center justify-center'>
        <div className='relative w-[600px] lg:w-[800px] flex items-center'>
            <input 
                type='text' 
                onChange={(e) => setQuery(e.target.value)}
                className='w-full py-3 border border-gray-300 rounded-3xl pl-6 pr-12 focus:ring-gray-400 focus:border-gray-400 outline-none text-gray-600'
            />
            <Image 
                src="/assets/icons/search.svg" 
                alt="search"
                width={28}
                height={28}
                className='absolute right-4'
            />
        </div>
    </section>
  )
}

export default Search