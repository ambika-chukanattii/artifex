"use client"

import { useState } from "react";
import { addImage } from "@/lib/actions/image.actions"
import { usePathname } from "next/navigation";

type FormState = {
  title: string;
  prompt: string;
  imageUrl: string;
};

const ImageCreateForm = ({ userId }: {userId: string | null}) => {
  const path = usePathname()
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: '',
    prompt: '',
    imageUrl: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleImageGeneration = async() => {
    setLoading(true)
    setGeneratingImg(true)

    console.log(form)

    const formData = new FormData

    formData.append("prompt",form.prompt)
    formData.append("output_format","png")

  try{
      const res = await fetch(`https://api.stability.ai/v2beta/stable-image/generate/core`, {
          method: 'POST',
          headers: {
              Authorization: `Bearer sk-uffgUgHwLeQBZMRzF0f587fG4Y0QZ8gu44NrbzH1oPGFGbeC`,
              Accept: "application/json",
          },
          body: formData
      });

      if(res.ok){
        const data = await res.json();
        if(data){
          const photoBase64 = `data:image/jpeg;base64,${data.image}`
          setForm({
            ...form,
            imageUrl: photoBase64
          })
        }
      }else{
        const errorText = await res.text()
        console.log(errorText)
      }
    }catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
      setGeneratingImg(false);
    }
  }

  const handleShareWithCommunity = async(e: any) => {
    e.preventDefault()
    setLoading(true)
    setSharing(true)
    try{
      const res = await addImage({
        image: {
          title: "red dot",
          prompt: "red dot stuff",
          imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        },
        userId: userId,
        path: path
      })

      console.log("image shared",res);
    }catch(err){
      console.log("error sharing", err)
    }finally{
      setLoading(false)
      setSharing(false)
    }
  }

  return (
    <div className="w-full flex flex-col lg:flex-row items-center mt-12 gap-12">
        <div className="w-full flex items-center justify-center max-w-11/12 h-auto">
          {form.imageUrl ? (
            <img src={form.imageUrl} alt="generated image"/>
          ):(
            <img src="/assets/images/banner-image1.jpg" alt="generated image"/>
          )}
        </div>
        <div className="w-full flex flex-col items-center justify-center">
            <form className="w-full">
            <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-gray-500">Image Name</label>
              <input type="text" name="title" value={form.title} onChange={(e) => handleInputChange(e)} className="border py-3 px-4 rounded-lg outline-none focus:border-gray-400 text-[17px]"/>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-500">Prompt</label>
              <input type="text" name="prompt" value={form.prompt} onChange={(e) => handleInputChange(e)} className="border p-3 rounded-lg outline-none focus:border-gray-400 text-[17px]"/>
            </div>
            {/* <div className="flex flex-col">
              <label className="text-gray-500">Aspect Ratio</label>
              <select name="aspectRatio" value={form.aspectRatio} onChange={(e) => handleInputChange(e)} className="border p-3 rounded-lg outline-none focus:border-gray-400 text-[17px]">
                <option>1:1</option>
                <option>3:2</option>
                <option>2:3</option>
                <option>16:9</option>
                <option>9:16</option>
              </select>
            </div> */}
            </div>

            <div className="mt-8 flex gap-5">
              <button
                type="button"
                onClick={handleImageGeneration}
                className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {generatingImg ? 'Generating...' : 'Generate'}
              </button>
            </div>

            <div className="mt-8">
              <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
              <button
                type="submit"
                onClick={(e) => handleShareWithCommunity(e)}
                className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {sharing ? 'Sharing...' : 'Share with the Community'}
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default ImageCreateForm