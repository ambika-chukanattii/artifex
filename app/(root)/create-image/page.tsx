import FormField from "@/components/shared/ImageCreateForm";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import ImageCreateForm from "@/components/shared/ImageCreateForm";

const CreateImagePage = async() => {
  const { userId } = await auth();

  return (
    <section className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center justify-center mt-24">
        <h1 className="text-3xl font-extrabold mb-2 text-gray-700">Create Image</h1>
        <p className="mb-6 text-gray-500 max-w-[500px] text-center">Generate an imaginative image through Stable Diffusion AI and share it with the community</p>
      </div>
      <ImageCreateForm
        userId={userId}
      />
    </section>
  )
}

export default CreateImagePage