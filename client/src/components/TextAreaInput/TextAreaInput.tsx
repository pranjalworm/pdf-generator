import { InputProps } from "../../common"

const TextAreaInput = (props: InputProps) => {

  const {defaultValue, changeCallback, fieldKey: key} = props

  return (
    <textarea className="border rounded p-2 my-4 w-2/3"
      name=""
      defaultValue={defaultValue}
      onChange={e => changeCallback(key, e.target.value)}/>
  )
}

export default TextAreaInput