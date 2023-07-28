export interface TextInputProps {
  defaultValue: string
  changeCallback: (text: string) => void
}

const TextInput = (props: TextInputProps) => {

  const {defaultValue, changeCallback} = props

  return (
    <input className="border rounded p-2 my-4 w-2/3"
      type="text"
      name="company-name"
      defaultValue={defaultValue}
      onChange={e => changeCallback(e.target.value)} />
  )
}

export default TextInput