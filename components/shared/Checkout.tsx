"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { useToast } from "@/hooks/use-toast"
import { checkoutCredits } from "@/lib/actions/transaction.actions";

import { Button } from "../ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const { toast } = useToast()

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

useEffect(() => {
  const query = new URLSearchParams(window.location.search);
  console.log(query)
  if (query.get("success")) {
    toast({
      title: "Order placed! You will receive an email confirmation."
    });
  }

  if (query.get("canceled")) {
    toast({
      title: "Order canceled! Continue to shop around and checkout when you're ready."
    });
  }
}, []);


  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-purple-gradient bg-cover"
        >
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default Checkout;