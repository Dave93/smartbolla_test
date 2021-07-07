import { MainLayout } from "../../components/MainLayout";
import { parseCookies } from "../../helpers/";
import React, { useRef, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const setInnerHTML = (elm, html) => {
  elm.innerHTML = html;
  Array.from(elm.querySelectorAll("script")).forEach((oldScript) => {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes).forEach((attr) =>
      newScript.setAttribute(attr.name, attr.value)
    );
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
};

function OrderPayment({ mainLayoutSocial, orderData, authToken }) {
  const { t } = useTranslation("profilePage");
  const paymentRef = useRef(null);
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

  // useEffect(() => {
  //   setInnerHTML(paymentRef.current, orderData.PAY_SYSTEM.BUFFERED_OUTPUT);
  //   return () => {};
  // }, [orderData.PAY_SYSTEM]);

  const token = Buffer.from(
    JSON.stringify({
      t: authToken,
    })
  ).toString("base64");

  return (
    <MainLayout
      commonLang={commonLang}
      footerLang={footerLang}
      title={"Order Detail"}
      mainLayoutSocial={mainLayoutSocial}
    >
      <div>
        {orderData.ORDER && (
          <>
            <iframe
              className="h-80 w-10/12"
              src={`https://api.smartbolla.com/order/?ORDER_ID=${orderData.ORDER.ID}&kalit=${token}`}
            ></iframe>
          </>
        )}
        {/* {!orderData.ORDER && <h3>Order is not found</h3>} */}
        <style jsx global>{`
          #cardVue button {
            display: inline-block;
            width: 100%;
            height: 3.125rem;
            border: 1px solid #f6c886;
            border-radius: 0.375rem;
            background-color: #f6c886;
            color: #0d0f13;
            font: 600 1.5rem/0 "Open Sans", sans-serif;
            cursor: pointer;
            transition: all 0.2s;
            border-radius: 0.3rem;
          }

          #cardVue button:hover {
            border: 1px solid #f6c886;
            background-color: transparent;
            color: #f6c886;
          }
        `}</style>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ locale, req, query }) {
  const cookieData = parseCookies(req);
  const { id } = query;

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

  const resOrder = await fetch("https://api.smartbolla.com/api/", {
    method: "POST",
    body: JSON.stringify({
      method: "get.existing.order.data",
      data: {
        locale,
        authToken: cookieData.userAuthToken,
        id,
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
      orderData: orderData.data,
      authToken: cookieData.userAuthToken,
      productId: cookieData.cartItem,
      ...(await serverSideTranslations(locale, ["profilePage"])),
    },
  };
}

export default OrderPayment;
