import { db } from "@/utils/db";
import { UserData } from "@/utils/schema";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


type ResponseData = {
  message: string,
  url: string | null
}
 
export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "3moplan",
            },
            unit_amount: 100,
          },
          quantity: 1,
        }
      ],
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
    })
    console.log(session)
    // if(session.status === "complete"){
    //   const data = await db.update(UserData).set({isPaidUser: true})
    // }
    return Response.json({ url: session.url, message: "success" })
  } catch (e) {
    return Response.json({ message: "failure" })
  }
}