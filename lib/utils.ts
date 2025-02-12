/* eslint-disable prefer-const */
/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "qs" 
import { twMerge } from "tailwind-merge";

import { aspectRatioOptions } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // This is a native JavaScript error (e.g., TypeError, RangeError)
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    // This is a string error message
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    // This is an unknown type of error
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

// PLACEHOLDER LOADER - while image is transforming
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`;
// ==== End

// FORM URL QUERY
export const formUrlQuery = ({
  searchParams,
  key,
  value,
}: FormUrlQueryParams) => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value };

  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}`;
};

// REMOVE KEY FROM QUERY
export function removeKeysFromQuery({
  searchParams,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(searchParams);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  // Remove null or undefined values
  Object.keys(currentUrl).forEach(
    (key) => currentUrl[key] == null && delete currentUrl[key]
  );

  return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
}

// DEBOUNCE
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// GET IMAGE SIZE
export type AspectRatioKey = keyof typeof aspectRatioOptions;
export const getImageSize = (
  type: string,
  image: any,
  dimension: "width" | "height"
): number => {
  if (type === "fill") {
    return (
      aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
      1000
    );
  }
  return image?.[dimension] || 1000;
};

// DOWNLOAD IMAGE
export const download = (url: string, filename: string) => {
  if (!url) {
    throw new Error("Resource URL not provided! You need to provide one");
  }

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobURL;

      if (filename && filename.length)
        a.download = `${filename.replace(" ", "_")}.png`;
      document.body.appendChild(a);
      a.click();
    })
    .catch((error) => console.log({ error }));
};

// DEEP MERGE OBJECTS
export const deepMergeObjects = (obj1: any, obj2: any) => {
  if(obj2 === null || obj2 === undefined) {
    return obj1;
  }

  let output = { ...obj2 };

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === "object" &&
        obj2[key] &&
        typeof obj2[key] === "object"
      ) {
        output[key] = deepMergeObjects(obj1[key], obj2[key]);
      } else {
        output[key] = obj1[key];
      }
    }
  }

  return output;
};

export const calculateIncrements = ({
  currentWidth,
  currentHeight,
  targetAspectRatio,
}: {
  currentHeight: number;
  currentWidth: number;
  targetAspectRatio: string;
}) => {
  // Parse the target aspect ratio
  const [targetWidthRatio, targetHeightRatio] = targetAspectRatio
    .split(":")
    .map(Number);

  // Calculate the aspect ratio target dimensions
  const targetWidth = (currentHeight * targetWidthRatio) / targetHeightRatio;
  const targetHeight = (currentWidth * targetHeightRatio) / targetWidthRatio;

  // Cap the dimensions to be <= 3072 while keeping them multiples of 64
  let maxWidth = Math.min(Math.ceil(targetWidth / 64) * 64, 3072);
  let maxHeight = Math.min(Math.ceil(targetHeight / 64) * 64, 3072);

  // Check if the resulting aspect ratio fits between 1:2.5 and 2.5:1
  const aspectRatio = maxWidth / maxHeight;
  if (aspectRatio > 2.5) {
    // Reduce width to fit the max aspect ratio
    const adjustedWidth = Math.floor(maxHeight * 2.5 / 64) * 64;
    maxWidth = Math.min(adjustedWidth, maxWidth);
  } else if (aspectRatio < 1 / 2.5) {
    // Reduce height to fit the min aspect ratio
    const adjustedHeight = Math.floor(maxWidth / 2.5 / 64) * 64;
    maxHeight = Math.min(adjustedHeight, maxHeight);
  }

  // Calculate the increments
  let totalWidthIncrement = Math.max(0, maxWidth - currentWidth);
  let totalHeightIncrement = Math.max(0, maxHeight - currentHeight);

  // Ensure increments are multiples of 64
  totalWidthIncrement = Math.ceil(totalWidthIncrement / 64) * 64;
  totalHeightIncrement = Math.ceil(totalHeightIncrement / 64) * 64;

  // Split the increments into left/right and up/down
  let incrementLeft = Math.floor(totalWidthIncrement / 2 / 64) * 64;
  let incrementRight = totalWidthIncrement - incrementLeft;

  let incrementUp = Math.floor(totalHeightIncrement / 2 / 64) * 64;
  let incrementDown = totalHeightIncrement - incrementUp;

  // Add extra 64 pixels to each side while ensuring dimensions stay <= 3072
  if (currentWidth + totalWidthIncrement + 128 <= 3072) {
    incrementLeft += 64;
    incrementRight += 64;
  }

  if (currentHeight + totalHeightIncrement + 128 <= 3072) {
    incrementUp += 64;
    incrementDown += 64;
  }

  // Ensure final increments are multiples of 64
  incrementLeft = Math.ceil(incrementLeft / 64) * 64;
  incrementRight = Math.ceil(incrementRight / 64) * 64;
  incrementUp = Math.ceil(incrementUp / 64) * 64;
  incrementDown = Math.ceil(incrementDown / 64) * 64;

  return {
    right: incrementRight,
    left: incrementLeft,
    up: incrementUp,
    down: incrementDown,
  };
};
