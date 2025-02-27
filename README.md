
# Artifex

Create AI generated images just by entering what you wanna see. Not only generation but also transformation. Transform any image, into new AI generated Image by entering the changes you wish to see in the current image. 

Artifex is a web application which enables you do that. It's built using Next.js. It uses Stability Ai API to get AI generated images and showcases in the frontend. 

Checkout Live - [artifex-alpha.vercel.app](https://artifex-alpha.vercel.app/)
## Tech Stack

- Next.js
- Typescript
- MongoDB
- Clerk
- Stability AI
- Cloudinary
- Stripe
- Shadcn
- Tailwindcss




## Features

- **Authenciation and authorization** - Secure user acess with register, login and route protection.
- **Community Image Showcase** - showcase images in the home page with image search and infinite scrolling.
- **Image Generation** - Generate Images using AI by entering the image you wish to see. 
- **Inpaint** - Restore or make changes in the image by entering the changes you wish to see.
- **Outpaint** - Change the aspect ratio of the image and fill the gap using generative ai.
- **Object Removal** - Remove the object by entering object you wish to remove. 
- **Object Recolor** - Change the color of the object by mentioning the object you wish to recolor and the color
- **Object Replace** - Replace the object by mentioning the object you wish to replace and the replacement object and watch ai seamlessly itegrate the new object into the image.
- **Background Removal** - Remove the image background by uploading image.
- **Background Replace** - Replace the backgrounf image by uploading the image and mentioning the background you wish to see.
- **Download Transformed Images** - Save and share AI-transformed images conveniently.
- **Update Transformed Images** - If you wanna update the transformed image again, we have a feature for ya.
- **Cloudinary Upload Widget** - Image upload made easier by introducing Cloudinary upload widget which gives you acess to google, unsplash, pinterest, and many other websites to upload images on the go. and also you can upload from the files.
- **Transformed Image Details** - You can see the pre and post transformed image in detail in a seperate page.
- **Credit System** - AI SAAS is no SAAS without credits, so yes. you can purchase pro and premium packages to get more credits to create more images.
- **Profile Page** - Access images you created, your credit balance and other details in the profile page.
- **Fully Responsive** - Fully responsive across mobile, tablet and desktop. 




## Quick Start

Clone the repository

```bash
  git clone https://github.com/blue4e2/artifex.git
  cd artifex
```
Installation

```bash
  npm install
```




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
#next
NEXT_PUBLIC_SERVER_URL=

#mongodb
MONGODB_URL=

#clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

#Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

#Stability ai
STABILITY_API_KEY=

#Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```
Run the project
```bash
npm run dev
```


## Deployment

Go to https://vercel.com. 
Create a new project, connect your github account, import the project, add environment variables, and built the deployment. 


## Acknowledgements

 - Inspired and referred website made by [javascript mastery](https://github.com/adrianhajdin/ai_saas_app/tree/main).


## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

