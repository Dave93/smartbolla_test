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

export default function TextOnVideo({ products, investLang, text }) {
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
    <div className={`md:w-96 uppercase`}>
      <div className={`${styles.textbackg}  `}>
        <div className="uppercase text-2xl mb-3">smartbolla</div>
        <div dangerouslySetInnerHTML={{__html: text}}></div>
      </div>
    </div>
  );
}
