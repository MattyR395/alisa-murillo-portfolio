import { supabase } from "@/lib/init-supabase";
import Image from "next/image";
import style from "./PortfolioItemPage.module.scss";

export interface PortfolioItemDetail {
  id: number | string;
  title: string;
  description: string;
  images: {
    id: number;
    imageUrl: string;
  }[];
}

interface PortfolioItemPageProps {
  portfolioItem: PortfolioItemDetail;
}

export default function PortfolioItemPage(
  props: PortfolioItemPageProps
): JSX.Element {
  const { title, description, images } = props.portfolioItem;

  return (
    <div className={style["portfolio-item-page"]}>
      <div>
        <section>
          <h1>{title}</h1>
          <p>{description}</p>
        </section>
      </div>

      <aside>
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.imageUrl}
            alt={title}
            width={500}
            height={600}
          />
        ))}
      </aside>
    </div>
  );
}

export async function getServerSideProps(context: {
  params: { portfolioItemId: string };
  locale: string;
}): Promise<{
  props?: PortfolioItemPageProps;
  notFound?: boolean;
}> {
  const id = parseInt(context.params.portfolioItemId, 10);

  const { data: portfolioItem, error } = await supabase.rpc(
    "get_portfolio_item",
    {
      id,
      locale_id: context.locale,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  if (!portfolioItem[0]) {
    return {
      notFound: true,
    };
  }

  const { data: images, error: imagesError } = await supabase
    .from("images")
    .select("id, imageUrl")
    .eq("portfolioItemId", id)
    .order("displayOrder", { ascending: true });

  if (imagesError) {
    throw new Error(imagesError.message);
  }

  return {
    props: {
      portfolioItem: {
        ...portfolioItem[0],
        images,
      },
    },
  };
}
