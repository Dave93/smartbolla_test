import { useState } from "react";
import styles from "./ProductsSlider.module.css";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useTranslation } from "next-i18next";
import Link from "next/link";

function thousands_separators(num) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "");
  return num_parts.join(".");
}

export default function ProductsSlider({ products, investLang }) {
  const router = useRouter();
  const { t: translation } = useTranslation("indexPage");

  const idsByPrice = {};
  products.map((product) => {
    idsByPrice[thousands_separators(+product.PRICE)] = product;
  });

  const [currentSliderValue, setcurrentSliderValue] = useState(100);

  const currentProduct = idsByPrice[currentSliderValue];

  const [isLoadingBasket, setisLoadingBasket] = useState(false);
  const [cartItem, setCartItem] = useCookies(["cart"]);

  const addBasket = async () => {
    if (!isLoadingBasket) {
      setisLoadingBasket(true);
      setCartItem("cartItem", currentProduct.ID);
      setisLoadingBasket(false);
      router.push("/order/", undefined, {
        shallow: true,
      });
    }
  };

  return (
    <div className={`relative top-20 md:w-4/12 m-16`}>
      <div className={`${styles.textbackg}  `}>
        <div className="uppercase text-2xl mb-3">smartbolla</div>
        Non sit amet sunt tempor veniam voluptate sint est cupidatat sit nulla
        Non sit amet sunt tempor veniam voluptate sint est cupidatat sit nulla
        Non sit amet sunt tempor veniam voluptate sint est cupidatat sit nulla
        Non sit amet sunt tempor veniam voluptate sint est cupidatat sit nulla
        Non sit amet sunt tempor veniam voluptate sint est cupidatat sit nulla
        Non sit amet sunt tempor veniam voluptate sint est cupidatat sit nulla
      </div>
      <div className="col-8">
        <Link href="/about">
          <button
            className={`${styles.textbackg} col-3 ml-lg-n3 ml-md-n3 mr-3 mt-3 uppercase`}
          >
            {translation("about")}
          </button>
        </Link>
        <Link href="/tokens">
          <button className={`${styles.textbackg} col-3 mr-3 mt-3 uppercase`}>
            {translation("aboutTokens")}
          </button>
        </Link>
      </div>
      {/*<div className={styles.circle}>
          <RenderCircular />
        </div>*/}
    </div>
  );
}
