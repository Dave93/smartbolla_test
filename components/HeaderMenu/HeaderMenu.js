import Link from "next/link";
import styles from "./HeaderMenu.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

export default function HeaderMenu({ commonLang }) {
  const navButtons = [
    {
      label: commonLang.projectsLabel,
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
    {
      label: commonLang.investors,
      path: "/investors",
    },
  ];
  const { pathname } = useRouter();
  return (
    <>
      <nav className="flex justify-between w-full px-10">
        <div className="flex flex-row items-center text-decoration-none">
          <Link href="/" prefetch={false}>
            <a>
              <div>
                <Image src="/img/main-logo.png" width={200} height={40} />
              </div>
            </a>
          </Link>
        </div>
        <ul className="md:flex items-center hidden">
          {navButtons.map((button) => (
            <li className={`relative `} key={button.path}>
              <Link href={button.path} prefetch={false}>
                <a
                  className={`${
                    pathname === button.path ? styles.isActive : ""
                  }  uppercase mr-3`}
                  style={pathname === button.path ? { color: "#f6c886" } : {}}
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
