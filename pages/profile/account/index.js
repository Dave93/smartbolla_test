import { MainLayout } from "../../../components/MainLayout";
import styles from "../Profile.module.css";
import { Formik, Field, Form } from "formik";
import ProfileMenu from "../../../components/ProfileMenu/ProfileMenu";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { parseCookies } from "../../../helpers/";
import asyncForEach from "../../../helpers/asyncForEach";
import { isMobile } from "react-device-detect";

function Account({ orderProps, mainLayoutSocial, userAuthToken }) {
  const { t } = useTranslation("accountPage");
  const balance = t("balance");
  const accountSetings = t("accountSetings");
  const logOut = t("logOut");

  const commonLang = {
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    investors: t("investors"),
  };

  const footerLang = {
    allRightsRes: t("allRightsRes"),
    weWoldLike: t("weWoldLike"),
  };
  const renderField = (
    field,
    values,
    handleChange,
    handleBlur,
    setFieldValue
  ) => {
    if (field.CODE == "NAME") {
      field.NAME = t("NAME");
    }
    if (field.CODE == "LAST_NAME") {
      field.NAME = t("LAST_NAME");
    }
    if (field.CODE == "PHONE") {
      field.NAME = t("PHONE");
    }
    if (field.CODE == "PASPORT") {
      field.NAME = t("PASPORT");
    }

    switch (field.TYPE) {
      case "FILE":
        return (
          <>
            <label
              htmlFor={field.CODE}
              className={`${styles.accountFileButton} cursor-pointer`}
            >
              {t("downloadButtonText")}
            </label>
            <input
              type={"file"}
              name={field.ID}
              id={field.CODE}
              style={{ visibility: "hidden" }}
              required
              onChange={(event) => {
                setFieldValue(field.ID, event.currentTarget.files[0]);
              }}
              className="dark:bg-gray-700 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-900 dark:placeholder-gray-500 dark:text-white focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-100 placeholder-gray-300 px-3 py-2 rounded-md w-full"
            />
          </>
        );

      default:
        return (
          <input
            type="text"
            name={field.ID}
            id={field.CODE}
            required
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[field.ID]}
            className="text-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
          />
        );
        break;
    }
  };

  const initialValues = orderProps["ORDER_PROP_FIELDS_VALUE"];

  return (
    <MainLayout
      commonLang={commonLang}
      footerLang={footerLang}
      title={t("title")}
      mainLayoutSocial={mainLayoutSocial}
    >
      <div className={`${isMobile ? "col" : "grid grid-cols-3"}`}>
        <div className={`${isMobile ? "col" : "col-span-2"}`}>
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors = {};
              orderProps["ORDER_PROP_FIELDS"].map((prop) => {
                if (prop.CODE == "NAME") {
                  prop.NAME = t("NAME");
                }
                if (prop.CODE == "LAST_NAME") {
                  prop.NAME = t("LAST_NAME");
                }
                if (prop.CODE == "PHONE") {
                  prop.NAME = t("PHONE");
                }
                if (prop.CODE == "PASPORT") {
                  prop.NAME = t("PASPORT");
                }
                if (prop.REQUIRED == "Y" && !values[prop.ID]) {
                  errors[prop.ID] = `Field "${prop.NAME}" is required`;
                }
              });
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await asyncForEach(
                  orderProps["ORDER_PROP_FIELDS"],
                  async (prop) => {
                    if (prop.TYPE == "FILE") {
                      values[prop.ID] = await new Response(
                        values[prop.ID]
                      ).text();
                    }
                  }
                );

                const res = await fetch("/api/orderPropData", {
                  method: "POST",
                  body: JSON.stringify({
                    method: "post.order.properties",
                    data: { ...values, authToken: userAuthToken },
                  }),
                  headers: {
                    ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
                  },
                });

                setSubmitting(false);
              } catch (error) {
                console.log(error);
              }
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
              setFieldValue,
              /* and other goodies */
            }) => (
              <form
                onSubmit={handleSubmit}
                className={`${isMobile ? "col pt-4" : "pt-4 w-7/12"}`}
              >
                <div className="text-red-500">
                  {errors.name && touched.name && errors.name}
                </div>
                <div className="text-red-500">
                  {errors.email && touched.email && errors.email}
                </div>
                {orderProps["ORDER_PROP_FIELDS"].map((prop) => (
                  <div className="mb-6" key={prop.ID}>
                    <label
                      htmlFor={prop.CODE}
                      className="block mb-2 text-sm text-white-600 dark:text-white-400"
                    >
                      {prop.NAME}
                    </label>
                    {renderField(
                      prop,
                      values,
                      handleChange,
                      handleBlur,
                      setFieldValue
                    )}
                  </div>
                ))}
                <div className="mb-6">
                  <button
                    type="submit"
                    className={`${styles.accountSubmitButton} text-uppercase`}
                    disabled={isSubmitting}
                  >
                    {t("submit")}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div>
          <ProfileMenu
            balance={balance}
            accountSetings={accountSetings}
            logOut={logOut}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ locale, req, res }) {
  const cookieData = parseCookies(req);
  let authPage = "/auth";
  if (locale != "en") {
    authPage =
      "/" + locale + authPage + "?backUrl=" + "/" + locale + "/profile/account";
  }

  if (res && !cookieData.userAuthToken) {
    res.writeHead(302, { Location: authPage });
    return res.end();
  } else {
    const profileBalance = await fetch("https://api.smartbolla.com/api/", {
      method: "POST",
      body: JSON.stringify({
        method: "check.auth.token",
        data: {
          authToken: cookieData.userAuthToken,
        },
      }),
      headers: {
        ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
      },
    });

    const { data: tokenData } = await profileBalance.json();
    if (!tokenData.result) {
      res.writeHead(302, { Location: authPage });
      return res.end();
    }
  }
  const resProps = await fetch("https://api.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "get.order.properties",
      data: {
        authToken: cookieData.userAuthToken,
      },
    }),
    headers: {
      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
    },
  });

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

  let { data: orderProps } = await resProps.json();
  orderProps = orderProps || [];

  return {
    props: {
      orderProps,
      mainLayoutSocial,
      userAuthToken: cookieData.userAuthToken,
      ...(await serverSideTranslations(locale, ["accountPage"])),
    },
  };
}

export default Account;
