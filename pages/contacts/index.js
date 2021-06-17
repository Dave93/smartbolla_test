import { MainLayout } from "../../components/MainLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Contact.module.css";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { Formik, Field, Form } from "formik";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const mapData = {
  center: [25.068318, 55.145064],
  zoom: 17,
  avoidFractionalZoom: false,
};

const coordinates = [[25.068318, 55.145064]];

library.add(fab, faMapMarkerAlt, faPhoneAlt, faCircle);

function Contacts({ contactAddress, social }) {
  const { t } = useTranslation("contactPage");
  const commonLang = {
    about: t("about"),
    media: t("media"),
    contact: t("contact"),
    profile: t("profile"),
    investors: t("investors"),
    projects: t("projects"),
    policies: t("policies"),
  };

  const footerLang = {
    allRightsRes: t("allRightsRes"),
    weWoldLike: t("weWoldLike"),
  };
  return (
    <MainLayout
      commonLang={commonLang}
      footerLang={footerLang}
      title={t("title")}
    >
      <div className="my-10">
        <YMaps>
          <Map width="100%" height="400px" defaultState={mapData}>
            {coordinates.map((coordinate) => (
              <Placemark key={coordinate} geometry={coordinate} />
            ))}
          </Map>
        </YMaps>
      </div>
      <div className={`md:flex`}>
        <div className={`md:w-2/4`}>
          <div className="flex p-4">
            <div className="flex">
              <FontAwesomeIcon
                size="2x"
                icon={faMapMarkerAlt}
                className="mr-3 w-5 "
              />
            </div>
            <div>{contactAddress.ADDRESS}</div>
          </div>
          <div className="flex p-4">
            <div className="flex">
              <FontAwesomeIcon
                size="2x"
                icon={faPhoneAlt}
                className="mr-3 w-5"
              />
            </div>
            <div
              className={styles.phoneLink}
              dangerouslySetInnerHTML={{ __html: contactAddress.PHONE }}
            />
          </div>
          <div className="p-4">
            {social.SOC_ICONS.map((item) => (
              <span
                key={item.LINK}
                className="nav-item social-icons text-white"
              >
                <span className={styles.faStack}>
                  <a target="_blank" href={item.LINK}>
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={styles.faStack2x}
                    />
                    <FontAwesomeIcon
                      size="xs"
                      icon={["fab", item.ICON]}
                      className={`${styles.faStack1x} `}
                    />
                  </a>
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className={`md:w-2/4`}>
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = t("emailError");
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = t("emailInvalid");
              }

              if (!values.name) {
                errors.name = t("nameError");
              }
              if (!values.message) {
                errors.message = t("messageError");
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const res = await fetch("https://api.smartbolla.com/api/", {
                  method: "POST",
                  body: JSON.stringify({
                    method: "submit.contact.feedback",
                    data: values,
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
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} className="pb-20">
                <div className="text-red-500">
                  {errors.name && touched.name && errors.name}
                </div>
                <div className="text-red-500">
                  {errors.email && touched.email && errors.email}
                </div>
                <div className="text-red-500">
                  {errors.message && touched.message && errors.message}
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder={t("namePlaceholder")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={`${styles.formControlInput} mb-3`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`${styles.formControlInput} mb-3`}
                />
                <textarea
                  name="message"
                  placeholder={t("messagaPlaceholder")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  className={`${styles.formControlTextarea} mb-3`}
                />
                <button
                  type="submit"
                  className={`${styles.formControlSubmitButton} text-uppercase`}
                  disabled={isSubmitting}
                >
                  {t("submitButton")}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ locale }) {
  const res = await fetch("https://api.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "get.contact.address",
      data: {
        locale: locale,
      },
    }),
    headers: {
      ApiToken: "e7r8uGk5KcwrzT6CanBqRbPVag8ILXFC",
    },
  });
  let { data: contactAddress } = await res.json();

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
  let { data: social } = await socials.json();

  return {
    props: {
      contactAddress,
      social,
      ...(await serverSideTranslations(locale, ["contactPage"])),
    },
  };
}

export default Contacts;
