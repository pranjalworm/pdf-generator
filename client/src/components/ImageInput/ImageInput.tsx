export interface ImageInputProps {
  defaultValue: string
  changeCallback: (text: string) => void
}

const ImageInput = (props: ImageInputProps) => {

  const {defaultValue, changeCallback} = props

  return (
    <input className="border rounded p-2 my-4 w-2/3"
      type="text"
      name="company-name"
      defaultValue={defaultValue}
      placeholder="Company Name"
      onChange={e => changeCallback(e.target.value)} />
  )
}

export default ImageInput