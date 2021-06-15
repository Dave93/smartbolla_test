import Link from "next/link";
import styles from "./HeaderMenu.module.css";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Image from "next/image";

export default function HeaderMenu({ commonLang }) {
  const navButtons = [
    {
      label: commonLang.projects,
      path: "/projects",
    },
    {
      label: commonLang.about,
      path: "/about",
    },
    {
      label: commonLang.media,
      path: "/media",
    },
    {
      label: commonLang.contact,
      path: "/contacts",
    },

    {
      label: commonLang.profile,
      path: "/profile",
    },
  ];
  const { pathname } = useRouter();
  return (
    <>
      <nav className="flex justify-between w-1/2">
        <div>
          <Link href="/" prefetch={false}>
            <a className="flex flex-row items-center text-decoration-none">
              <div>
                <Image src="/img/main-logo.png" width={50} height={50} />
              </div>
              <div className="font-bold ml-3 text-white uppercase text-2x1">
                SmartBolla
              </div>
            </a>
          </Link>
        </div>
        <ul className="md:flex items-center hidden">
          {navButtons.map((button) => (
            <li className={`relative text-white`} key={button.path}>
              <Link href={button.path} prefetch={false}>
                <a
                  className={`${
                    pathname === button.path ? styles.isActive : ""
                    }  uppercase mr-3`}
                  style={pathname === button.path ? {color: '#f6c886'} : {}}
                >
                  <span>{button.label}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
