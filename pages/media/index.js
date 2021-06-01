import React, { useState, useCallback, useRef } from "react";
import { MainLayout } from "../../components/MainLayout";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MasonryScroller, useContainerPosition, usePositioner } from "masonic";
import Image from "next/image";
import { useWindowSize } from "@react-hook/window-size";
import {
  mediaCard,
  mediaIsotopeItemsSections,
  mediaIsotopeItemsSections__item,
  mediaIsotopeItemsSections__item_active,
} from "./media.module.css";
import useKeypress from "../../hooks/useKeyPress";
import YouTube from "react-youtube";
import Link from "next/link";
import { useRouter } from "next/router";

const photos = [];

function Media({ mainLayoutSocial, photoData }) {
  const { t } = useTranslation("mediaPage");
  const commonLang = {
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    investors: t("investors"),
    projects: t("projects"),
    policies: t("policies")
  };

  const footerLang = {
    allRightsRes: t("allRightsRes"),
    weWoldLike: t("weWoldLike"),
  };

  const containerRef = useRef(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
  ]);

  let columnWidth = 230;

  if (process.browser && windowWidth < 600) {
    columnWidth = 150;
  }

  const positioner = usePositioner({
    width,
    columnGutter: 8,
    columnWidth: columnWidth,
  });
  const [currentModalItem, setCurrentModalItem] = useState(null);

  useKeypress("Escape", () => {
    setCurrentModalItem(null);
  });

  const MasonryCard = ({ index, data, width, ...options }) => {
    let height = data.PREVIEW_PICTURE.HEIGHT;
    if (process.browser && windowWidth < 600 && height > 240) {
      height = 240;
    }
    return (
      <div
        className={mediaCard}
        style={{ height }}
        onClick={() => {
          setCurrentModalItem(data);
        }}
      >
        <img
          src={data.PREVIEW_PICTURE.SMALL}
          className="object-contain w-full"
          onClick={() => {
            setCurrentModalItem(data);
          }}
        />
      </div>
    );
  };

  let youtubeOptions = {
    height: "60%",
    width: "90%",
  };

  if (process.browser) {
    youtubeOptions.width = parseInt(window.innerWidth * 0.7, 0);
    youtubeOptions.height = parseInt(window.innerHeight * 0.5, 0);
  }
  const { asPath } = useRouter();

  return (
    <>
      <MainLayout
        title="Media"
        commonLang={commonLang}
        footerLang={footerLang}
        mainLayoutSocial={mainLayoutSocial}
      >
        <MasonryScroller
          positioner={positioner}
          // The distance in px between the top of the document and the top of the
          // masonry grid container
          offset={offset}
          // The height of the virtualization window
          height={windowHeight}
          // Forwards the ref to the masonry container element
          containerRef={containerRef}
          items={photoData.ITEMS}
          render={MasonryCard}
        />
        {currentModalItem && (
          <div className="z-50 text-black fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

            <div className="modal-container w-full mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div
                onClick={() => {
                  setCurrentModalItem(null);
                }}
                className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
              >
                <svg
                  className="fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
                <span className="text-sm">(Esc)</span>
              </div>

              <div className="text-left">
                {currentModalItem.PROPERTY_VIDEO_LINK_VALUE && (
                  <YouTube
                    videoId={
                      currentModalItem.PROPERTY_VIDEO_LINK_VALUE.split("?v=")[1]
                    }
                    opts={youtubeOptions}
                    className="m-auto"
                  />
                )}
                {!currentModalItem.PROPERTY_VIDEO_LINK_VALUE && (
                  <img
                    src={currentModalItem.PREVIEW_PICTURE.BIG}
                    className="w-full"
                  />
                )}
              </div>
            </div>
          </div>
        )}
        <div className={mediaIsotopeItemsSections}>
          <div
            className={`${mediaIsotopeItemsSections__item} ${
              asPath == "/media/" && mediaIsotopeItemsSections__item_active
            }`}
          >
            <Link href="/media/">
              <span>All</span>
            </Link>
          </div>
          {photoData.SECTIONS.map((section) => (
            <div
              className={`${mediaIsotopeItemsSections__item}  ${
                asPath == "/media/" + section.ID &&
                mediaIsotopeItemsSections__item_active
              }`}
              key={section.ID}
            >
              <Link href={`/media/${section.ID}`}>
                <span>{section.NAME}</span>
              </Link>
            </div>
          ))}
        </div>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const socials = await fetch("https://api.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "social.links",
      data: {
        locale: locale,
      },
    }),
    headers: {
      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
    },
  });

  let { data: mainLayoutSocial } = await socials.json();

  const resPhoto = await fetch("https://api.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "get.media.data",
      data: {
        locale: locale,
      },
    }),
    headers: {
      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
    },
  });

  let { data: photoData } = await resPhoto.json();

  return {
    props: {
      mainLayoutSocial,
      photoData,
      ...(await serverSideTranslations(locale, ["mediaPage"])),
    },
  };
}

export default Media;
