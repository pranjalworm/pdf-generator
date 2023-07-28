export interface TextAreaInputProps {
  defaultValue: string
  changeCallback: (text: string) => void
}

const TextAreaInput = (props: TextAreaInputProps) => {

  const {defaultValue, changeCallback} = props

  return (
    <textarea className="border rounded p-2 my-4 w-2/3"
      name=""
      defaultValue={defaultValue}
      onChange={e => changeCallback(e.target.value)}/>
  )
}

export default TextAreaInput