import Image from 'next/image'

const Search = () => {
  return (
    <section className='w-full mt-8 flex items-center justify-center'>
        <div className='relative w-[600px] lg:w-[800px] flex items-center'>
            <input 
                type='text' 
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