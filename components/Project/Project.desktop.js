import styles from "./Project.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
  const textBlock = {
    hidden: {
      x: -2000,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  const logoBlock = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.4, 1],
    },
  };

  return (
    <div ref={ref} className={`flex h-full items-center`}>
      <div className={`absolute h-full ${styles.projectRandomObjects} w-full`}>
        {project.PROPERTY_PHOTOS &&
          project.PROPERTY_PHOTOS.map((img, i) => (
            <img
              key={i}
              data-src={img}
              style={{
                left: `${Math.floor(Math.random() * 80) + 1}%`,
                top: `${Math.floor(Math.random() * 80) + 1}%`,
              }}
            />
          ))}
      </div>
      <div
        key={project.ID}
        className="grid grid-cols-3 items-center overflow-hidden"
      >
        <div className="col-span-2 z-20">
          <motion.div
            initial="hidden"
            transition={{ duration: 0.6 }}
            animate={controls}
            variants={textBlock}
          >
            <div>
              <div className={styles.textBlock}>
                <div>
                  <h1 className="font-extralight text-5xl text-center">
                    {project.NAME}
                  </h1>
                  {project.PREVIEW_TEXT}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div initial="hidden" animate={controls} variants={logoBlock}>
          <div className="flex items-center h-full justify-around relative z-20">
            <img src={project.DETAIL_PICTURE} className="w-8/12" />
            {project.PROPERTY_YOUTUBE_LINK_VALUE && (
              <div
                className="absolute"
                onClick={() => {
                  onShowYoutube(project.PROPERTY_YOUTUBE_LINK_VALUE);
                }}
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  size="lg"
                  className="cursor-pointer text-red-500 w-12"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Project;
