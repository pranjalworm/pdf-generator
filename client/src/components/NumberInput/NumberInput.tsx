import { InputProps } from "../../common"

const NumberInput = (props: InputProps) => {

  const {defaultValue, changeCallback, fieldKey: key} = props

  return (
    <input className="border rounded p-2 my-4 w-2/3"
      type="number"
      name="company-name"
      defaultValue={defaultValue}
      onChange={e => changeCallback(key, e.target.value)} />
  )
}

export default NumberInput