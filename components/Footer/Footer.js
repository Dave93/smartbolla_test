import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./footer.module.css";
import {
  faPhotoVideo,
  faMapMarkerAlt,
  faUser,
  faUsers,
  faAddressCard,
  faUserShield,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "next-i18next";

export default function Footer({ commonLang }) {
  const navButtons = [
    {
      label: commonLang.about,
      path: "/about",
      icon: faAddressCard,
    },
    // {
    //   label: commonLang.media,
    //   path: "/media",
    //   icon: faPhotoVideo,
    // },
    {
      label: commonLang.contact,
      path: "/contacts",
      icon: faMapMarkerAlt,
    },
    {
      label: commonLang.profile,
      path: "/profile",
      icon: faUser,
    },
    {
      label: commonLang.investors,
      path: "/investors",
      icon: faUsers,
    },
    // {
    //   label: commonLang.projects,
    //   path: "/projects",
    //   icon: faProjectDiagram,
    // },

    // {
    //   label: commonLang.policies,
    //   path: "/policies",
    //   icon: faUserShield,
    // },
  ];
  const { pathname } = useRouter();
  return (
    <div
      id="bottom-navigation"
      className="block fixed inset-x-0 bottom-0 z-10 shadow md:hidden"
      style={{
        background: "linear-gradient(270deg, #0C0E12 0.14%, #242C40 100%)",
      }}
    >
      <div id="tabs" className="flex justify-around items-baseline">
        {navButtons.map((button, i) => (
          <Link href={button.path} key={i} prefetch={false}>
            <a className="focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 text-decoration-none">
              <FontAwesomeIcon
                icon={button.icon}
                className={`${
                  pathname === button.path ? "text-white" : styles.siteGoldColor
                } w-10 h-6 m-auto`}
              />
              <span
                className={`${
                  pathname === button.path ? "text-white" : styles.siteGoldColor
                } tab tab-whishlist block text-xs mt-1`}
              >
                {button.label}
              </span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
