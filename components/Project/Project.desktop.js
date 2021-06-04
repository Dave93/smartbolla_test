import styles from "./Project.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SecureLogo from "../../public/secure.svg";
import GroupLogo from "../../public/Group.svg";
import Rectangle from "../../public/Rectangle79.svg";

library.add(faYoutube, faArrowLeft);

function Project({ project, onShowYoutube }) {
  console.log(project)
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }

    if (!inView) {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <div ref={ref}>
      <div
        key={project.ID}
        className={`${styles.body} overflow-hidden relative`}
      >
        <div className={styles.leftBlock1}>
          <div className={styles.border}>
            <div className={styles.title1}>{project.NAME}</div>
            <div className={`${styles.description} p-3`}>
              {project.PREVIEW_TEXT}
            </div>
          </div>
          <div className={`${styles.border} mt-1 flex`}>
            <div className="p-3 align-items-center flex">
              <SecureLogo />
              Secure transactions that do not require confidants
            </div>
          </div>
          <div className={`${styles.border} mt-1 flex`}>
            <div className="p-3 align-items-center flex">
              <SecureLogo />
              Secure transactions that do not require confidants
            </div>
          </div>
          <div className={`${styles.border} mt-1 flex`}>
            <div className="p-3 align-items-center flex">
              <SecureLogo />
              Secure transactions that do not require confidants
            </div>
          </div>
          <div className={`${styles.border} mt-1 flex`}>
            <div className="p-3 align-items-center flex">
              <SecureLogo />
              Secure transactions that do not require confidants
            </div>
          </div>
        </div>
        <div className={styles.rightBlock1}>
          <div className={styles.logoBox}>
            {project.PROPERTY_YOUTUBE_LINK_VALUE && (
              <div
                className="absolute"
                onClick={() => {
                  onShowYoutube(project.PROPERTY_YOUTUBE_LINK_VALUE);
                }}
              >
                <GroupLogo className={styles.logoRight} />
              </div>
            )}
          </div>
        </div>
        <div>
          <Rectangle className={styles.rectangle1} />
        </div>
      </div>
      <div
        key={project.ID}
        className={`${styles.body} overflow-hidden relative`}
      >
        <div className={styles.leftBlock2}>
          <div className={styles.logoBox}>
            {project.PROPERTY_YOUTUBE_LINK_VALUE && (
              <div
                className="absolute"
                onClick={() => {
                  onShowYoutube(project.PROPERTY_YOUTUBE_LINK_VALUE);
                }}
              >
                <GroupLogo className={styles.logoRight} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.rightBlock2}>
          <div className={styles.border}>
            <div className={styles.title2}>{project.NAME}</div>
            <div className={`${styles.description} p-3`}>
              {project.PREVIEW_TEXT}
            </div>
          </div>
          <div className={`${styles.border} mt-1 flex`}>
            <div className="p-3 align-items-center flex">
              <SecureLogo />
              Secure transactions that do not require confidants
            </div>
          </div>
          <div className={`${styles.border} mt-1 flex`}>
            <div className="p-3 align-items-center flex">
              <SecureLogo />
              Secure transactions that do not require confidants
            </div>
          </div>
          <div className={`${styles.border} mt-1 flex`}>
            <div className="p-3 align-items-center flex">
              <SecureLogo />
              Secure transactions that do not require confidants
            </div>
          </div>
          <div className={`${styles.border} mt-1 flex`}>
            <div className="p-3 align-items-center flex">
              <SecureLogo />
              Secure transactions that do not require confidants
            </div>
          </div>
        </div>
        <div>
          <Rectangle className={styles.rectangle2} />
        </div>
      </div>
    </div>
  );
}

export default Project;
