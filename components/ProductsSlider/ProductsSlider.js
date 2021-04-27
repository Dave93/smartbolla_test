import ProductSliderDesktop from "./ProductsSlider.desktop";
import ProductSliderMobile from "./ProductsSlider.mobile";
import { deviceType, CustomView } from "react-device-detect";

export default function ProductsSlider({ products, investLang }) {
  return (
    <>
      <CustomView condition={!["browser", "tablet"].includes(deviceType)}>
        <ProductSliderMobile products={products} investLang={investLang} />
      </CustomView>
      <CustomView condition={["browser", "tablet"].includes(deviceType)}>
        <ProductSliderDesktop products={products} investLang={investLang} />
      </CustomView>
    </>
  );
}
