import FooterMobile from "./Footer.mobile";
import FooterDesktop from "./Footer.desktop";
import { deviceType, CustomView } from "react-device-detect";

export default function Footer({ commonLang, footerLang }) {
  return (
    <>
      <CustomView condition={!["browser", "tablet"].includes(deviceType)}>
        <FooterMobile commonLang={commonLang} />
      </CustomView>
      <CustomView condition={["browser", "tablet"].includes(deviceType)}>
        <FooterDesktop footerLang={footerLang} />
      </CustomView>
    </>
  );
}
