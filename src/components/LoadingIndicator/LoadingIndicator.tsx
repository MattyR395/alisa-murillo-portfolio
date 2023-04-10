import style from "./LoadingIndicator.module.scss";

export default function LoadingIndicator(props: {
  isVisible: boolean;
}): JSX.Element {
  return (
    <>
      {props.isVisible && (
        <div className={style.spinner}>
          <div className={style.bounce1}></div>
          <div className={style.bounce2}></div>
          <div className={style.bounce3}></div>
        </div>
      )}
    </>
  );
}
