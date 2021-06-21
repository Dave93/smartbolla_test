import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./AboutPage.module.css";
import { useTranslation } from "next-i18next";

function About({ aboutText }) {
  const { t: translation } = useTranslation("aboutPage");
  return (
    <div className="font-bold items-center md:flex">
      <div className="md:w-6/12 uppercase">
        <div className="text-2xl mb-1.5">{translation("title")}:</div>
        <div dangerouslySetInnerHTML={{ __html: aboutText }}></div>
      </div>
      <div className="md:absolute h-2/5 inline-flex items-center right-0 rounded-l-3xl shadow-2xl md:w-2/5 mt-10 mb-10">
        <div className="border-4 border-black md:ml-12 p-4 rounded-2xl uppercase md:w-2/3">
          <a
            href="https://api.smartbolla.com/upload/docs/Certificate_Registration.pdf"
            className="text-2xl"
          >
            <div className="hover:underline">
              {translation("documentCertif")}
            </div>
          </a>
          <a
            href="https://api.smartbolla.com/upload/docs/Service_License.pdf"
            className="text-2xl"
          >
            <div className="lg:flex mt-2 hover:underline">
              <div>{translation("documentLicen")}</div>
              <FontAwesomeIcon icon={faFileAlt} className="w-10 text-6xl mr-2" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
