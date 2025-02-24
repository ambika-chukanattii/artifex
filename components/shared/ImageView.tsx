"use client"

import { deleteImage } from "@/lib/actions/image.actions"
import { download } from "@/lib/utils"
import { redirect } from "next/navigation"

const ImageView = ({ image, userId }: {image: UpdatedImageParams, userId: string}) => {

    const handleDownload = () => {
        download(image.transformedImage.imageUrl,"image")
    }

    const handleDelete = async() => {
        console.log(image._id)
        try{
            const res = await deleteImage(image._id)
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }

    const handleEdit = () => {
        redirect(`/image/${image._id}/update`)
    }

    return (
        <div className="mx-12 w-full flex flex-col mt-28 mb-12 lg:mt-24">
            <div className='w-full flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-extrabold mb-2 text-gray-700'>Image</h1>
            </div>
            <div className="w-full flex flex-col items-center justify-center mt-4">
            <div className="text-xl mb-2 text-gray-500 mb-8">
            {image.title}
            </div>
            <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-24">
                { (image.transformationType!='create') &&  
                (
                    <div>
                    <h3 className="mb-4">Original</h3>
                    <div className="flex items-center justify-center w-[600px] h-[450px] border border-gray-300 p-2">
                    { image.originalImage.imageUrl ? 
                        <img 
                        src={image.originalImage.imageUrl} 
                        alt={image.title}
                        className="max-w-[600px] h-[450px] w-auto"
                        />
                        :
                        <div className="w-[600px] h-[450px] flex items-center justify-center">
                        Image Not Available
                        </div>
                    }
                    </div>
                    </div>
                )
                }
                <div className="">
                <div className="flex flex-row justify-between mb-4">
                    <h3>Transformed</h3>
                    <div className="flex flex-row gap-6 items-center">
                        {image.author.clerkId==userId &&
                            <div className="flex flex-row gap-6 items-center">
                                <img 
                                    src="/assets/icons/delete.svg"
                                    className="cursor-pointer w-5 h-5"
                                    onClick={handleDelete}
                                />
                                <img 
                                    src="/assets/icons/edit.svg"
                                    className="cursor-pointer w-5 h-5"
                                    onClick={handleEdit}
                                />
                            </div>
                        }
                    <img 
                        src="/assets/icons/download.svg"
                        className="cursor-pointer w-6 h-6"
                        onClick={handleDownload}
                    />
                    </div>
                </div>
                <div className="flex items-center justify-center w-[600px] h-[450px] border border-gray-300 p-2">
                    <img 
                    src={image.transformedImage.imageUrl} 
                    alt={image.title}
                    className="max-w-[600px] h-[450px] w-auto"
                    />
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ImageView