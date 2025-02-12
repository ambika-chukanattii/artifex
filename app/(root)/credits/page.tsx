import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/Checkout";

const Credits = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <section className="mt-24 mx-32">
        <div className='w-full flex flex-col items-center'>
          <h1 className='text-3xl font-extrabold mb-2 text-gray-700'>Buy Credits</h1>
          <h4 className='mb-12 text-gray-500 max-w-[500px] text-center'>Select suitable plans and enjoy creating art.</h4>
        </div>
        <ul className="grid grid-cols-1 gap-12 sm:grid-cols-1 md:grid-cols-2 md:gap-16 xl:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.name} className="w-full flex flex-col justify-center items-center rounded-[16px] border border-gray-300 bg-white p-8 shadow-xl shadow-purple-200/20 lg:max-w-none">
              <div className="flex items-center flex-col gap-3">
                <Image src={plan.icon} alt="check" width={50} height={50} />
                <p className="p-20-bold mt-2 text-lg font-bold">
                  {plan.name}
                </p>
                <p className="h1-semibold text-dark-600">${plan.price}</p>
                <p className="p-16-regular">{plan.credits} Credits</p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${
                        inclusion.isIncluded ? "check.svg" : "cross.svg"
                      }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="p-16-regular">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <Button>
                  Free Consumable
                </Button>
              ) : (
                <SignedIn>
                  <Button>
                    <Checkout
                      plan={plan.name}
                      amount={plan.price}
                      credits={plan.credits}
                      buyerId={user._id}
                    />
                  </Button>
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Credits;