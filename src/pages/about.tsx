import Image from "next/image";
import style from "./About.module.scss";

export default function About(): JSX.Element {
  return (
    <div className={style.about}>
      <div className={style.about__image}>
        <Image
          src="https://media.licdn.com/dms/image/C4D03AQFU7yG56dSwZg/profile-displayphoto-shrink_800_800/0/1641414746614?e=2147483647&v=beta&t=1mEuZTVborKkRIFlA_DpKm88K18x8H-e4Ht5WJYcp28"
          alt="Placeholder"
          width={1000}
          height={1250}
        />
      </div>

      <div>
        <hgroup>
          <h1>Hi, I'm Alisa</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, quia?
          </p>
        </hgroup>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
          cupiditate minus eos consequatur deserunt necessitatibus, molestias
          soluta ipsum error omnis adipisci vero harum corrupti nemo quos animi.
          Nisi, blanditiis consequuntur.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
          cupiditate minus eos consequatur deserunt necessitatibus, molestias
          soluta ipsum error omnis adipisci vero harum corrupti nemo quos animi.
          Nisi, blanditiis consequuntur.
        </p>
      </div>
    </div>
  );
}
