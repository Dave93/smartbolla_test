import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./AboutPage.module.css";
import { useTranslation } from "next-i18next";

function About({ aboutText }) {
  const { t: translation } = useTranslation("aboutPage");
  return (
    <div className="sm:flex font-bold">
      <div className="md:w-1/2 uppercase">
        <div className="text-2xl mb-1.5">{translation("title")}:</div>
        <div dangerouslySetInnerHTML={{ __html: aboutText }}></div>
      </div>
      <div className="border-4 m-auto uppercase md:w-96 p-2 rounded-2xl border-black">
        <a
          href="https://api.smartbolla.com/upload/docs/Certificate_Registration.pdf"
          className="text-2xl"
        >
          <div className="hover:underline">{translation("documentCertif")}</div>
        </a>
        <a
          href="https://api.smartbolla.com/upload/docs/Service_License.pdf"
          className="text-2xl"
        >
          <div className="md:flex mt-2 hover:underline justify-between">
            <div class="w-3/4">{translation("documentLicen")}</div>
            <FontAwesomeIcon icon={faFileAlt} className="w-10 text-6xl" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default About;
