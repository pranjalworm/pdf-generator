import TemplatePreview from "../TemplatePreview";
import {ReactComponent as RightArrow}  from '../../assets/right-arrow.svg'

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
    <div className="flex flex-col justify-between m-4 border rounded hover:cursor-pointer w-80 bg-white drop-shadow-md" onClick={clickHandler}>
      <TemplatePreview template={template}/>
      <div className="mb-0">
        <hr />
        <div className="flex flex-row p-4 justify-between items-center">
          <span className="text-bold">{name}</span>
          <div className="h-4 w-4"><RightArrow></RightArrow></div>
        </div>
      </div>
      
    </div>
  )
}

export default TemplateCard