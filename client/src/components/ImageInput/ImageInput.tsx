import { InputProps } from "../../common"

const ImageInput = (props: InputProps) => {

  const {defaultValue, changeCallback, fieldKey: key} = props

  return (
    <input className="border rounded p-2 my-4 w-2/3"
      type="text"
      name="company-name"
      defaultValue={defaultValue}
      placeholder="Company Name"
      onChange={e => changeCallback(key, e.target.value)} />
  )
}

export default ImageInput