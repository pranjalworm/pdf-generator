export interface NumberInputProps {
  defaultValue: string
  changeCallback: (text: string) => void
}

const NumberInput = (props: NumberInputProps) => {

  const {defaultValue, changeCallback} = props

  return (
    <input className="border rounded p-2 my-4 w-2/3"
      type="number"
      name="company-name"
      defaultValue={defaultValue}
      onChange={e => changeCallback(e.target.value)} />
  )
}

export default NumberInput