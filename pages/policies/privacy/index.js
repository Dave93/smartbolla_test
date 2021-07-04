import { MainLayout } from "../../../components/MainLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Privacy({ mainLayoutSocial }) {
  const { t } = useTranslation("common");

  const commonLang = {
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    investors: t("investors"),
    projects: t("projects"),
    policies: t("policies"),
  };
  return (
    <MainLayout
      title="Privacy policy"
      commonLang={commonLang}
      mainLayoutSocial={mainLayoutSocial}
    >
      <div className={`${isMobile ? "col-10 m-auto pb-20" : "mt-4"}`}>
        <p>"SMARTBOLLA SYSTEMS TECHNOLOGY" LLC</p>
        <p>
          Dubai, United Arab Emirates, Mazaya Business Avenue; Diamond Business
          Center; BB1 Tower, Level 18, Unit №1801-1808 PO BOX 26734, +971
          43699090.
        </p>
        <p style={{ textAlign: "center" }}>Privacy Police</p>
        <p>
          1. Any information transferred by the Parties to each other when using
          the resources of the Site (smartbolla.com) is confidential
          information. The site smartbolla.com does not control and is not
          responsible for third-party sites to which the User can click on the
          links available on the Site.
        </p>
        <p>
          2. The user gives permission to the Site Administration to collect,
          process and store his personal data, as well as to send text and
          graphic information of an advertising nature.
        </p>
        <p>
          3. The Parties undertake to comply with this agreement governing the
          legal relationship associated with the establishment, change and
          termination of the confidentiality regime with respect to the personal
          information of the Parties and not to disclose confidential
          information to third parties.
        </p>
        <p>
          4. The Site Administration collects two types of information about the
          User:
        </p>
        <p>
          - personal information that the User deliberately disclosed to the
          Site Administration in order to use the resources of the Site;
        </p>
        <p>
          - technical information automatically collected by the software of the
          Site during its visit. When the User visits the Site, the support
          service automatically becomes available information from the standard
          server logs. This includes the IP address of the User's computer (or
          proxy server, if it is used to access the Internet), the name of the
          Internet provider, domain name, type of browser and operating system,
          information about the site from which the User made the transition to
          the Site, the pages of the Site which the User visits, the date and
          time of these visits, the files that the User uploads. This
          information is analyzed programmatically in an aggregated (impersonal)
          form to analyze website traffic, and is used in the development of
          proposals for its improvement and development. The relationship
          between the IP address and the User's personal information is never
          disclosed to third parties, except when required by the legislation of
          the country of which the User is a resident.
        </p>
        <p>
          5. The Site Administration takes the protection of the User's personal
          data very seriously and never provides the User's personal information
          to anyone, except when directly requested by the authorized state
          body. All personal information of the User is used to communicate with
          him, to execute a transaction concluded between the Users of the Site
          using the resources of the Site, to analyze site traffic, to develop
          proposals for its improvement and development, and can be disclosed to
          other third parties only with his permission.
        </p>
        <p>
          6. The Site Administration protects the User's personal information,
          applying generally accepted security methods to ensure the protection
          of information from loss, distortion and unauthorized distribution.
          Security is implemented by firewall software, access verification
          procedures, the use of cryptographic information protection tools, and
          compliance with the privacy policy.
        </p>
        <p>
          The Site implements a user identification technology based on the use
          of cookies. Cookies are small files that are stored on the User's
          computer by means of a web browser. Cookies may be stored on the
          computer used by the User to access the Site, which will later be used
          for automatic authorization, as well as for collecting statistical
          data, in particular on Site traffic. The Site Administration does not
          store personal data or passwords in cookies. The user has the right to
          prevent the storage of cookies on the computer used to access the Site
          by adjusting his browser accordingly. It should be borne in mind that
          all services using this technology may be unavailable.
        </p>
        <p>
          7. The Site Administration has the right to make changes to this
          Privacy Policy without the consent of the User. The new Privacy Policy
          comes into force from the moment it is posted on the Site, unless
          otherwise provided by the new edition of the Privacy Policy.
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
