import { supabase } from "@/lib/init-supabase";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
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
  const [lightBoxIndex, setLightboxIndex] = useState(-1);
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>
          {t("docTitle", {
            title: title,
          })}
        </title>
        <meta
          name="og:title"
          property={t("docTitle", {
            title: title,
          })}
        ></meta>
        <meta name="description" content={description} />
      </Head>
      <Lightbox
        open={lightBoxIndex !== -1}
        index={lightBoxIndex}
        close={() => setLightboxIndex(-1)}
        slides={images.map((image) => ({
          src: image.imageUrl,
          alt: title,
        }))}
      />
      <div className={style["portfolio-item-page"]}>
        <div>
          <section>
            <h1>{title}</h1>
            <p>{description}</p>
          </section>
        </div>

        <aside>
          {images.map((image, i) => (
            <Image
              onClick={() => setLightboxIndex(i)}
              key={image.id}
              src={image.imageUrl}
              alt={title}
              width={500}
              height={600}
            />
          ))}
        </aside>
      </div>
    </>
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
