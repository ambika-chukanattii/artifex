"use server"

import sharp from "sharp"

export const urlToPng = async (url: string) => {
  console.log(url);
  const imgRes = await fetch(url);

  if (!imgRes.ok) {
    throw new Error("Failed to fetch image");
  }

  const imageBuffer = await imgRes.arrayBuffer();

  const metadata = await sharp(Buffer.from(imageBuffer)).metadata();
  const { width, height } = metadata;

  if (!width || !height) {
    throw new Error("Invalid image dimensions");
  }

  // Constraints
  const minAspectRatio = 1 / 2.5; // 0.4 (Portrait)
  const maxAspectRatio = 2.5; // 2.5:1 (Landscape)
  const minSize = 512;
  const maxSize = 3072;

  let targetWidth = width;
  let targetHeight = height;

  const originalAspectRatio = width / height;

  // Adjust aspect ratio
  if (originalAspectRatio < minAspectRatio) {
    // Too tall, adjust height to match the minimum aspect ratio
    targetHeight = Math.round(targetWidth / minAspectRatio);
  } else if (originalAspectRatio > maxAspectRatio) {
    // Too wide, adjust width to match the maximum aspect ratio
    targetWidth = Math.round(targetHeight * maxAspectRatio);
  }

  // Scale dimensions to fit within maxSize while maintaining aspect ratio
  if (targetWidth > maxSize || targetHeight > maxSize) {
    const scale = maxSize / Math.max(targetWidth, targetHeight);
    targetWidth = Math.round(targetWidth * scale);
    targetHeight = Math.round(targetHeight * scale);
  }

  // Ensure dimensions are a multiple of 64, within the constraints
  targetWidth = Math.min(
    maxSize,
    Math.max(minSize, Math.floor(targetWidth / 64) * 64)
  );
  targetHeight = Math.min(
    maxSize,
    Math.max(minSize, Math.floor(targetHeight / 64) * 64)
  );

  // Resize the image using Sharp
  const pngBuffer = await sharp(Buffer.from(imageBuffer))
    .resize({
      width: targetWidth,
      height: targetHeight,
      fit: sharp.fit.inside,
      withoutEnlargement: true, // Avoid enlarging the image
    })
    .png()
    .toBuffer();

  return new Blob([pngBuffer], { type: "image/png" });
};
