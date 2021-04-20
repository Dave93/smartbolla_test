import Link from "next/link";
import Head from "next/head";
import ReactFullpage from "@fullpage/react-fullpage";
import { MainLayout } from "../components/MainLayout";
import InvestorsBubble from "../components/InvestorsBubble/InvestorsBubble";
import React, { useEffect, useState } from "react";
import { changeMainBackground } from "../store/actions/mainConfigActions";
import { motion } from "framer-motion";
import FullPageSectionTitle from "../components/FullPageSectionTitle/FullPageSectionTitle";
import InvestorNewBubble from "../components/InvestorNewBubble/InvestorNewBubble";
import Project from "../components/Project/Project";
import CounterList from "../components/CounterList/CounterList";
import ProductsSlider from "../components/ProductsSlider/ProductsSlider";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { deviceType, CustomView } from "react-device-detect";
import YouTube from "react-youtube";
import Footer from "../components/Footer/Footer";
import { projectModal, youtubeModal } from "./index.module.css";

const pluginWrapper = () => {
  require("../public/js/scrolloverflow.min");
};

function Home({ projects, counter, products, mainLayoutSocial }) {
  const { t: translation } = useTranslation("indexPage");

  const commonLang = {
    about: translation("about"),
    media: translation("media"),
    contact: translation("contact"),
    profile: translation("profile"),
    investors: translation("investors"),
  };

  const countLang = {
    blockTitle: translation("title"),
    developers: translation("team"),
    investors: translation("investors"),
    applications: translation("applications"),
    cofounders: translation("cofounders"),
  };

  const footerLang = {
    allRightsRes: translation("allRightsRes"),
    weWoldLike: translation("weWoldLike"),
  };

  const sectionsColor = ["#000000", "#242C40"];

  const [isAllowScroll, setIsAllowScroll] = useState(false);

  const [currentProject, setCurrentProject] = useState(null);

  const [youtubeId, setYoutubeId] = useState(null);

  projects.map((project) => {
    if (project.PROPERTY_BACKGROUND_COLOR_VALUE) {
      sectionsColor.push(project.PROPERTY_BACKGROUND_COLOR_VALUE);
    } else {
      sectionsColor.push("#152331");
    }
  });

  let youtubeOptions = {
    height: "60%",
    width: "90%",
  };

  if (process.browser) {
    youtubeOptions.width = parseInt(window.innerWidth * 0.7, 0);
    youtubeOptions.height = parseInt(window.innerHeight * 0.5, 0);
  }

  return (
    <>
      <MainLayout
        title={"Smartbolla"}
        commonLang={commonLang}
        footerLang={footerLang}
        mainLayoutSocial={mainLayoutSocial}
      >
        {["browser", "tablet"].includes(deviceType) ? (
          <div>
            <ProductsSlider
              products={products}
              investLang={translation("invest")}
            />
          </div>
        ) : (
          <div>
            <ProductsSlider
              products={products}
              investLang={translation("invest")}
            />
          </div>
        )}
        {projects.map((project) => (
          <div
            className={`section ${
              ["browser", "tablet"].includes(deviceType)
                ? ""
                : "pl-10"
            }`}
            key={project.ID}
          >
            <Project
              project={project}
              onShowYoutube={(id) => {
                setYoutubeId(id);
              }}
            />
          </div>
        ))}
        <div
          className={`section ${
            ["browser", "tablet"].includes(deviceType) ? "pl-24 pt-30" : "pl-10"
          }`}
        >
          <CounterList counter={counter} countLang={countLang} />
          <CustomView condition={["browser", "tablet"].includes(deviceType)}>
            <Footer footerLang={footerLang} />
          </CustomView>
        </div>
        {currentProject && (
          <div className="z-[9999] text-black fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 z-[10000]"></div>

            <div className="modal-container w-full md:max-w-md mx-auto rounded shadow-lg  z-[20000]">
              <div
                onClick={() => {
                  setCurrentProject(null);
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

              <div className={`${projectModal} text-left`}>
                {currentProject.PREVIEW_TEXT}
              </div>
            </div>
          </div>
        )}
        {youtubeId && (
          <div className="z-[9999] text-black fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 z-[10000]"></div>

            <div className="modal-container w-full mx-auto rounded z-[20000]">
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
                  className="m-auto"
                />
              </div>
            </div>
          </div>
        )}
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
  const res = await fetch("https://api.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "get.investor.list",
    }),
    headers: {
      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
    },
  });

  const resProjects = await fetch("https://api.smartbolla.com/api/", {
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

  const resCounter = await fetch("https://api.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "get.counter.list",
      data: {
        locale,
      },
    }),
    headers: {
      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
    },
  });

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

  let { data: investors } = await res.json();
  let { data: projects } = await resProjects.json();
  let { data: counter } = await resCounter.json();
  let { data: mainLayoutSocial } = await socials.json();
  let { data: products } = await resProducts.json();
  investors = investors || [];
  investors = investors
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
  return {
    props: {
      investors,
      projects,
      counter,
      mainLayoutSocial,
      products,
      ...(await serverSideTranslations(locale, ["indexPage"])),
    },
  };
}

export default Home;
