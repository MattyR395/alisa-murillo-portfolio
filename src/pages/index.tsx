import { supabase } from "@/lib/init-supabase";
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

export async function getServerSideProps(props: { locale: string }): Promise<{
  props: { portfolioItems: PortfolioItem[] };
}> {
  const { data: portfolioItems, error: portfolioItemsError } = await supabase
    .rpc("get_portfolio_items", { locale_id: props.locale })
    .select("id, title, thumbUrl");

  if (portfolioItemsError) {
    throw new Error(portfolioItemsError.message);
  }

  const items: PortfolioItem[] = portfolioItems.map(
    ({ id, title, thumbUrl }) => ({
      id,
      title,
      imagePath: thumbUrl,
      uri: "2",
    })
  );

  return {
    props: {
      portfolioItems: items,
    },
  };
}
