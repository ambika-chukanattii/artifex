"use client"

import { useState } from "react";

const ImageActionSubmit = ({
  handleSubmit,
  isTransforming,
  isSubmitting,
  handleSave
}:{
  handleSubmit:() => void
  isTransforming : boolean;
  isSubmitting : boolean;
  handleSave:() => void
}) => {

  return (
    <div className="flex flex-col mt-8">
        <button 
            type="button"
            className={`button ${(isTransforming) && 'opacity-60'}`}
            // disabled={isTransforming}
            onClick={handleSubmit}
        >
        {/* {isTransforming ? 'Generating...' : 'Generate'} */}
        Generate
        </button>
        <button 
            type="button"
            className="button capitalize mt-4"
            disabled={isSubmitting}
            onClick={handleSave}
        >
        {isSubmitting ? 'Submitting...' : 'Save Image'}
        </button>
    </div>
  )
}

export default ImageActionSubmit