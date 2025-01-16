import Card from "@/components/shared/Card"
import Search from "@/components/shared/Search"
import Image from "next/image"

const ProfilePage = () => {
  return (
    <>
      <div className='w-full flex flex-col items-center'>
        <div className="w-full flex flex-col items-center justify-center mt-24">
          <h1 className="text-3xl font-extrabold mb-2 text-gray-700">Profile</h1>
          <div className="w-full flex flex-row w-[600px] lg:w-[800px] justify-between mt-12 mb-8">
            <div className="flex flex-col items-center justify-center">
              <img src="/assets/icons/profile.svg" className="rounded-full border w-24 h-24 object-cover"/>
              <p className="font-bold mt-4 text-gray-800 text-[#4c5c68]">Kaya</p>
            </div>
            <div className="flex p-8 border text-slate-800 rounded-3xl flex flex-col justify-center items-center gap-2">
              <p className="font-semibold text-lg text-[#4c5c68]">Number of Images Created</p>
              <p className="font-bold text-3xl text-[#4c5c68]">24</p>
            </div>
          </div>
        </div>
        <Search/>
        <div className="flex justify-center items-center w-11/12 mt-12">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 lg:gap-4">
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage