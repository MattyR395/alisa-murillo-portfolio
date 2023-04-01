import { PortfolioItem } from "@/models/portfolio-item.model";
import Masonry from "react-masonry-css";
import PortfolioCard from "../components/PortfolioCard/PortfolioCard";

export default function Home(props: { portfolioItems: PortfolioItem[] }) {
  const masonryBreakpoints = {
    default: 3,
    900: 2,
    500: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={masonryBreakpoints}
        className="portfolio-container"
        columnClassName="portfolio-container__column"
      >
        {props.portfolioItems.map((item) => (
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

export async function getStaticProps() {
  const items: {
    title: string;
    imagePath: string;
    uri: string;
    id: number;
  }[] = [];

  for (let i = 0; i < 20; i++) {
    const height = randomIntFromInterval(340, 600);

    items.push({
      title: `Item ${i + 1}`,
      imagePath: `http://via.placeholder.com/400x${height}`,
      uri: "2",
      id: i,
    });
  }

  return {
    props: {
      portfolioItems: items,
    },
  };
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
