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
      title: string,
      prompt: string,
      imageUrl: string
    };
    userId: string | null;
    path: string;
  };