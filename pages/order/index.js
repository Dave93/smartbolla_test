import { MainLayout } from "../../components/MainLayout";
import { parseCookies } from "../../helpers/";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { accountSubmitButton, isAuthLoading } from "./Profile.module.css";
import asyncForEach from "../../helpers/asyncForEach";
import readAsDataURL from "../../helpers/file_to_string";
import { useRouter } from "next/router";

function Order({
  cookieData,
  mainLayoutSocial,
  orderData,
  authToken,
  productId,
}) {
  const router = useRouter();
  const { t } = useTranslation("profilePage");
  const commonLang = {
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
  };

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

  console.log("productId", productId);

  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  const [showModal, setShowModal] = useState(false);

  return (
    <MainLayout
      commonLang={commonLang}
      footerLang={footerLang}
      title={"Make order"}
      mainLayoutSocial={mainLayoutSocial}
    >
      <div className="grid grid-cols-3 mt-4">
        <div className="col-span-2 mr-5">
          <h2>Payment Information</h2>
          <div className="pt-2 w-8/12">
            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors = {};

                if (!values.payment) {
                  errors.payment = "Payment must be chosen";
                }

                if (!values.agreement) {
                  errors.agreement = "You must agree to the agreement";
                }

                if (orderData.PROPERTIES) {
                  orderData.PROPERTIES.map((prop) => {
                    if (prop.REQUIRED == "Y" && !values[`prop_${prop.ID}`]) {
                      errors[
                        `prop_${prop.ID}`
                      ] = `Field "${prop.NAME}" must be filled`;
                    }
                  });
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await asyncForEach(orderData.PROPERTIES, async (prop) => {
                    if (prop.TYPE == "FILE" && values[`prop_${prop.ID}`]) {
                      const arrayBuffer = await readAsDataURL(
                        values[`prop_${prop.ID}`]
                      );
                      values[`prop_${prop.ID}`] = arrayBuffer.data;
                    }
                  });

                  const res = await fetch("/api/makeOrder", {
                    method: "POST",
                    body: JSON.stringify({
                      method: "post.order.data",
                      data: { ...values, authToken, productId },
                    }),
                    headers: {
                      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
                    },
                  });

                  const { data } = await res.json();

                  if (data.result) {
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
                  <label
                    className="block mb-2 text-sm text-white-600 dark:text-white-400"
                    htmlFor=""
                  >
                    Payment method
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
                            isChecked && "bg-white shadow-md"
                          }  cursor-pointer flex p-3 hover:bg-white hover:shadow-md items-center rounded-2xl`}
                        >
                          <label>
                            <Field
                              type="radio"
                              name="payment"
                              onChange={handleChange}
                              onBlur={handleBlur}
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

                  {orderData.PROPERTIES &&
                    orderData.PROPERTIES.map((prop) => {
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
                              onBlur={handleBlur}
                              defaultValue={initialValues[`prop_${prop.ID}`]}
                              autoComplete="off"
                              className="text-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                            />
                          </div>
                        );
                      }

                      if (prop.TYPE == "FILE") {
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
                              type="file"
                              name={`prop_${prop.ID}`}
                              id={prop.ID}
                              required={prop.REQUIRED == "Y"}
                              onChange={(event) => {
                                setFieldValue(
                                  `prop_${prop.ID}`,
                                  event.currentTarget.files[0]
                                );
                              }}
                              className="dark:bg-gray-700 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-900 dark:placeholder-gray-500 dark:text-white focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-100 placeholder-gray-300 px-3 py-2 rounded-md w-full"
                            />
                          </div>
                        );
                      }
                    })}
                  <div
                    className="flex items-center my-5"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <Field
                      type="checkbox"
                      name="agreement"
                      value="Y"
                      checked={isAgreementChecked}
                    />
                    <div className="cursor-pointer ml-2">
                      Нажимая на кнопку, я принимаю условия соглашения.
                    </div>
                  </div>
                  {showModal ? (
                    <>
                      <div className="justify-center text-black items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="border-b border-blueGray-200 border-solid flex items-start justify-between p-4 rounded-t">
                              <h3 className="font-semibold m-0 text-3xl">
                                Agreement
                              </h3>
                              <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                              >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
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
                                Cancel
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
                                Agree
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
                    className={accountSubmitButton}
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div>
          <h2>Order Summary</h2>
          <div className="bg-white p-10 rounded-md shadow-md sticky text-black top-20 tracking-wider uppercase">
            <ul>
              <li>
                <b>Tokens count: </b> {orderData.TOKEN_COUNT}
              </li>
              <li>
                <b>Total summary: </b> ${orderData.ORDER_PRICE}
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
      authToken: cookieData.userAuthToken,
      productId: cookieData.cartItem,
      ...(await serverSideTranslations(locale, ["profilePage"])),
    },
  };
}

export default Order;
