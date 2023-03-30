import Link from "next/link";
import style from "./Logo.module.scss";

export default function Logo(props: {
  href: string;
  title: string;
}): JSX.Element {
  return (
    <Link href={props.href} className={style.logo} title={props.title}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32.59 18.99"
        className={style["logo-svg"]}
      >
        <defs>
          <style>{`.cls-1{fill:currentColor}.cls-2{mix-blend-mode:multiply}`}</style>
        </defs>
        <g id="#logo">
          <g style={{ isolation: "isolate" }}>
            <g id="Layer_2">
              <g id="Layer_1-2">
                <g className="cls-2">
                  <path
                    d="M11.17 7c0 .14 0 .32-.02.55s-.04.45-.1.66-.14.4-.26.56-.28.23-.49.23c-.29 0-.51-.09-.67-.28s-.23-.42-.22-.7c-.25.22-.53.39-.85.52s-.64.19-.97.19a1.3 1.3 0 0 1-.64-.16 2.18 2.18 0 0 1-.92-1c-.1-.21-.14-.43-.14-.64 0-.38.12-.7.35-.98s.51-.52.85-.72.69-.36 1.07-.47.72-.2 1.01-.23v-.22c0-.24-.07-.44-.2-.59s-.32-.22-.56-.22c-.2 0-.36.03-.5.1l-.4.22c-.13.08-.25.16-.38.22s-.27.1-.42.1c-.17 0-.32-.05-.44-.16s-.18-.25-.18-.42c0-.26.08-.49.23-.7s.34-.39.57-.53.48-.26.75-.34.52-.12.74-.12a2.72 2.72 0 0 1 1.23.31c.19.1.36.23.51.39s.28.33.37.53c.14.29.25.6.34.92s.15.66.2 1 .08.68.09 1.02l.02.99Zm-1.88-.38-.04-.8h-.1a1.97 1.97 0 0 0-1.18.59.5.5 0 0 0-.15.34c0 .11.04.18.12.22s.17.06.27.06c.17 0 .36-.04.55-.13l.52-.26Zm4.77-5.07c0 .42-.02.85-.05 1.27a18.02 18.02 0 0 0 0 2.94c.03.55.05 1.11.05 1.68 0 .14 0 .3-.02.47s-.05.34-.11.49-.15.27-.26.38-.27.15-.47.15-.35-.09-.49-.28-.25-.42-.34-.7-.16-.6-.22-.96-.1-.69-.13-1.03l-.06-.91-.02-.62c0-.15 0-.36.02-.64s.04-.59.08-.91.09-.66.16-1 .15-.65.26-.93.24-.5.39-.68.34-.26.55-.26c.17 0 .3.06.39.17s.15.25.19.41.06.33.07.5l.01.45Zm2.92 2.9v.35l-.01.35-.01.53c0 .22 0 .46-.02.72s-.04.52-.08.79-.09.51-.17.73-.18.4-.31.53-.29.21-.49.22c-.15 0-.27-.05-.38-.18s-.19-.29-.25-.49-.12-.42-.15-.67l-.07-.71c-.02-.23-.02-.44-.02-.64v-.97c0-.23 0-.48.02-.74s.04-.54.09-.81.11-.52.19-.75.19-.41.32-.55.3-.21.5-.21.37.11.48.32.19.46.25.74.09.56.09.84l.01.62ZM16.89.47c0 .11-.03.21-.09.29a1 1 0 0 1-.53.38c-.1.03-.21.05-.3.05-.16 0-.29-.04-.41-.12s-.18-.2-.18-.36c0-.12.03-.22.09-.31s.13-.16.22-.22.18-.1.29-.13.21-.05.32-.05c.15 0 .29.04.41.11s.19.19.19.36Zm4.36 1.73c0 .23-.08.39-.23.5s-.32.21-.51.31-.36.21-.51.35-.23.33-.23.6c0 .14.03.26.1.36s.15.19.25.28l.32.25c.11.08.22.18.32.29s.18.24.25.4.1.35.1.57c0 .33-.08.65-.25.97s-.38.6-.64.84-.56.44-.88.59-.65.22-.97.22c-.13 0-.27 0-.4-.03s-.25-.06-.36-.11-.19-.13-.26-.23-.11-.22-.11-.38c0-.22.04-.39.13-.51s.2-.22.33-.29.28-.12.43-.16.29-.09.43-.15.24-.13.33-.23.13-.23.13-.4-.06-.33-.19-.51l-.43-.56c-.16-.2-.3-.41-.43-.64s-.19-.48-.19-.75c0-.34.07-.65.21-.93s.32-.53.55-.74.49-.38.79-.5a2.5 2.5 0 0 1 1.31-.14c.12.03.23.06.32.12s.17.14.23.23.09.22.09.37ZM26.7 7c0 .14 0 .32-.02.55s-.04.45-.1.66-.14.4-.26.56-.28.23-.49.23c-.29 0-.51-.09-.67-.28s-.23-.42-.22-.7c-.25.22-.53.39-.85.52s-.64.19-.97.19a1.3 1.3 0 0 1-.64-.16 2.18 2.18 0 0 1-.92-1c-.1-.21-.14-.43-.14-.64 0-.38.12-.7.35-.98s.51-.52.85-.72.69-.36 1.07-.47.72-.2 1.01-.23v-.22c0-.24-.07-.44-.2-.59s-.32-.22-.56-.22c-.2 0-.36.03-.5.1l-.4.22c-.13.08-.25.16-.38.22s-.27.1-.42.1c-.17 0-.32-.05-.44-.16s-.18-.25-.18-.42c0-.26.08-.49.23-.7s.34-.39.57-.53.48-.26.75-.34.52-.12.74-.12a2.72 2.72 0 0 1 1.23.31c.19.1.36.23.51.39s.28.33.37.53c.14.29.25.6.34.92s.15.66.2 1 .08.68.09 1.02l.02.99Zm-1.88-.38-.04-.8h-.1a1.97 1.97 0 0 0-1.18.59.5.5 0 0 0-.15.34c0 .11.04.18.12.22s.17.06.27.06c.17 0 .36-.04.55-.13l.52-.26Z"
                    className="cls-1"
                  />
                </g>
                <g className="cls-2">
                  <path
                    d="M7.11 14.78v.6c0 .25 0 .53-.02.83s-.04.6-.08.9-.1.57-.18.81-.19.44-.31.6-.29.23-.48.23c-.17 0-.3-.07-.39-.22s-.15-.31-.19-.51-.06-.39-.06-.6v-.48c0-.35.01-.7.04-1.03s.04-.68.04-1.03v-.21c0-.1 0-.2-.02-.3s-.04-.19-.08-.27-.09-.12-.16-.12c-.14 0-.25.07-.34.22s-.16.31-.21.51l-.12.58-.05.43c-.02.1-.03.25-.04.46l-.05.67a9.94 9.94 0 0 1-.25 1.43c-.06.21-.15.38-.25.51s-.23.2-.38.2c-.19 0-.33-.08-.43-.25s-.18-.36-.22-.57-.08-.44-.09-.67l-.02-.53V15.5l-.02-.47-.05-.45c-.02-.14-.06-.25-.11-.33s-.1-.13-.16-.13c-.1 0-.2.06-.28.19s-.16.28-.22.46l-.15.52c-.04.17-.05.3-.05.38v.07c0 .38.02.74.07 1.1s.07.73.07 1.1c0 .22-.07.42-.21.6s-.34.28-.59.28c-.18 0-.33-.07-.45-.21s-.21-.31-.29-.53-.14-.46-.18-.72a10.71 10.71 0 0 1-.12-1.46v-.98l.01-.74.06-.81c.03-.27.08-.53.15-.76s.16-.41.28-.56.26-.22.44-.22c.2 0 .37.05.5.16s.19.27.19.49v.14c0 .05 0 .09-.02.13a3.4 3.4 0 0 1 .72-.73c.14-.1.3-.19.46-.26s.33-.1.49-.1.3.04.42.13.23.19.33.32.17.27.23.42.11.29.13.42a3.25 3.25 0 0 1 .66-.81c.13-.11.28-.2.44-.27s.33-.11.5-.11.3.06.42.18.22.27.3.45.15.39.2.62a8.85 8.85 0 0 1 .19 1.75Zm5.91.52c0 .43-.04.86-.13 1.28s-.23.8-.43 1.13-.47.6-.81.8-.76.3-1.27.3-.92-.1-1.25-.3-.6-.46-.8-.79-.34-.7-.42-1.11a6.67 6.67 0 0 1 .04-2.66l.13-.52a3.61 3.61 0 0 1 .62-1.22c.13-.16.29-.23.45-.23s.28.04.38.13.17.19.22.32.09.27.11.41.02.28.02.39c0 .18-.01.36-.04.53l-.09.52-.09.7c-.03.23-.04.47-.04.7 0 .12 0 .25.02.39s.04.28.09.42.11.24.2.33.21.13.36.13c.2 0 .37-.05.49-.16s.21-.25.27-.41.1-.34.11-.53l.02-.52c0-.34-.02-.68-.07-1.01l-.13-1.01-.01-.16a1.2 1.2 0 0 1 .22-.67c.07-.1.16-.17.26-.23s.21-.09.34-.09c.17 0 .32.06.46.18s.24.28.33.47.16.41.22.64.11.47.14.7.06.45.07.65l.02.48Zm4.78-1.03c-.11 0-.2 0-.28-.03l-.23-.09-.21-.09a.45.45 0 0 0-.23-.03c-.16 0-.29.05-.42.13s-.23.18-.33.29-.18.25-.25.39-.12.29-.16.43a11.69 11.69 0 0 0-.07 1.05l-.01.64c0 .2 0 .36-.02.48 0 .12-.03.27-.06.44s-.08.33-.15.47-.15.27-.26.38-.25.15-.42.15c-.13 0-.25-.04-.35-.12s-.18-.18-.25-.31-.12-.28-.16-.45-.08-.35-.1-.53l-.05-.56-.02-.53v-.8c0-.27-.02-.55-.04-.83s-.03-.55-.03-.83c0-.17 0-.36.02-.57s.06-.41.13-.59.17-.34.31-.46.33-.19.57-.19c.13 0 .25.04.34.13s.17.19.23.32.1.26.13.4l.06.39c.19-.3.4-.55.63-.74s.54-.29.91-.31c.19 0 .37 0 .56.05s.35.11.5.21.28.22.38.38.15.34.16.55c.02.25-.06.44-.22.57s-.36.2-.6.21Zm3.02.18v.35l-.01.35-.01.53c0 .22 0 .46-.02.72s-.04.52-.08.79-.09.51-.17.73-.18.4-.31.53-.29.21-.49.22c-.15 0-.27-.05-.38-.18s-.19-.29-.25-.49-.12-.42-.15-.67l-.07-.71c-.02-.23-.02-.44-.02-.64v-.97c0-.23 0-.48.02-.74s.04-.54.09-.81.11-.52.19-.75.19-.41.32-.55.3-.21.5-.21.37.11.48.32.19.46.25.74.09.56.09.84l.01.62Zm-.09-3.98c0 .11-.03.21-.09.29a1 1 0 0 1-.53.38c-.1.03-.21.05-.3.05-.16 0-.29-.04-.41-.12s-.18-.2-.18-.36c0-.12.03-.22.09-.31s.13-.16.22-.22.18-.1.29-.13.21-.05.32-.05c.15 0 .29.04.41.11s.19.19.19.36Zm3.11 1.08c0 .42-.02.85-.05 1.27a18.02 18.02 0 0 0 0 2.94c.03.55.05 1.11.05 1.68 0 .14 0 .3-.02.47s-.05.34-.11.49-.15.27-.26.38-.27.15-.47.15-.35-.09-.49-.28-.25-.42-.34-.7-.16-.6-.22-.96-.1-.69-.13-1.03l-.06-.91-.02-.62c0-.15 0-.36.02-.64s.04-.59.08-.91.09-.66.16-1 .15-.65.26-.93.24-.5.39-.68.33-.26.54-.26c.17 0 .3.06.39.17s.15.25.19.41.06.33.07.5l.01.45Zm3.09 0c0 .42-.02.85-.05 1.27a18.02 18.02 0 0 0 0 2.94c.03.55.05 1.11.05 1.68 0 .14 0 .3-.02.47s-.05.34-.11.49-.15.27-.26.38-.27.15-.47.15-.35-.09-.49-.28-.25-.42-.34-.7-.16-.6-.22-.96-.1-.69-.13-1.03l-.06-.91-.02-.62c0-.15 0-.36.02-.64s.04-.59.08-.91.09-.66.16-1 .15-.65.26-.93.24-.5.39-.68.33-.26.54-.26c.17 0 .3.06.39.17s.15.25.19.41.06.33.07.5l.01.45Zm3.11 7.44c-.4 0-.75-.11-1.04-.32s-.55-.48-.75-.81-.36-.69-.46-1.1a4.97 4.97 0 0 1 0-2.47c.1-.44.26-.84.47-1.21s.48-.66.81-.89.72-.35 1.17-.35.81.12 1.12.36.56.54.74.89.32.74.4 1.17.11.82.08 1.2c-.02.41-.09.83-.19 1.25s-.26.8-.46 1.14-.46.61-.77.82-.68.32-1.11.32Zm.12-5.3c-.12 0-.22.06-.31.19s-.16.28-.22.46-.1.37-.13.57a3.61 3.61 0 0 0 0 1.13c.03.22.08.42.15.6s.14.34.23.46.19.18.31.18.23-.06.32-.18.16-.27.22-.45.09-.38.12-.59a4.31 4.31 0 0 0-.14-1.75c-.05-.18-.13-.33-.22-.45s-.19-.18-.31-.18Z"
                    className="cls-1"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </Link>
  );
}
