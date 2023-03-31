import clsx from "clsx";
import style from "./LoadingIndicator.module.scss";

export default function LoadingIndicator(props: {
  isVisible: boolean;
}): JSX.Element {
  return (
    <>
      <div
        aria-hidden={true}
        className={clsx({
          [style.spinner]: true,
          [style["spinner--visible"]]: props.isVisible,
        })}
      >
        <div className={style.bounce1}></div>
        <div className={style.bounce2}></div>
        <div className={style.bounce3}></div>
      </div>
    </>
  );
}
