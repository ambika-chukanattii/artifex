import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Card from "@/components/shared/Card";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import Search from "@/components/shared/Search";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const searchQuery = (await searchParams)?.query as string || '';
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  let images = await getUserImages(user._id);

  if(searchQuery){
    console.log(images)
    images = images.filter(
      (img:any) =>
        img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="flex flex-col items-center">
      <section className="profile">
        <div className='w-full flex flex-col items-center mt-24'>
          <h1 className='text-3xl font-extrabold mb-2 text-gray-700'>Profile</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-24 mt-12">
          <div className="flex flex-col items-center justify-center border rounded-lg w-72 h-36">
            <p className="p-14-medium md:p-16-medium">CREDITS AVAILABLE</p>
            <div className="mt-4 flex items-center gap-4">
              <Image
                src="/assets/icons/coins.svg"
                alt="coins"
                width={50}
                height={50}
                className="size-9 md:size-12"
              />
              <h2 className="h2-bold text-dark-600">{user.creditBalance}</h2>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border rounded-lg w-72 h-36">
            <p className="p-14-medium md:p-16-medium">IMAGE MANIPULATION DONE</p>
            <div className="mt-4 flex items-center gap-4">
              <Image
                src="/assets/icons/photo.svg"
                alt="coins"
                width={50}
                height={50}
                className="size-9 md:size-12"
              />
              <h2 className="h2-bold text-dark-600">{images.length}</h2>
            </div>
          </div>
        </div>
        <Search />
      </section>

      <div className='w-11/12 flex flex-col lg:flex-row justify-center gap-8 mt-14 lg:mt-20'>
        {
          images && images.map((image: UpdateImageParams) => (
              <Link href={`/image/${image._id}`}><Card image={image} key={image._id}/></Link>
          ))
        }
      </div>
    </div>
  );
};

export default Profile;