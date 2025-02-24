declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== IMAGE PARAMS
declare type AddImageParams = {
  image: {
    title: string;
    prompt: string;
    transformationType: string;
    selectPrompt: string;
    originalImage: {
      imageUrl: string;
      width: number;
      height: number;
    };
    transformedImage: {
      imageUrl: string;
      width: number;
      height: number;
      aspectRatio: string;
    };
  };
  userId: string;
};

declare type UpdateImageParams = {
  _id: string;
  userId: string;
  title: string;
  prompt: string;
  transformationType: string;
  selectPrompt: string;
  originalImage: {
    imageUrl: string;
    width: number;
    height: number;
  };
  transformedImage: {
    imageUrl: string;
    width: number;
    height: number;
    aspectRatio: string;
  };
};

declare type UpdatedImageParams = {
  title: string;
  prompt: string;
  selectPrompt: string;
  transformationType: string;
  originalImage: {
    imageUrl: string;
    width: number;
    height: number;
  };
  transformedImage: {
    imageUrl: string;
    width: number;
    height: number;
    aspectRatio: string;
  };
  author: {
    clerkId: string;
    firstName: string;
    lastName: string;
    _id: string;
  };
  _id: string;
};

declare type TransformationParams = {
  title: string;
  prompt: string;
  selectPrompt: string;
  aspectRatio: string;
  publicId: string;
  originalImage: {
    imageUrl: string;
    width: number;
    height: number;
  },
  transformedImage: {
    imageUrl: string;
    width: number;
    height: number;
    aspectRatio: string;
  }
};

// ====== TRANSACTION PARAMS
declare type CheckoutTransactionParams = {
  plan: string;
  credits: number;
  amount: number;
  buyerId: string;
};

declare type CreateTransactionParams = {
  stripeId: string;
  amount: number;
  credits: number;
  plan: string;
  buyerId: string;
  createdAt: Date;
};

declare type ImageActionTypeKey =
  | "create"
  | "inpaint"
  | "outpaint"
  | "remove"
  | "recolor"
  | "replace"
  | "backgroundRemove"
  | "backgroundReplace";

// ====== URL QUERY PARAMS
declare type FormUrlQueryParams = {
  searchParams: string;
  key: string;
  value: string | number | null;
};

declare type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

declare type RemoveUrlQueryParams = {
  searchParams: string;
  keysToRemove: string[];
};

declare type SearchParamProps = {
  params: Promise<{ 
    id: string; 
    type?: ImageActionTypeKey 
  }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type ImageActionFormProps = {
  action: "Add" | "Update";
  userId: string;
  type: ImageActionTypeKey;
  creditBalance: number;
  data?: IImage | null;
  config?: Transformations | null;
};

declare type TransformedImageProps = {
  _id: string;
  title: string;
  prompt?: string;
  transformationType: string;
  imageUrl?: string; 
  width?: number;
  height?: number;
  transformationUrl: string; 
  aspectRatio?: string;
  author: string;
};