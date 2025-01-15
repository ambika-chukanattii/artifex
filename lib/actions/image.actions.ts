"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server';
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const populateUser = (query: any) => query.populate({
  path: 'author',
  model: User,
  select: '_id firstName lastName clerkId'
})

// ADD IMAGE
export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error("User not found");
    }

    const cloudinaryImage = await cloudinary.uploader.upload(image.imageUrl)

    const newImage = await Image.create({
      ...image,
      imageUrl: cloudinaryImage.url,
      author: author._id,
    })

    redirect('/')

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error)
  }
}

// GET IMAGE
export async function getImageById(imageId: string) {
  try {
    await connectToDatabase();

    const image = await populateUser(Image.findById(imageId));

    if(!image) throw new Error("Image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error)
  }
}

// GET IMAGES
export async function getAllImages(){
  try {
    await connectToDatabase();

    const images = await Image.find({})

    return JSON.parse(JSON.stringify(images))
  } catch (error) {
    handleError(error)
  }
}

// GET IMAGES BY USER
export async function getUserImages(userId: string) {
  try {
    await connectToDatabase();

    const images = await populateUser(Image.find({ author: userId }))

    return JSON.parse(JSON.stringify(images))
  } catch (error) {
    handleError(error);
  }
}