"use client"

import { useState } from 'react'
import { aspectRatioOptions, defaultValues } from '@/constants'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AspectRatioKey } from '@/lib/utils'
import ImageActionFields from './ImageActionFields'
import { useRouter } from "next/navigation";
import ImageActionSubmit from './ImageActionSubmit'

type SideBarProps = {
    type: ImageActionTypeKey;
    form: TransformationParams;
    OnTransformChange: ({ fieldName, value }: { fieldName: string; value: string }) => void;
    isSubmitting: boolean;
    isTransforming: boolean;
    handleSubmit: () => void;
    handleSave: () => void;
}

const Sidebar = ({ type, form, OnTransformChange, isSubmitting, isTransforming, handleSubmit, handleSave }: SideBarProps) => {

  const router = useRouter()

  const [value, setValue] = useState('create')

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    if(selectedType){
        router.push(`/image/actions/${selectedType}`); 
    }
  };

    return (
        <aside className='fixed right-0 hidden lg:flex bg-white w-[420px] h-screen border-l flex-col pl-8'>
            <div className='flex flex-col w-[350px] mt-12 mb-8'>
                <label className='input-label'>Select Image Action</label>
                <select 
                    onChange={handleTypeChange}
                    value={type}
                    className='py-3 px-3 mt-1 text-gray-600 border rounded-lg border-gary-300'>
                    <option value="create">Create Image</option>
                    <option value="inpaint">In Paint</option>
                    <option value="outpaint">Out Paint</option>
                    <option value="remove">Object Remove</option>
                    <option value="recolor">Object Recolor</option>
                    <option value="replace">Object Replace</option>
                    <option value="backgroundRemove">Background Removal</option>
                    <option value="backgroundReplace">Background Replace</option>
                </select>
            </div>
            <div className="w-[350px] mt-4">
                <ImageActionFields
                  type={type}
                  OnTransformChange={OnTransformChange}
                  form={form}
                />
                <ImageActionSubmit
                    isSubmitting={isSubmitting}
                    isTransforming={isTransforming}
                    handleSubmit={handleSubmit}
                    handleSave={handleSave}
                />
            </div>
    </aside>
    )
}

export default Sidebar