import { MainLayout } from "../../../components/MainLayout";
import ProfileMenu from "../../../components/ProfileMenu/ProfileMenu";
import styles from "../Profile.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { parseCookies } from "../../../helpers/";
import { isMobile } from "react-device-detect";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Link from "next/link";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function Profile({ mainLayoutSocial, balance }) {
  const { t } = useTranslation("profilePage");
  const profileBalance = t("balance");
  const accountSetings = t("accountSetings");
  const logOut = t("logOut");
  const referalsLabel = t("referalsLabel");

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

  return (
    <MainLayout
      commonLang={commonLang}
      title={t("profile")}
      mainLayoutSocial={mainLayoutSocial}
      footerLang={footerLang}
    >
      <div className="md:flex justify-around items-center">
        <div className="">
          <div>
            <div className="py-5 font-bold text-4xl">{t("referalsLabel")}</div>
            <Table
              className={`${
                isMobile
                  ? styles.profileTable
                  : `${styles.profileTable} "table-fixed border-collapse w-full"`
              }`}
            >
              <Thead>
                <Tr>
                  <Th className="text-uppercase w-1/6">{t("date")}</Th>
                  <Th className="text-uppercase w-1/12">{t("NAME")}</Th>
                  <Th className="text-uppercase w-1/6">{t("price")}</Th>
                  <Th className="text-uppercase w-1/6">{t("status")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {balance.ORDERS &&
                  balance.ORDERS.map((order) => (
                    <Tr>
                      <Td>{order.DATE_INSERT}</Td>
                      <Td>{order.PROPERTIES.NAME.VALUE}</Td>
                      <Td>${+order.PRICE}</Td>
                      <Td>
                        {order.PAYED == "Y" ? (
                          <div className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {t("paid")}
                          </div>
                        ) : (
                          <div className="bg-red-400 font-semibold inline-flex leading-5 px-2 rounded-full text-red-900 text-xs">
                            {t("unpaid")}
                          </div>
                        )}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </div>
        </div>

        <div>
          <ProfileMenu
            balance={profileBalance}
            accountSetings={accountSetings}
            logOut={logOut}
            referalsLabel={referalsLabel}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ locale, req, res }) {
  const cookieData = parseCookies(req);
  let authPage = "/auth?backUrl=/profile";

  if (locale != "ru") {
    authPage =
      "/" + locale + authPage + "?backUrl=" + "/" + locale + "/profile";
  }

  if (res && !cookieData.userAuthToken) {
    return {
      redirect: {
        destination: authPage,
        permanent: false,
      },
    };
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
      return {
        redirect: {
          destination: authPage,
          permanent: false,
        },
      };
    }
  }

  const profileBalance = await fetch("https://api.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "get.profile.referrals",
      data: {
        authToken: cookieData.userAuthToken,
        locale: locale,
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

  let { data: balance } = await profileBalance.json();
  let { data: mainLayoutSocial } = await socials.json();

  return {
    props: {
      balance,
      mainLayoutSocial,
      cookieData,
      ...(await serverSideTranslations(locale, ["profilePage"])),
    },
  };
}

export default Profile;