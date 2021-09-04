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
      {project.PROPERTY_POSITION_VALUE && (
        <div key={project.ID} className="md:flex justify-between mt-36">
          <div className="md:w-7/12">
            <div
              className={`${
                project.PROPERTY_POSITION_VALUE === "Правый"
                  ? "align-items-md-center bg-gray-100 flex mx-auto ml-auto md:mr-0 max-h-96 mt-40 rounded-3xl md:rounded-l-3xl shadow-inner w-56 md:w-8/12 md:rounded-r-none"
                  : "align-items-md-center bg-gray-100 flex mx-auto md:ml-0 max-h-96 mt-40  md:rounded-r-3xl rounded-3xl md:rounded-l-none shadow-inner justify-end w-56 md:w-8/12"
              }`}
            >
              {project.PROPERTY_YOUTUBE_LINK_VALUE && (
                <div
                  className="md:m-5 rounded-3xl flex m-3"
                  onClick={() => {
                    onShowYoutube(project.PROPERTY_YOUTUBE_LINK_VALUE);
                  }}
                >
                  <Image
                    src={project.DETAIL_PICTURE}
                    alt="Logo"
                    width={300}
                    height={300}
                    className="p-3 cursor-pointer shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>
          <div
            className={`${
              project.PROPERTY_POSITION_VALUE === "Правый"
                ? "md:order-first text-black p-5 md:w-3/5  m-10"
                : "text-black p-5 m-10 md:w-3/5"
            }`}
          >
            <div
              className={`${project.PROPERTY_BACKGROUND_COLOR_VALUE} border rounded-2xl shadow-lg mb-3 bg-gradient-to-l from-blue-100 to-green-50`}
            >
              <div className={`${styles.title1} flow-root text-4xl md:text-5xl`}>
                <div className="float-left">{project.NAME}</div>
                <div className="float-right">
                  {project.PROPERTY_PLAYMARKET_LINK_VALUE && (
                      <a href={project.PROPERTY_PLAYMARKET_LINK_VALUE} target="_blank" className="pr-3">
                        <Image
                            src="/playmarket.png"
                            width={150}
                            height={70}
                        />
                      </a>
                  )}
                  {project.PROPERTY_APPSTORE_LINK_VALUE && (
                      <a href={project.PROPERTY_APPSTORE_LINK_VALUE} target="_blank">
                        <Image
                            src="/appstore.png"
                            width={150}
                            height={70}
                        />
                      </a>
                  )}
                </div>
              </div>
              <div className="uppercase px-4 font-bold">
                {project.PREVIEW_TEXT}
              </div>
            </div>
            {project.PROPERTY_PHOTOS_DESCRIPTION.map((desc, i) => {
              return (
                <div
                  className={`${project.PROPERTY_BACKGROUND_COLOR_VALUE} mt-1 flex p-2 border shadow-lg rounded-2xl bg-gradient-to-l from-blue-100 to-green-50`}
                  key={i}
                >
                  <div>
                    <div className="items-center flex">
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
        </div>
      )}
      {/* <div>
        <Rectangle
          className={`${
            project.PROPERTY_POSITION_VALUE === "Левый"
              ? "-m-10 -rotate-6 h-16 opacity-60 transform"
              : "md:rotate-6 m-14 -rotate-12 h-16 transform opacity-60"
          }`}
          style={{ background: project.PROPERTY_BACKGROUND_COLOR_VALUE }}
        />
      </div> */}
    </div>
  );
}

export default Project;
