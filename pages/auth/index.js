import { MainLayout } from "../../components/MainLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PhoneInput from "react-phone-input-2";
import React, { useState, Fragment } from "react";
import { Formik } from "formik";
import { useCookies } from "react-cookie";
import "react-phone-input-2/lib/style.css";
import styles from "./Auth.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

let timerInvetval = null;
let intervalTime = 60;

const authType = [
  {
    id: "email",
    name: "E-mail",
  },
  {
    id: "phone",
    name: "Phone",
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AuthPage({ mainLayoutSocial }) {
  const [authTypeSelect, setAuthTypeSelect] = useState(authType[0]);
  const { t } = useTranslation("authPage");
  const commonLang = {
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    investors: t("investors"),
    policies: t("policies"),
    projects: t("projects"),
  };

  const footerLang = {
    allRightsRes: t("allRightsRes"),
    weWoldLike: t("weWoldLike"),
  };

  const [submitErrors, setSubmitError] = useState("");

  const [isAjaxLoading, setIsAjaxLoading] = useState(false);

  const [userAuthToken, setUserAuthToken] = useCookies(["userAuthToken"]);

  const router = useRouter();
  const { pathname } = router;
  const { backUrl } = router.query;

  const resetRoute = pathname + "/reset?backUrl=" + backUrl;

  const startTimer = () => {
    intervalTime = 60;
    setSmsTimer(intervalTime);
    timerInvetval = setInterval(() => {
      intervalTime--;
      setSmsTimer(intervalTime);
      if (intervalTime == 0) {
        clearInterval(timerInvetval);
      }
    }, 1000);
  };

  const tryLogin = async (phone, password, email) => {
    let loginPostData = {
      password,
    };

    if (authTypeSelect.id == "email" && email) {
      loginPostData.email = email;
    } else {
      loginPostData.phone = phone;
    }

    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        method: "phone.auth.login",
        data: loginPostData,
      }),
      headers: {
        ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
      },
    });

    const { data, error } = await res.json();

    if (!data.result) {
      setSubmitError(t("incorrect")); // TODO: Show lang message "Phone not found or password is incorrect"
    } else {
      setUserAuthToken("userAuthToken", data.token, {
        path: "/",
      });
      if (backUrl) {
        return router.push(backUrl, undefined, {
          shallow: true,
        });
      } else {
        return router.push("/", undefined, {
          shallow: true,
        });
      }
    }
  };

  return (
    <MainLayout
      title={t("title")}
      commonLang={commonLang}
      mainLayoutSocial={mainLayoutSocial}
      footerLang={footerLang}
    >
      <div
        className={`${
          isAjaxLoading ? styles.isAuthLoading : "m-auto md:w-2/5"
        }`}
      >
        <Formik
          initialValues={{ phone: "", password: "", email: "" }}
          validate={(values) => {
            const errors = {};

            if (authTypeSelect.id == "phone" && !values.phone) {
              errors.phone = t("phoneFilled");
            }

            if (authTypeSelect.id == "email" && !values.email) {
              errors.phone = t("emailFilled");
            }

            if (!values.password) {
              errors.password = t("passwordFilled");
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setIsAjaxLoading(true);
            setSubmitError("");
            await tryLogin(values.phone, values.password, values.email);
            setSubmitting(false);
            setIsAjaxLoading(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="shadow p-10 rounded" onSubmit={handleSubmit}>
              {submitErrors.length > 0 && (
                <div className="text-red-500">{submitErrors}</div>
              )}
              {Object.keys(errors).length > 0 && (
                <div className="text-red-500">
                  {Object.values(errors).map((err, i) => (
                    <div key={i}>{err}</div>
                  ))}
                </div>
              )}
              <div className="text-black">
                <label className="block mb-3 " htmlFor="">
                  {authTypeSelect.id == "email"
                    ? t("typingEmail")
                    : t("typingPhone")}
                </label>
                <div className="flex items-center">
                  <Listbox value={authTypeSelect} onChange={setAuthTypeSelect}>
                    {({ open }) => (
                      <>
                        <div className="mr-2 relative">
                          <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="flex items-center">
                              <span className="ml-3 block truncate">
                                {authTypeSelect.name}
                              </span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            >
                              {authType.map((person) => (
                                <Listbox.Option
                                  key={person.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "text-white bg-indigo-600"
                                        : "text-gray-900",
                                      "cursor-default select-none relative py-2 pl-3 pr-9"
                                    )
                                  }
                                  value={person}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <div className="flex items-center">
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "ml-3 block truncate"
                                          )}
                                        >
                                          {person.name}
                                        </span>
                                      </div>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? "text-white"
                                              : "text-indigo-600",
                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                          )}
                                        >
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                  {authTypeSelect.id == "email" ? (
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="text-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  ) : (
                    <PhoneInput
                      country={"us"}
                      value={values.phone}
                      inputProps={{
                        name: "phone",
                      }}
                      onChange={(phone, rer, e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      autoComplete="off"
                      inputClass="w-full h-10 bg-gray-200"
                    />
                  )}
                </div>
                <label className="block mb-3 mt-3" htmlFor="">
                  {t("password")}
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="bg-gray-200 border border-gray-300 px-3 py-2 rounded w-full"
                />
                <div className="my-2 ">
                  <Link href={resetRoute}>
                    <a className="leading-10 font-bold">{t("resetPass")}</a>
                  </Link>
                </div>
              </div>
              <div className="mb-6">{t("authRegText")}</div>
              <button type="submit" className={styles.formControlSubmitButton}>
                {t("signIn")}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ locale }) {
  const socials = await fetch("https://api.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "social.links",
      data: {
        locale: locale,
      },
    }),
    headers: {
      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
    },
  });

  let { data: mainLayoutSocial } = await socials.json();

  return {
    props: {
      mainLayoutSocial,
      ...(await serverSideTranslations(locale, ["authPage"])),
    },
  };
}

export default AuthPage;
