"use client"
 
import { useForm } from "react-hook-form"
import { aspectRatioOptions, creditFee, defaultValues, imageActions } from "@/constants"
import { useEffect, useMemo, useState, useTransition } from "react"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import MediaUploader from "./MediaUploader"
import { getCldImageUrl } from "next-cloudinary"
import { addImage } from "@/lib/actions/image.actions"
import { redirect, useRouter } from "next/navigation"
import GeneratedImage from "./GeneratedImage"
import ImageActionFields from "./ImageActionFields"
import ImageActionSubmit from "./ImageActionSubmit"
import Sidebar from "./Sidebar"
import { urlToPng } from "@/lib/async_utils"
import { urlPath } from "@/constants"
import { calculateIncrements } from "@/lib/utils"
import path from "path"

const ImageActionForm = ({ action, data = null, userId, type, creditBalance }: ImageActionFormProps) => {
  const imageAction = imageActions[type];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  if(action==='Update'){
    console.log(data)
    data = {
      title: data.title,
      prompt: data?.prompt,
      selectPrompt: data?.selectPrompt,
      publicId: "",
      originalImage: {
        imageUrl: data.originalImage?.imageUrl,
        width: data.originalImage?.width,
        height: data.originalImage?.height,
      },
      transformedImage: {
        imageUrl: data.transformedImage?.imageUrl,
        width: data.transformedImage?.width,
        height: data.transformedImage?.height,
        aspectRatio: data.transformedImage?.aspectRatio
      }
    }
  }else{
    data = defaultValues
  }

  const [newTransformation, setNewTransformation] = useState<TransformationParams>(data)

  const onTransformHandler = async({ fieldName, value }: { fieldName: string; value: string }) => {
    setNewTransformation((prev:any) => ({
      ...prev,
      [fieldName]: value
    }))
  }

  async function createImageSubmit() {

    const body = JSON.stringify({
      text_prompts: [
        {
          text: newTransformation.prompt,
        },
      ],
      width: 1024,
      height: 1024,
      style_preset: newTransformation.selectPrompt
    })

    try{
      const res = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: body
      })

      if(res.status===200){
        const imageData = await res.json()
        console.log(imageData)
        const imageUrl = `data:image/png;base64,${imageData.artifacts[0].base64}`
        setNewTransformation((prev:any) => ({
          ...prev,
          transformedImage: {
            ...prev.transformedImage,
            imageUrl: imageUrl
          }
        }))
      }
    }catch(err){
      alert(err)
    }
  }

  async function getPayload(type:ImageActionTypeKey) {
   if(type=='recolor'){
      const payload = newTransformation
      const pngImg = await urlToPng(payload.originalImage.imageUrl)

      console.log(pngImg)

      const formData = new FormData();
      formData.append('image', pngImg, 'image.png')
      formData.append('prompt', payload.prompt)
      formData.append('select_prompt', payload.selectPrompt)

      return formData
    }else if(type=='replace'){
      const payload = newTransformation

      const pngImg = await urlToPng(payload.originalImage.imageUrl)

      const formData = new FormData();

      formData.append('image', pngImg)
      formData.append('prompt', payload.prompt)
      formData.append('search_prompt', payload.selectPrompt)

      return formData
    }else if(type==='inpaint'){
      const payload = newTransformation

      const pngImg = await urlToPng(payload.originalImage.imageUrl)

      const formData = new FormData();

      formData.append('image', pngImg)
      formData.append('prompt', payload.prompt)

      return formData
    }else if(type==='outpaint'){
      const payload = newTransformation
      const pngImg = await urlToPng(payload.originalImage.imageUrl)

      const dimension = calculateIncrements({
        currentWidth: payload.originalImage.width,
        currentHeight: payload.originalImage.width,
        targetAspectRatio: payload.transformedImage.aspectRatio
      })

      console.log(dimension)

      const formData = new FormData();

      formData.append('image', pngImg)
      formData.append('left', dimension.left.toString())
      formData.append('right', dimension.right.toString())
      formData.append('up', dimension.up.toString())
      formData.append('down', dimension.down.toString())

      return formData
    }else if(type==="remove"){
      const payload = newTransformation

      const pngImg = await urlToPng(payload.originalImage.imageUrl)

      const formData = new FormData();

      formData.append('image', pngImg)

      return formData
    }else if(type==="backgroundRemove"){
      const payload = newTransformation

      const pngImg = await urlToPng(payload.originalImage.imageUrl)

      const formData = new FormData();

      formData.append('image', pngImg, 'image.png')

      return formData
    }else if(type==="backgroundReplace"){
      const payload = newTransformation

      const pngImg = await urlToPng(payload.originalImage.imageUrl)

      const formData = new FormData();

      formData.append('image', pngImg)
      formData.append('background_prompt', payload.prompt)

      return formData
    }
  }

  async function onSubmitHandler() {
    if(type==='create'){
      createImageSubmit()
    }else{

      const body = await getPayload(type)

      console.log(body)

      try{
        const res = await fetch(`https://api.stability.ai/v2beta/stable-image/edit/${urlPath[type]}`,
        {
          method: "POST",
          body: body,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.API_KEY}`,
          }
        })

        if(res.status===200){
          const imageData = await res.json()
          console.log(imageData.image)
          const imageUrl = `data:image/png;base64,${imageData.image}`
          console.log(imageUrl)
          setNewTransformation((prev:any) => ({
            ...prev,
            transformedImage: {
              ...prev.transformedImage,
              imageUrl: imageUrl
            }
          }))
        }
      }catch(err){
        console.log(err)
      }
    }
  }

  async function onSaveHandler() {
    try{
      const data = newTransformation

      const body = {
        title: data.title,
        prompt: data.prompt,
        transformationType: type,
        selectPrompt: data.selectPrompt,
        originalImage: data.originalImage,
        transformedImage: data.transformedImage
      }
      console.log(body)
      
      const res = await addImage({
        image: body,
        userId: userId
      })
      console.log("it saved",res)
      redirect("/")
    }catch(err){
      console.log(err)
    }
  }

  console.log(newTransformation)

  return (
    <section className="w-full flex flex-row">
      <div className="w-full flex flex-col mt-28 lg:mt-24">
        <div className='w-full flex flex-col items-center justify-center'>
          <h1 className='text-3xl font-extrabold mb-2 text-gray-700'>{imageAction.title}</h1>
          <h4 className='mb-6 text-gray-500 max-w-[500px] text-center'>{imageAction.subTitle}</h4>
        </div>
        <form className="mx-8">
            <div className="w-full flex flex-col lg:flex-row lg:gap-6 items-center justify-center">
              <div className="lg:hidden w-[665px] flex justify-center">
                <ImageActionFields
                  type={type}
                  OnTransformChange={onTransformHandler}
                  form={newTransformation}
                />
              </div>
              <div className="w-full mt-6 lg:mt-4 flex flex-col 2xl:flex-row lg:gap-6 justify-center items-center">
              { type !== 'create' &&
                  <div className="mb-6 lg:mb-0">
                      <label className="input-label">Original Image</label>
                      <MediaUploader 
                        newTransformation={newTransformation}
                        setNewTransformation={setNewTransformation}
                        publicId={newTransformation.publicId}
                      />
                  </div>
              }
              <div className="">
                  <label className="input-label">Generated Image</label>
                  <GeneratedImage
                      newTransformation={newTransformation}
                      type={type}
                      title={newTransformation.title}
                      isTransforming={isTransforming}
                      setIsTransforming={setIsTransforming}
                      hasDownload={false}
                  />
              </div>
              </div>
              <div className="lg:hidden w-[665px]">
              <ImageActionSubmit
                isSubmitting={isSubmitting}
                isTransforming={isTransforming}
                handleSubmit={onSubmitHandler}
                handleSave={onSaveHandler}
              />
              </div>
            </div>
        </form>
      </div>
      <div className="hidden lg:flex mt-14">
        <Sidebar
          type={imageAction.type as ImageActionTypeKey}
          form={newTransformation}
          OnTransformChange={onTransformHandler}
          isSubmitting={isSubmitting}
          isTransforming={isTransforming}
          handleSubmit={onSubmitHandler}
          handleSave={onSaveHandler}
        />
      </div>
    </section>
  )
}

export default ImageActionForm