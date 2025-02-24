import Image from 'next/image'
import Search from '@/components/shared/Search'
import Card from '@/components/shared/Card'
import { getAllImages } from "@/lib/actions/image.actions"
import Link from 'next/link'

const CommunityPage = async({ searchParams }: SearchParamProps) => {
  console.log(searchParams)
  const searchQuery = (searchParams?.query as string) || '';
  let images = await getAllImages()
  console.log(images)

  if(searchQuery){
    console.log(images)
    images = images.filter(
      (img:any) =>
        img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <main className='w-full h-full flex flex-col items-center'>
      <div className='w-full flex flex-col items-center mt-28'>
        <h1 className='text-3xl font-extrabold mb-2 text-gray-700'>Community Showcase</h1>
        <h4 className='mb-6 text-gray-500 max-w-[500px] text-center'>Browse through a collection of imaginative and visually stunning images generated by artifex</h4>
        <Search />
      </div>
      <div className='w-11/12 flex flex-col lg:flex-row justify-center gap-8 mt-14 lg:mt-20'>
        {
            images && images.map((image: UpdateImageParams) => (
                <Link href={`/image/${image._id}`}><Card image={image} key={image._id}/></Link>
            ))
        }
      </div>
    </main>
  )
}

export default CommunityPage