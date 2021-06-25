import { MainLayout } from "../../components/MainLayout";
import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Slider from "../../components/Slider/Slider";
import { deviceType, CustomView } from "react-device-detect";

function Investors({ aboutText, mainLayoutSocial, investors }) {
  const { t } = useTranslation("investorsPage");
  const { t: translation } = useTranslation("indexPage");

  const commonLang = {
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    projects: t("projects"),
    investors: t('investors'),
    policies: t("policies")
  };

  const footerLang = {
    allRightsRes: t("allRightsRes"),
    weWoldLike: t("weWoldLike"),
  };
  return (
    <MainLayout
      title={t("investors")}
      commonLang={commonLang}
      footerLang={footerLang}
      mainLayoutSocial={mainLayoutSocial}
    >
      {["browser", "tablet"].includes(deviceType) ? (
        <div>
          <div className="w-10/12 m-auto">
            <Slider slides={investors} />
          </div>
        </div>
      ) : (
        <div>
          <div className="col-10 m-auto min-vh-100">
            <Slider slides={investors} />
          </div>
        </div>
      )}
    </MainLayout>
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

  let { data: investors } = await res.json();
  let { data: mainLayoutSocial } = await socials.json();
  investors = investors || [];
  investors = investors
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

  return {
    props: {
      investors,
      mainLayoutSocial,
      ...(await serverSideTranslations(locale, ["investorsPage"])),
    },
  };
}

export default Investors;
