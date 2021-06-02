import styles from "./Project.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SecureLogo from '../../public/secure.svg'

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
      <div
        key={project.ID}
        className="grid grid-cols-2 gap-4 items-center overflow-hidden mb-10"
      >
        <div className="text-black">
          <div className="border">
            <div className="text-5xl p-10">Paycent</div>
            <div className="text-2xl p-2">
              A payment system that will combine all the best features payment
              systems on the market.
            </div>
          </div>
          <div className="mt-1 border flex">
            <SecureLogo />
            <div className="p-3">
              Secure transactions that do not require confidants
            </div>
          </div>
          <div className="mt-1 border flex">
            <SecureLogo />
            <div className="p-3">Fast speed and low transaction fees;</div>
          </div>
          <div className="mt-1 border flex">
            <SecureLogo />
            <div className="p-3">Reliability</div>
          </div>
          <div className="mt-1 border flex">
            <SecureLogo />
            <div className="p-3">Without an account in the banking system</div>
          </div>
        </div>
        <div className="...">
          <motion.div initial="hidden" animate={controls} variants={logoBlock}>
            <div className="items-center h-full justify-around relative ">
              <img src={project.DETAIL_PICTURE} className="w-50" />
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
    </div>
  );
}

export default Project;
