"use client"

import { useToast } from "@/hooks/use-toast"
import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget } from "next-cloudinary"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image"

type MediaUploaderProps = {
    newTransformation: TransformationParams;
    setNewTransformation: React.Dispatch<any>;
    publicId: string;
}

const MediaUploader = ({
    newTransformation,
    setNewTransformation,
    publicId
}: MediaUploaderProps) => {
    const { toast } = useToast()
    console.log(newTransformation);

    const onUploadSuccessHandler = (result: any) => {
        setNewTransformation((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            originalImage: {
                width: result?.info?.width,
                height: result?.info?.height,
                imageUrl: result?.info?.secure_url
            }
        }))

        toast({
            title: "Upload Successful",
            description: "one credit deducted",
            duration: 3000,
            className: "success-toast"
        })
    }

    const onUploadErrorHandler = (result: any) => {
        toast({
            title: "Something wrong",
            description: "one credit deducted",
            duration: 3000,
            className: "success-toast"
        })
    }

    return (
        <CldUploadWidget
            uploadPreset="artify"
            options={{
                multiple: false,
                resourceType: "image",  
            }}
            onSuccess={onUploadSuccessHandler}
            onError={onUploadErrorHandler}
        >
            {({ open }) => (
                <div className="flex flex-col mt-2 lg:gap-4">
                    {publicId ? (
                        <>
                            <div className="flex justify-center items-center cursor-pointer overflow-hidden border border-gray-300 w-[665px] h-[450px] lg:w-[600px] lg:w-[600px]">
                                <CldImage
                                    width={newTransformation.originalImage.width}
                                    height={newTransformation.originalImage.width}
                                    src={publicId}
                                    alt="image"
                                    sizes={"(max-width: 665px) 100vw, 100vw"}
                                    placeholder={dataUrl as PlaceholderValue}
                                    className="h-fit max-h-[450px] w-auto object-cover p-2 rounded-lg"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="border border-gray-300 w-[665px] h-[450px] lg:w-[600px] flex flex-col items-center justify-center" onClick={() => open()}>
                            <Image
                                src="/assets/icons/add.svg"
                                alt="Add Image"
                                width={24}
                                height={24}
                                className="cursor-pointer"
                            />
                            <p className="mt-2 text-gray-600">Click here to upload Image</p>
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    )
}

export default MediaUploader