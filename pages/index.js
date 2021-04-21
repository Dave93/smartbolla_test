import { MainLayout } from "../components/MainLayout";
import React, { useEffect, useState } from "react";
import ProductsSlider from "../components/ProductsSlider/ProductsSlider";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { deviceType, CustomView } from "react-device-detect";
import Footer from "../components/Footer/Footer";

function Home({ products, mainLayoutSocial }) {
  const { t: translation } = useTranslation("indexPage");

  const commonLang = {
    projects: translation("projects"),
    about: translation("about"),
    media: translation("media"),
    contact: translation("contact"),
    profile: translation("profile"),
    investors: translation("investors"),
  };

  const footerLang = {
    allRightsRes: translation("allRightsRes"),
    weWoldLike: translation("weWoldLike"),
  };

  return (
    <>
      <video
        className="videoTag"
        autoPlay
        loop
        muted
        className="opacity-50 position-fixed"
      >
        <source src="/sample.mp4/" type="video/mp4" />
      </video>
      <MainLayout
        title={"Smartbolla"}
        commonLang={commonLang}
        footerLang={footerLang}
        mainLayoutSocial={mainLayoutSocial}
      >
        <div>
          <ProductsSlider
            products={products}
            investLang={translation("invest")}
          />
        </div>
        <CustomView condition={["browser", "tablet"].includes(deviceType)}>
          <Footer footerLang={footerLang} />
        </CustomView>
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

  let { data: mainLayoutSocial } = await socials.json();
  let { data: products } = await resProducts.json();
  return {
    props: {
      mainLayoutSocial,
      products,
      ...(await serverSideTranslations(locale, ["indexPage"])),
    },
  };
}

export default Home;
