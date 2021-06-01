import { MainLayout } from "../../../components/MainLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Refund({ mainLayoutSocial }) {
  const { t } = useTranslation("common");

  const commonLang = {
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    investors: t("investors"),
    policies: t("policies"),
  };
  return (
    <MainLayout
      title="Refund policy"
      commonLang={commonLang}
      mainLayoutSocial={mainLayoutSocial}
    >
      <div className={`${isMobile ? "col-10 m-auto pb-20" : "mt-4"}`}>
        <p>SMART BOLLA DMCC</p>
        <p>
          Dubai, United Arab Emirates, Mazaya Business Avenue; Diamond Business
          Center; BB1 Tower, Level 18, Unit №1801-1808 PO BOX 26734, +971
          43699090.
        </p>
        <p style={{ textAlign: "center" }}>Refund policy</p>
        <p>
          We're so convinced you'll absolutely love our services, that we're
          willing to offer a 90 day risk-free money back guarantee. If you are
          not satisfied with the service for any reason you can get a refund
          within 90 days of making a purchase. Please keep in mind that even
          though we offer a full money back guarantee, we will issue a refund
          only for the unused portion of the service.
        </p>
        <p>Contacting us</p>
        <p>
          If you would like to contact us concerning any matter relating to this
          Refund Policy, you may do so via the contact form
        </p>
        <Link href={"/policies"}>
          <a>
            <FontAwesomeIcon icon={faArrowLeft} />
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
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
