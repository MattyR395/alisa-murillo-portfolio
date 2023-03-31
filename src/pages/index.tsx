import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator";
import Masonry from "react-masonry-css";
import useSWR, { Fetcher } from "swr";
import PortfolioCard from "../components/PortfolioCard/PortfolioCard";

const fetcher: Fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, isLoading } = useSWR("/api/portfolio", fetcher);
  const portfolioItems = data;

  const masonryBreakpoints = {
    default: 3,
    900: 2,
    500: 1,
  };

  return (
    <>
      <LoadingIndicator isVisible={isLoading} />

      <Masonry
        breakpointCols={masonryBreakpoints}
        className="portfolio-container"
        columnClassName="portfolio-container__column"
      >
        {!isLoading &&
          portfolioItems.map((item) => (
            <PortfolioCard
              key={item.id}
              title={item.title}
              imagePath={item.imagePath}
              uri={item.uri}
            />
          ))}
      </Masonry>
    </>
  );
}
