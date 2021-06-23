import { MainLayout } from "../components/MainLayout";
import React, { useEffect, useState } from "react";
import TextOnVideo from "../components/TextOnVideo/TextOnVideo";
import Invest from "../components/Invest/Invest";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Project from "../components/Project/Project";
import styles from "./index.module.css";
import { projectModal, youtubeModal } from "./index.module.css";
import YouTube from "react-youtube";

function Home({ products, mainLayoutSocial, projects, indexText }) {
  const { t } = useTranslation("projectsPage");

  const commonLang = {
    projects: t("projects"),
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    investors: t("investors"),
    policies: t("policies"),
  };

  const footerLang = {
    allRightsRes: t("allRightsRes"),
    weWoldLike: t("weWoldLike"),
  };

  let youtubeOptions = {
    height: "80%",
    width: "90%",
  };

  const [youtubeId, setYoutubeId] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);

  return (
    <>
      <video
        className="videoTag"
        autoPlay
        loop
        muted
        className="absolute hidden md:block"
      >
        <source src="/sample.mp4/" type="video/mp4" />
      </video>
      <MainLayout
        title={"Smartbolla"}
        commonLang={commonLang}
        footerLang={footerLang}
        mainLayoutSocial={mainLayoutSocial}
      >
        <div className="md:flex md:mt-64 justify-around">
          <div className="hidden md:block">
            <TextOnVideo
              products={products}
              investLang={t("invest")}
              text={indexText}
            />
          </div>
          <div className="block mt-24 md:mt-0">
            <Invest products={products} investLang={t("invest")} />
          </div>
        </div>
        <div className={styles.projects}>
          {projects.map((project) => (
            <div key={project.ID}>
              <Project
                project={project}
                onShowYoutube={(id) => {
                  setYoutubeId(id);
                }}
              />
            </div>
          ))}
          {youtubeId && (
            <div className="z-[9999] text-black fixed w-full h-full top-0 left-0 flex items-center justify-center">
              <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 z-[10000]"></div>

              <div className="modal-container mx-auto rounded z-[20000]">
                <div
                  onClick={() => {
                    setYoutubeId(null);
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
                  <span className="text-sm"></span>
                </div>

                <div
                  className={`${youtubeModal} mx-auto overflow-hidden text-left`}
                >
                  <YouTube
                    videoId={youtubeId}
                    opts={youtubeOptions}
                    className="m-auto h-full relative"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <style jsx global>
          {`
            #fp-nav {
              top: 65% !important;
            }
            #fp-nav ul li a span,
            .fp-slidesNav ul li a span {
              background: transparent !important;
              border: 1px solid #f6c886 !important;
              width: 10px !important;
              height: 10px !important;
              margin: -6px 0 0 -6px !important;
            }
            #fp-nav ul li a.active span,
            .fp-slidesNav ul li a.active span {
              background: #f6c886 !important;
              border: 1px solid #f6c886 !important;
            }

            .ct-btn-scroll {
              position: absolute;
              top: 20%;
              right: 10%;
              display: inline-block;
              -webkit-transform: translate(0, -50%);
              transform: translate(0, -50%);
              color: #fff;
              font: normal 400 20px/1 "Josefin Sans", sans-serif;
              letter-spacing: 0.1em;
              text-decoration: none;
              transition: opacity 0.3s;
            }
            .ct-btn-scroll span {
              position: absolute;
              top: 0;
              left: 50%;
              width: 24px;
              height: 24px;
              margin-left: -12px;
              border-left: 2px solid #fff;
              border-bottom: 2px solid #fff;
              -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg);
              -webkit-animation: sdb07 2s infinite;
              animation: sdb07 2s infinite;
              opacity: 0;
              box-sizing: border-box;
            }
            .ct-btn-scroll span:nth-of-type(1) {
              -webkit-animation-delay: 0s;
              animation-delay: 0s;
            }
            .ct-btn-scroll span:nth-of-type(2) {
              top: 16px;
              -webkit-animation-delay: 0.15s;
              animation-delay: 0.15s;
            }
            .ct-btn-scroll span:nth-of-type(3) {
              top: 32px;
              -webkit-animation-delay: 0.3s;
              animation-delay: 0.3s;
            }

            .ct-btn-scroll-top {
              transform: rotate(180deg);
              top: 25%;
            }
            .ct-btn-scroll-bottom {
              top: 75%;
            }

            @-webkit-keyframes sdb07 {
              0% {
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
            @keyframes sdb07 {
              0% {
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
          `}
        </style>
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

  const resProducts = await fetch("https://api.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "get.products.list",
    }),
    headers: {
      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
    },
  });

  const resProjects = await fetch("https://dev.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "get.projects.list",
      data: {
        locale,
      },
    }),
    headers: {
      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
    },
  });

  const resIndexText = await fetch("https://api.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "get.index.text",
      data: {
        locale,
      },
    }),
    headers: {
      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
    },
  });

  let { data: projects } = await resProjects.json();
  let { data: mainLayoutSocial } = await socials.json();
  let { data: products } = await resProducts.json();
  let { data: indexText } = await resIndexText.json();

  return {
    props: {
      mainLayoutSocial,
      products,
      ...(await serverSideTranslations(locale, ["indexPage"])),
      projects,
      indexText,
    },
  };
}

export default Home;
