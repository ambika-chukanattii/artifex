import React from 'react'

type cardProps = {
  image: {
      title: string;
      prompt: string;
      imageUrl: string;
    }
};

const Card = ({image}:cardProps) => {
  return (
    <div className='relative group rounded-lg shadow flex items-center'>
      <img 
        src={image.imageUrl}
        alt={image.title} 
        className='w-full h-auto object-cover rounded-lg'
      />
      <div className='group-hover:flex flex-col items-center justify-center hidden absolute w-full h-full bg-black bg-opacity-30 text-white text-lg p-4'>
        <p>{image.prompt}</p>
      </div>
    </div>
  )
}

export default Card