import { defaultValues } from "@/constants"

type ImageActionFieldProps = {
    type: ImageActionTypeKey;
    form: TransformationParams;
    OnTransformChange: ({ fieldName, value }: { fieldName: string; value: string }) => void;
}

const ImageActionFields = ({ type, form, OnTransformChange }: ImageActionFieldProps) => {
    const onInputChange = (e: any) => {
        OnTransformChange({
            fieldName: e.target.name,
            value: e.target.value
        })
    }

  return (
    <div className="w-full flex flex-col">
        <div className="flex flex-col lg:mt-2">
            <label className="input-label">Image Title</label>
            <input 
                type="text" 
                value={form.title}
                name="title"
                onChange={onInputChange}
                className="input-field mt-2"
                required
            />
        </div>
        { (type==='create' || type==='inpaint' || type==='backgroundReplace') && (
            <div className="flex flex-col mt-4 lg:mt-6">
                <label className="input-label">Prompt</label>
                <input 
                    type="text" 
                    name="prompt"
                    value={form.prompt}
                    onChange={onInputChange}
                    className="input-field mt-2"
                    required
                />
            </div>
        )}
        { (type==="create") && (
            <div className='mt-4 lg:mt-6 flex flex-col'>
                <label className='input-label'>Style</label>
                <select 
                    name="selectPrompt"
                    value={form.selectPrompt}
                    onChange={onInputChange}
                    className='py-3 px-3 mt-1 text-gray-600 border rounded-lg border-gray-300'
                    required
                >
                    <option value="">Select Option</option>
                    <option value="cinematic">Cinematic</option>
                    <option value="anime">Anime</option>
                    <option value="digital-art">Digital Art</option>
                    <option value="fantasy-art">Fantasy Art</option>
                    <option value="3d-model">3D Model</option>
                    <option value="pixel-art">Pixel Art</option>
                </select>
            </div>
        )}
        { (type==='outpaint' || type==="create") && (
            <div className='mt-4 lg:mt-6 flex flex-col'>
                <label className='input-label'>Aspect Ratio</label>
                <select 
                    name="aspectRatio"
                    value={form.transformedImage.aspectRatio}
                    onChange={onInputChange}
                    className='py-3 px-3 mt-1 text-gray-600 border rounded-lg border-gray-300'
                    required
                >
                    <option value="">Select Option</option>
                    <option value="1024:1024">Square (1:1)</option>
                    <option value="768:1024">Standard Portrait (3:4)</option>
                    <option value="1024:768">Standard Landscape (4:3)</option>
                    <option value="576:1024">Phone Portrait (9:16)</option>
                </select>
            </div>
        )}
        { (type==='recolor' || type==='replace') && (
            <div className="flex flex-col mt-4 lg:mt-6">
                <label className="input-label">Object to {type==='recolor' && 'recolor'}{type==='replace' && 'replace'}</label>
                <input 
                    type="text" 
                    name="selectPrompt"
                    value={form.selectPrompt}
                    onChange={onInputChange}
                    className="input-field mt-2"
                    required
                />
            </div>
        )}
        { (type==='recolor' || type==='replace') && (
            <div className="flex flex-col mt-4 lg:mt-6">
                <label className="input-label">{type==='recolor' ? 'Color' : 'New Object'}</label>
                <input 
                    type="text"
                    name="prompt"
                    value={form.prompt}
                    required
                    onChange={onInputChange}
                    className="input-field mt-2"
                />
            </div>
        )}
      </div>
  )
}

export default ImageActionFields