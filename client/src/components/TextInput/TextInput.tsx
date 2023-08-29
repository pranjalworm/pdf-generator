import { InputProps } from "../../common"

const TextInput = (props: InputProps) => {

  const {defaultValue, changeCallback, fieldKey: key} = props

  return (
    <input className="border rounded p-2 my-4 w-2/3"
      type="text"
      name="company-name"
      defaultValue={defaultValue}
      onChange={e => changeCallback(key, e.target.value)} />
  )
}

export default TextInput