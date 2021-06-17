import { MainLayout } from "../../components/MainLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PhoneInput from "react-phone-input-2";
import React, { useState } from "react";
import { Formik } from "formik";
import { useCookies } from "react-cookie";
import "react-phone-input-2/lib/style.css";
import styles from "./Auth.module.css";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import Link from "next/link";

let timerInvetval = null;
let intervalTime = 60;

function AuthPage({ mainLayoutSocial }) {
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

  const tryLogin = async (phone, password) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        method: "phone.auth.login",
        data: {
          phone,
          password,
        },
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
        className={`${isAjaxLoading ? styles.isAuthLoading : "m-auto md:w-96"}`}
      >
        <Formik
          initialValues={{ phone: "", password: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.phone) {
              errors.phone = t("phoneFilled");
            }

            if (!values.password) {
              errors.password = t("phoneFilled");
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setIsAjaxLoading(true);
            setSubmitError("");
            await tryLogin(values.phone, values.password);
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
                  {t("typingPhone")}
                </label>
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
                  inputClass="w-full h-10"
                />
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
                  className="px-3 py-2 w-full rounded"
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
