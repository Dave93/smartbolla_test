import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faTelegram,
  faYoutube,
  fab,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import styles from "./Social.module.css";

library.add(faFacebook, faInstagram, faTiktok, faTelegram, faYoutube, fab);

function Socials({ mainLayoutSocial }) {
  return (
    <motion.ul
      transition={{
        staggerChildren: 0.1,
        duration: 0.6,
      }}
      className="fixed float-right right-3.5 top-1/3 w-6"
    >
      {mainLayoutSocial.SOC_ICONS &&
        mainLayoutSocial.SOC_ICONS.map((item) => (
          <motion.li
            animate={{
              x: [100, 0, -10, 0],
            }}
            className="pb-6"
            key={item.LINK}
          >
            <a href={item.LINK}>
              <FontAwesomeIcon
                size="lg"
                icon={["fab", item.ICON]}
                className={`${styles.faStack1x} text-white`}
              />
            </a>
          </motion.li>
        ))}
    </motion.ul>
  );
}

export default Socials;
