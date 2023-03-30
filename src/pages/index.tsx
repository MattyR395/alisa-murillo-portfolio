import Masonry from "react-masonry-css";
import PortfolioCard from "../components/PortfolioCard/PortfolioCard";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Home() {
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

  const masonryBreakpoints = {
    default: 3,
    900: 2,
    600: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={masonryBreakpoints}
        className="portfolio-container"
        columnClassName="portfolio-container__column"
      >
        {items.map((item) => (
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
