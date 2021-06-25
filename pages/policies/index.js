import { MainLayout } from "../../components/MainLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from 'next/link'

export default function Policies({ mainLayoutSocial }) {
  const { t } = useTranslation("policiesPage");
  const commonLang = {
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    investors: t("investors"),
    projects: t("projects"),
    policies: t("policies")
  };
  return (
    <MainLayout
      commonLang={commonLang}
      mainLayoutSocial={mainLayoutSocial}
      title={t("title")}
    >
      <div className={`text-center uppercase`}>
        <Link href="/policies/payment">
          <a className="hover:underline">
            <div>Payment policy of Smart Bolla DMCC</div>
          </a>
        </Link>
        <Link href="/policies/terms">
          <a className="hover:underline">
            <div>Terms of service policy of Smart Bolla DMCC</div>
          </a>
        </Link>
        <Link href="/policies/privacy">
          <a className="hover:underline">
            <div>Privacy policy of Smart Bolla DMCC</div>
          </a>
        </Link>
        <Link href="/policies/refund">
          <a className="hover:underline">
            <div>Refund policy of Smart Bolla DMCC</div>
          </a>
        </Link>
      </div>
    </MainLayout>
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
  return {
    props: {
      mainLayoutSocial,
      ...(await serverSideTranslations(locale, ["policiesPage"])),
    },
  };
}