import style from "./LoadingContainer.module.scss";

/**
 * Container that displays a loading state, then either content or an empty state based on the isLoading and isEmpty props.
 *
 * This takes a height so that there won't be any layout shifting as it switches between states.
 */
export default function LoadingContainer(props: {
  emptyState: React.ReactNode;
  loadingState: React.ReactNode;
  children: React.ReactNode;
  isLoading: boolean;
  isEmpty: boolean;
  height: string;
}): JSX.Element {
  const { isLoading, isEmpty } = props;

  if (isLoading || isEmpty) {
    return (
      <div
        className={style["loading-container"]}
        style={{
          height: props.height,
        }}
      >
        {isLoading && props.loadingState}
        {!isLoading && isEmpty && props.emptyState}
      </div>
    );
  }

  return <>{props.children}</>;
}
