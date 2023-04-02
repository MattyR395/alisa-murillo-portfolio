export default function ValidationTooltip(props: {
  messages: string[];
}): JSX.Element {
  return (
    <>
      <div className="validation-tooltip">
        {props.messages.length === 1 && <>{props.messages[0]}</>}
      </div>
    </>
  );
}
