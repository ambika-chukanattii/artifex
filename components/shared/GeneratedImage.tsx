"use client"

import Image from "next/image"
import { CldImage, getCldImageUrl } from "next-cloudinary"
import { dataUrl, debounce, download, getImageSize } from "@/lib/utils"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props"

const GeneratedImage = ({
  newTransformation,
  type, 
  title, 
  isTransforming, 
  setIsTransforming,
  hasDownload
}:{
  newTransformation: TransformationParams;
  type: ImageActionTypeKey;
  title: string;
  isTransforming: boolean;
  setIsTransforming: (value:boolean) => void;
  hasDownload: boolean;
}) => {
  const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    download(getCldImageUrl({
      width: newTransformation.transformedImage.width,
      height: newTransformation.transformedImage.height,
      src: newTransformation.publicId
    }), title)
  }

  return (
    <div className='w-full flex flex-col mt-2 items-center justify-center'>
      <div className='flex-between'>
        { hasDownload && (
          <button 
            className='download-btn'
            onClick={downloadHandler}
          >
            <Image
              src="/assets/icons/download.svg"
              alt="download"
              width={24}
              height={24}
              className="pb-[6px]"
            />
          </button>
        )}
      </div>
      
      { newTransformation.transformedImage?.imageUrl ?
      (
        <div className="flex justify-center items-center cursor-pointer overflow-hidden border border-gray-300 w-[665px] h-[450px] lg:w-[600px] lg:w-[600px]">
          <CldImage
            width={newTransformation.transformedImage.height}
            height={newTransformation.transformedImage.width}
            src={newTransformation.transformedImage.imageUrl}
            alt="image-title"
            sizes={"(max-width: 665px) 100vw 100vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="h-fit max-h-[450px] w-auto object-cover p-2 rounded-lg"
            onLoad={()=>{
              setIsTransforming && setIsTransforming(false)
            }}
            onError={() => {
              debounce(()=>{
                setIsTransforming && setIsTransforming(false)
              },8000)() 
            }}
          />
          {isTransforming && (
            <div className="transforming-loader">
              <Image
                src="/assets/icons/spinner.svg"
                alt="transforming"
                width={50}
                height={50}
              />
              <p className="text-white/80">Please wait...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="border border-gray-300 w-[665px] h-[450px] lg:w-[600px] flex items-center justify-center text-gray-600">
          Generated Image
        </div>
      )}

    </div>
  )
}

export default GeneratedImage