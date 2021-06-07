import styles from "./Project.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import Rectangle from "../../public/Rectangle79.svg";
import Image from "next/image";

library.add(faYoutube, faArrowLeft);

function Project({ project, onShowYoutube }) {
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
      {project.PROPERTY_POSITION_VALUE === "Левый" ? (
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
            {project.PROPERTY_PHOTOS_DESCRIPTION.map((desc, i) => {
              return (
                <div className={`${styles.border} mt-1 flex`}>
                  <div>
                    <div key={i} className="p-3 align-items-center flex">
                      <Image
                        src={project.PROPERTY_PHOTOS[i]}
                        width={64}
                        height={64}
                      />
                      <div className="ml-3">{desc}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.rightBlock1}>
            <div className={styles.logoBox1}>
              {project.PROPERTY_YOUTUBE_LINK_VALUE && (
                <div
                  className="absolute"
                  onClick={() => {
                    onShowYoutube(project.PROPERTY_YOUTUBE_LINK_VALUE);
                  }}
                >
                  <Image
                    src={project.DETAIL_PICTURE}
                    alt="Logo"
                    width={300}
                    height={300}
                    className={styles.logo}
                  />
                  <FontAwesomeIcon
                    icon={faYoutube}
                    size="lg"
                    className="absolute text-red-500 w-12"
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <Rectangle
              className={styles.rectangle1}
              style={{ background: project.PROPERTY_BACKGROUND_COLOR_VALUE }}
            />
          </div>
        </div>
      ) : (
        <div
          key={project.ID}
          className={`${styles.body} overflow-hidden relative`}
        >
          <div className={styles.leftBlock2}>
            <div className={styles.logoBox2}>
              {project.PROPERTY_YOUTUBE_LINK_VALUE && (
                <div
                  className="absolute"
                  onClick={() => {
                    onShowYoutube(project.PROPERTY_YOUTUBE_LINK_VALUE);
                  }}
                >
                  <Image
                    src={project.DETAIL_PICTURE}
                    alt="Logo"
                    width={300}
                    height={300}
                    className={styles.logo}
                  />
                  <FontAwesomeIcon
                    icon={faYoutube}
                    size="lg"
                    className="absolute text-red-500 w-12"
                  />
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
            {project.PROPERTY_PHOTOS_DESCRIPTION.map((desc, i) => {
              return (
                <div className={`${styles.border} mt-1 flex`}>
                  <div>
                    <div key={i} className="p-3 align-items-center flex">
                      <Image
                        src={project.PROPERTY_PHOTOS[i]}
                        width={64}
                        height={64}
                      />
                      {desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <Rectangle
              className={styles.rectangle2}
              style={{ background: project.PROPERTY_BACKGROUND_COLOR_VALUE }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;
