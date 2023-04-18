import Button from "../Button/Button";
import style from "./EmptyState.module.scss";

export interface CtaButton {
  label: string;
  onClick: () => void;
}

export default function EmptyState(props: {
  isVisible: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
  ctaButtons?: CtaButton[];
}): JSX.Element {
  return (
    <div className={style["empty-state"]}>
      <div className={style["empty-state__icon"]}>{props.icon}</div>

      <div className={style["empty-state__title"]}>{props.title}</div>

      <div className={style["empty-state__desc"]}>{props.description}</div>

      {props.ctaButtons?.length && (
        <div className={style["empty-state__actions"]}>
          {props.ctaButtons?.map((ctaButton, i) => (
            <Button key={i} onClick={ctaButton.onClick}>
              {ctaButton.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
