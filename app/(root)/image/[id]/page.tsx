import { getImageById } from "@/lib/actions/image.actions"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';
import { getUserById } from "@/lib/actions/user.actions";
import ImageView from "@/components/shared/ImageView";

const ImagePage = async({ params }: SearchParamProps) => {
  const { id } = params;
  const { userId } = await auth();

  if(!userId) redirect('/sign-in')

  const image = await getImageById(id);
  const user = await getUserById(userId);

  return (
    <section className='w-full lg:h-screen flex flex-row'>
      <ImageView
        image={image}
      />
    </section>
  )
}

export default ImagePage