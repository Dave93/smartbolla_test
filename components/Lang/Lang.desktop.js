import React, { useRef, useState } from "react";
import { Ae, Ru, Us, Uz, Fr, Cn, Es } from "react-flags-select";
import { useRouter } from "next/router";
import Link from "next/link";
import useOutsideClick from "../../hooks/useOutsideClick";

const locales = {
  ru: Ru,
  ae: Ae,
  en: Us,
  uz: Uz,
  fr: Fr,
  cn: Cn,
  es: Es,
};

export default function Lang() {
  const router = useRouter();
  const { locale, pathname } = router;
  const localeComponent = locales[locale]();

  const [isLandDropActive, setIsActiveDropActive] = useState(false);

  const ref = useRef();

  useOutsideClick(ref, () => {
    setIsActiveDropActive(false);
  });

  return (
    <div ref={ref} className="relative inline-block float-right text-3x1">
      <button
        type="button"
        className={`${
          isLandDropActive ? "bg-blue-800 border" : ""
        } focus:outline-none outline-none font-medium hover:bg-blue-800 inline-flex justify-center px-4 py-2 rounded-md shadow-sm text-gray-700 text-2xl`}
        id="langs-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setIsActiveDropActive(!isLandDropActive)}
      >
        {localeComponent}
      </button>
      <div
        className={`${
          isLandDropActive ? "" : "hidden"
        } absolute border mt-2 origin-top-right right-0 ring-1 ring-black ring-opacity-5 rounded-md shadow-lg z-20`}
      >
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="langs-menu"
        >
          {Object.keys(locales)
            .filter((key) => key !== locale)
            .map((key) => (
              <Link href={pathname} locale={key} key={key} scroll={false} prefetch={false}>
                <a
                  className="block hover:bg-blue-800 px-4 py-2 text-gray-700"
                  role="menuitem"
                >
                  {locales[key]()}
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
