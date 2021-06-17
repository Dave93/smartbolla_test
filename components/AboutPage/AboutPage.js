import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import styles from "./AboutPage.module.css";
import { useTranslation } from "next-i18next";

function About({ aboutText }) {
  const { t: translation } = useTranslation("aboutPage");
  return (
    <div className="md:flex">
      <div className={`md:border-r md:w-4/5`}>
        <div className="text-2xl mb-1.5">{translation("title")}:</div>
        <div dangerouslySetInnerHTML={{ __html: aboutText }}></div>
      </div>
      <div className="md:pl-10 pt-10 md:pt-0">
        <div className="text-2xl pb-3">{translation("documentTitle")}:</div>
        <a
          href="https://api.smartbolla.com/upload/docs/Certificate_Registration.pdf"
          className={`${styles.a} flex pb-4`}
        >
          <FontAwesomeIcon icon={faFile} className="w-10 text-5xl" />
          <div className="m-1.5 pl-4">{translation("documentCertif")}</div>
        </a>
        <a
          href="https://api.smartbolla.com/upload/docs/Service_License.pdf"
          className={`${styles.a} flex pb-4`}
        >
          <FontAwesomeIcon icon={faFile} className="w-10 text-5xl" />
          <div className="m-1.5 pl-4">{translation("documentLicen")}</div>
        </a>
      </div>
    </div>
  );
}

export default About;
