import TemplatePreview from "../TemplatePreview";

export interface TemplateCardProps {
  name: string;
  clickCallback: (i: number) => void;
  index: number
  template: string
}

const TemplateCard = (props: TemplateCardProps) => {

  const {name, clickCallback, index, template} = props;

  const clickHandler = () => {
    clickCallback(index)
  }

  return (
    <div className="p-4 m-4 border rounded hover:cursor-pointer" onClick={clickHandler}>
      <TemplatePreview template={template}/>
      <div className="text-bold">{name}</div>
    </div>
  )
}

export default TemplateCard