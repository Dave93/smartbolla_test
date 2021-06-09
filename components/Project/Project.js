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

function Project({ project, onShowYoutube, onClick }) {
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
          className="flex justify-between flex-col md:flex-row"
        >
          <div className="text-black p-5 col md:col-6">
            <div className="border-2 border-black">
              <div className={styles.title1}>{project.NAME}</div>
              <div className="uppercase px-4 font-bold">
                {project.PREVIEW_TEXT}
              </div>
            </div>
            {project.PROPERTY_PHOTOS_DESCRIPTION.map((desc, i) => {
              return (
                <div className={`${styles.border} mt-1 flex`} key={i}>
                  <div>
                    <div className="p-3 align-items-center flex">
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
          <div className="w-7/12">
            <div className="align-items-md-center bg-gray-100 flex md:max-h-96 md:ml-auto md:mt-40 md:rounded-l-3xl md:shadow-lg shadow w-8/12">
              {project.PROPERTY_YOUTUBE_LINK_VALUE && (
                <div
                  className="bg-black m-5 rounded-3xl flex"
                  onClick={() => {
                    onShowYoutube(project.PROPERTY_YOUTUBE_LINK_VALUE);
                  }}
                >
                  <Image
                    src={project.DETAIL_PICTURE}
                    alt="Logo"
                    width={300}
                    height={300}
                    className="p-3 cursor-pointer"
                  />
                  {/* <FontAwesomeIcon icon={faYoutube} size="lg" className="" /> */}
                </div>
              )}
            </div>
          </div>
          {/* <div>
            <Rectangle
              className={styles.rectangle1}
              style={{ background: project.PROPERTY_BACKGROUND_COLOR_VALUE }}
            />
          </div> */}
        </div>
      ) : (
        <div
          key={project.ID}
          className={`${styles.projectBody} overflow-hidden relative`}
        >
          <div className={styles.leftBlock2}>
            <div className={styles.logoBox2}>
              {project.PROPERTY_YOUTUBE_LINK_VALUE && (
                <div
                  className="flex"
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
                    className={styles.youtube}
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
                <div className={`${styles.border} mt-1 flex`} key={i}>
                  <div>
                    <div className="p-3 align-items-center flex">
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
          {/* <div>
            <Rectangle
              className={styles.rectangle2}
              style={{ background: project.PROPERTY_BACKGROUND_COLOR_VALUE }}
            />
          </div> */}
        </div>
      )}
    </div>
  );
}

export default Project;
