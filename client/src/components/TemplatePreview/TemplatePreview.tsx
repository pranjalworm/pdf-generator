export interface TemplatePreviewProps {
  template: TrustedHTML;
}

const TemplatePreview = (props: TemplatePreviewProps) => {

  const {template} = props;

  const markup = {__html: template}

  return (
    <div className="bg-white" dangerouslySetInnerHTML={markup} />
  )
}

export default TemplatePreview