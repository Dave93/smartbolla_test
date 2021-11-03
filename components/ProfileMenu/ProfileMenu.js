import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./ProfileMenu.module.css";
import { isMobile } from "react-device-detect";
import { useCookies } from "react-cookie";

function ProfileMenu({ balance, accountSetings, logOut, referalsLabel }) {
  const router = useRouter();
  const { locale, pathname } = router;

  const navButtons = [
    {
      label: balance,
      path: "/profile",
    },
    {
      label: accountSetings,
      path: "/profile/account",
    },
    {
      label: referalsLabel,
      path: "/profile/referals",
    },
  ];

  const [userAuthToken, setUserAuthToken] = useCookies(["userAuthToken"]);

  const logout = async () => {
    setUserAuthToken("userAuthToken", "");
    return router.push("/", undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <ul
        className={`${styles.ul} ${
          isMobile
            ? "p-4 shadow sidebar-menu mb-10"
            : "m-12 p-4 shadow sidebar-menu"
        }`}
      >
        {navButtons.map((button) => (
          <li className="p-2" key={button.label}>
            <Link href={`/${locale}${button.path}`}>
              <a
                className={`${pathname === button.path ? styles.isActive : ""}`}
              >
                {button.label}
              </a>
            </Link>
          </li>
        ))}
        <li className="p-2">
          <a
            className="cursor-pointer"
            onClick={() => {
              logout();
            }}
          >
            {logOut}
          </a>
        </li>
      </ul>
    </>
  );
}

export default ProfileMenu;
