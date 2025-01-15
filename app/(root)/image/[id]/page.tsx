import Card from "@/components/shared/Card"
import Link from "next/link"

const ImagePage = () => {
  return (
    <section className='w-full flex flex-col items-center'>
      <div className="flex flex-col items-center justify-center mt-24">
        <h1 className="text-3xl font-extrabold mb-2 text-gray-700">Image</h1>
        <div className='flex flex-row items-start justify-between w-[600px] lg:w-[800px] mt-12'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <h3 className="text-gray-600">Author</h3>
            <Link href='/profile'>
              <img 
                src="/assets/icons/profile.svg" 
                className='rounded-full w-8 h-8 border'
              />
            </Link>
          </div>
          <div className='flex flex-col items-center justify-center gap-2'>
            <h3 className="text-gray-600">Prompt</h3>
            <p className="font-semibold text-gray-600">Female robot with vibrant colors</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <h3 className="text-gray-600">Download</h3>
            <img src="/assets/icons/download.svg" className="w-6 h-6"/>
          </div>
        </div>
        <div className="mt-10">
          <img src="/assets/images/banner-image1.jpg" className="w-[600px] lg:w-[800px]"/>
        </div>
      </div>
    </section>
  )
}

export default ImagePage