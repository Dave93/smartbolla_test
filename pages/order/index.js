import { MainLayout } from "../../components/MainLayout";
import { parseCookies } from "../../helpers/";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  orderSubmitButton,
  isAuthLoading,
  orderFileButton,
} from "./Order.module.css";
import asyncForEach from "../../helpers/asyncForEach";
import readAsDataURL from "../../helpers/file_to_string";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import { useCookies } from "react-cookie";
import { Checkbox } from "react-input-checkbox";
import Cookies from "js-cookie";

function Order({
  cookieData,
  mainLayoutSocial,
  orderData,
  authToken,
  productId,
}) {
  const router = useRouter();
  const { t } = useTranslation("orderPage");
  const commonLang = {
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    investors: t("investors"),
    policies: t("policies"),
  };

  const [passwordName, setPasswordFileName] = useState("");
  const [photoName, setPhotoFileName] = useState("");

  const footerLang = {
    allRightsRes: t("allRightsRes"),
    weWoldLike: t("weWoldLike"),
  };
  const initialValues = {
    agreement: false,
  };

  if (initialValues.PAYMENTS) {
    initialValues.payment = orderData.PAYMENTS[0]["ID"];
  }

  if (orderData.PROPERTIES) {
    orderData.PROPERTIES.map((prop) => {
      if (orderData.PROPERTIES_VALUE && orderData.PROPERTIES_VALUE[prop.ID]) {
        initialValues[`prop_${prop.ID}`] = orderData.PROPERTIES_VALUE[prop.ID];
      } else {
        initialValues[`prop_${prop.ID}`] = "";
      }
    });
  }

  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [userAuthToken, setUserAuthToken] = useCookies(["userAuthToken"]);
  console.log(orderData);
  return (
    <MainLayout
      commonLang={commonLang}
      footerLang={footerLang}
      title={t("title")}
      mainLayoutSocial={mainLayoutSocial}
    >
      <div className="md:flex md:justify-around">
        <div className="md:w-96">
          <h7>{t("paymentInfoTitle")}</h7>
          <div className="">
            <Formik
              initialValues={initialValues}
              validateOnChange={false}
              validateOnBlur={false}
              validate={(values) => {
                const errors = {};

                if (!values.payment) {
                  errors.payment = t("mustTypePayment");
                }

                if (orderData.PROPERTIES) {
                  orderData.PROPERTIES.map((prop) => {
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
                    if (prop.CODE == "PHOTO") {
                      prop.NAME = t("PHOTO");
                    }
                    if (prop.REQUIRED == "Y" && !values[`prop_${prop.ID}`]) {
                      errors[`prop_${prop.ID}`] = `${t("field")} "${
                        prop.NAME
                      }" ${t("mustBeFilled")}`;
                    }
                  });
                }

                if (!values.agreement) {
                  errors.agreement = t("mustAgreement");
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                console.log(orderData);
                try {
                  await asyncForEach(orderData.PROPERTIES, async (prop) => {
                    if (prop.TYPE == "FILE" && values[`prop_${prop.ID}`]) {
                      const arrayBuffer = await readAsDataURL(
                        values[`prop_${prop.ID}`]
                      );
                      values[`prop_${prop.ID}`] = arrayBuffer.data;
                    }
                  });

                  let ref = Cookies.get("ref");
                  if (ref && ref.length > 1) {
                    values["prop_10"] = ref;
                  }

                  let orderFormData = { ...values, authToken, productId };
                  const res = await fetch("/api/makeOrder", {
                    method: "POST",
                    body: JSON.stringify({
                      method: "post.order.data",
                      data: orderFormData,
                    }),
                    headers: {
                      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
                    },
                  });

                  const { data } = await res.json();

                  if (data.result) {
                    await setUserAuthToken("userAuthToken", data.authToken, {
                      path: "/",
                    });
                    return router.push("/order/" + data.result, undefined, {
                      shallow: true,
                    });
                  }

                  // setSubmitting(false);
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
              }) => (
                <Form
                  className={`${isSubmitting ? isAuthLoading : ""} relative`}
                >
                  {Object.keys(errors).length > 0 && (
                    <div className="text-red-500">
                      {Object.values(errors).map((err) => (
                        <div>{err}</div>
                      ))}
                    </div>
                  )}
                  {orderData.PROPERTIES &&
                    orderData.PROPERTIES.map((prop) => {
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
                      if (prop.CODE == "PHOTO") {
                        prop.NAME = t("PHOTO");
                      }
                      if (prop.TYPE == "STRING") {
                        return (
                          <div className="mb-6" key={prop.ID}>
                            <label
                              className="block mb-2 text-sm text-white-600 dark:text-white-400"
                              htmlFor=""
                            >
                              {prop.NAME}
                              {prop.REQUIRED == "Y" && "*"}
                            </label>
                            <input
                              type="text"
                              name={`prop_${prop.ID}`}
                              onChange={handleChange}
                              defaultValue={initialValues[`prop_${prop.ID}`]}
                              autoComplete="off"
                              className="text-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                            />
                          </div>
                        );
                      }

                      if (prop.TYPE == "FILE" && prop.CODE == "PASPORT") {
                        return (
                          <div className="mb-6" key={prop.ID}>
                            <label
                              className="block mb-2 text-sm text-white-600 dark:text-white-400"
                              htmlFor=""
                            >
                              {prop.NAME}
                              {prop.REQUIRED == "Y" && "*"}
                            </label>
                            <label
                              className={`${orderFileButton} cursor-pointer mb-4`}
                              htmlFor={prop.ID}
                            >
                              {t("downloadButtonText")}
                            </label>
                            <span className="flex justify-center p-3">
                              {passwordName}
                            </span>
                            <input
                              type="file"
                              name={`prop_${prop.ID}`}
                              id={prop.ID}
                              required={prop.REQUIRED == "Y"}
                              style={{ display: "none" }}
                              onChange={(event) => {
                                setPasswordFileName(
                                  event.currentTarget.files[0].name
                                );
                                setFieldValue(
                                  `prop_${prop.ID}`,
                                  event.currentTarget.files[0]
                                );
                                console.log(event.currentTarget.files);
                              }}
                              className="dark:bg-gray-700 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-900 dark:placeholder-gray-500 dark:text-white focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-100 placeholder-gray-300 px-3 py-2 rounded-md w-full"
                            />
                          </div>
                        );
                      }
                      if (prop.TYPE == "FILE" && prop.CODE == "PHOTO") {
                        return (
                          <div className="mb-6" key={prop.ID}>
                            <label
                              className="block mb-2 text-sm text-white-600 dark:text-white-400"
                              htmlFor=""
                            >
                              {prop.NAME}
                              {prop.REQUIRED == "Y" && "*"}
                            </label>
                            <label
                              className={`${orderFileButton} cursor-pointer mb-4`}
                              htmlFor={prop.ID}
                            >
                              {t("downloadButtonText")}
                            </label>
                            <span className="flex justify-center p-3">
                              {photoName}
                            </span>
                            <input
                              type="file"
                              name={`prop_${prop.ID}`}
                              id={prop.ID}
                              required={prop.REQUIRED == "Y"}
                              style={{ display: "none" }}
                              onChange={(event) => {
                                setPhotoFileName(
                                  event.currentTarget.files[0].name
                                );
                                setFieldValue(
                                  `prop_${prop.ID}`,
                                  event.currentTarget.files[0]
                                );
                                console.log(event.currentTarget.files);
                              }}
                              className="dark:bg-gray-700 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-900 dark:placeholder-gray-500 dark:text-white focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-100 placeholder-gray-300 px-3 py-2 rounded-md w-full"
                            />
                          </div>
                        );
                      }
                    })}
                  <label
                    className="block mb-2 text-sm text-white-600 dark:text-white-400"
                    htmlFor=""
                  >
                    {t("paymentMethodTitle")}
                  </label>
                  <div className="grid grid-cols-3 my-4">
                    {orderData.PAYMENTS.map((payment, i) => {
                      let isChecked = false;

                      if (values.payment) {
                        isChecked = values.payment == payment.ID;
                      } else if (i == 0) {
                        isChecked = true;
                      }

                      return (
                        <div
                          key={payment.ID}
                          className={`${
                            isChecked && "bg-gray-200 shadow-md"
                          }  cursor-pointer flex p-3 hover:bg-white hover:shadow-md items-center rounded-2xl`}
                        >
                          <label className="h-full">
                            <Field
                              type="radio"
                              name="payment"
                              onChange={handleChange}
                              checked={isChecked}
                              value={payment.ID}
                              className="d-none"
                            />
                            <img
                              src={payment.LOGOTIP}
                              className="cursor-pointer"
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className="flex items-center my-5"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    {/* <Field
                      type="checkbox"
                      name="agreement"
                      value="Y"
                      checked={isAgreementChecked}
                    /> */}
                    <Checkbox
                      theme="fancy-checkbox"
                      value={isAgreementChecked}
                    ></Checkbox>
                    <div className="cursor-pointer ml-2">
                      {t("agreenetInputText")}
                    </div>
                  </div>
                  {showModal ? (
                    <>
                      <div className="justify-center text-black items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto md:max-w-3xl w-full">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="border-b border-blueGray-200 border-solid flex items-start justify-between p-4 rounded-t">
                              <h3 className="font-semibold m-0 text-3xl">
                                {t("agreement")}
                              </h3>
                              <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                              >
                                <span className="bg-transparent text-black h-6 w-6 text-3xl block outline-none focus:outline-none">
                                  ×
                                </span>
                              </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <div
                                className="leading-relaxed my-4 overflow-y-scroll text-blueGray-500 text-lg"
                                dangerouslySetInnerHTML={{
                                  __html: orderData.AGREEMENT_TEXT,
                                }}
                                style={{
                                  height: "45vh",
                                }}
                              ></div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                  setShowModal(false);
                                  setIsAgreementChecked(false);
                                  setFieldValue("agreement", "");
                                }}
                              >
                                {t("cancel")}
                              </button>
                              <button
                                className="bg-emerald-500 bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                  setShowModal(false);
                                  setIsAgreementChecked(true);
                                  setFieldValue("agreement", "Y");
                                }}
                              >
                                {t("agree")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  ) : null}
                  <button
                    type="submit"
                    className={orderSubmitButton}
                    disabled={isSubmitting}
                  >
                    {t("submit")}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className={`${isMobile ? "col pb-20" : ""}`}>
          <h2>{t("summary")}</h2>
          <div className="bg-white p-10 rounded-md shadow-md sticky text-black top-20 tracking-wider uppercase">
            <ul>
              {/* <li>
                <b>{t("tokenCount")}: </b> {orderData.TOKEN_COUNT}
              </li> */}
              <li>
                <b>{t("totalSummary")}: </b> ${orderData.ORDER_PRICE}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// export async function getStaticProps({ req }) {
//   const data = parseCookies(req);

//   console.log(data);

//   return {
//     cookieData: data && data,
//   };
// }

export async function getServerSideProps({ locale, req, res }) {
  const cookieData = parseCookies(req);

  if (res && !cookieData.cartItem) {
    res.writeHead(302, { Location: "/" });
    return res.end();
  }

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

  const resOrder = await fetch("https://smartbolla.com/api/order", {
    method: "POST",
    body: JSON.stringify({
      method: "get.order.data",
      data: {
        productId: cookieData.cartItem,
        locale,
        authToken: cookieData.userAuthToken,
      },
    }),
    headers: {
      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
    },
  });

  let { data: orderData } = await resOrder.json();

  let { data: mainLayoutSocial } = await socials.json();
  return {
    props: {
      mainLayoutSocial,
      cookieData,
      orderData,
      authToken: cookieData.userAuthToken || "",
      productId: cookieData.cartItem,
      ...(await serverSideTranslations(locale, ["orderPage"])),
    },
  };
}

export default Order;
