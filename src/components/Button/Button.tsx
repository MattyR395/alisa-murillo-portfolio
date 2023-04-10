import clsx from "clsx";

export default function Button(props: {
  isLoading?: boolean;
  style?: "secondary" | "danger";
  isSubmit?: boolean;
  formId?: string;
  onClick?: () => void;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      disabled={props.isLoading}
      className={clsx({
        "form-control": true,
        "is-loading": props.isLoading,
        "form-control--secondary": props.style === "secondary",
        "form-control--danger": props.style === "danger",
      })}
      type={props.isSubmit ? "submit" : "button"}
      form={props.formId ? props.formId : undefined}
      style={{ minWidth: "5rem" }}
    >
      <span>{props.children}</span>
    </button>
  );
}
