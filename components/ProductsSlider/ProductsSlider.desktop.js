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

export default function ProductsSliderDesktop({ products, investLang }) {
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
    <div className={`flex flex-col m-auto relative top-20`}>
      <div className={`${styles.textbackg} col-4 p-4 `}>
        <div className="uppercase text-2xl mb-3">smartbolla</div>
        Non sit amet sunt tempor veniam voluptate sint est cupidatat sit nulla
        Non sit amet sunt tempor veniam voluptate sint est cupidatat sit nulla
        Non sit amet sunt tempor veniam voluptate sint est cupidatat sit nulla
        Non sit amet sunt tempor veniam voluptate sint est cupidatat sit nulla
        Non sit amet sunt tempor veniam voluptate sint est cupidatat sit nulla
        Non sit amet sunt tempor veniam voluptate sint est cupidatat sit nulla
      </div>
      <button
        className="btn-danger btn-lg col-4 mt-3 uppercase"
        onClick={() => {
          addBasket();
        }}
      >
        {isLoadingBasket && (
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoadingBasket && investLang}
      </button>
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
