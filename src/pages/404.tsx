import style from "./404.module.scss";

export default function PageNotFound(): JSX.Element {
  return (
    <div className={style["page-not-found"]}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for does not exist!</p>
    </div>
  );
}
