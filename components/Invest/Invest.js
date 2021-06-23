import CircularSlider from "@fseehawer/react-circular-slider";
import { useState } from "react";
import CircleIcon from "../../public/img/circleDragIcon.svg";
import styles from "./Invest.module.css";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

function thousands_separators(num) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "");
  return num_parts.join(".");
}

const CircularLabel = function ({ size }) {
  return (
    <div
      className="absolute font-bold text-5xl text-center top-28 w-full"
      style={{ color: "#f6c886" }}
    >
      ${size}
    </div>
  );
};

export default function Invest({ products, investLang }) {
  const router = useRouter();

  const idsByPrice = {};
  products.map((product) => {
    idsByPrice[thousands_separators(+product.PRICE)] = product;
  });
  const sliderValues = products.map((product) =>
    thousands_separators(+product.PRICE)
  );

  const [currentSliderValue, setcurrentSliderValue] = useState(100);

  const currentProduct = idsByPrice[currentSliderValue];

  const [isLoadingBasket, setisLoadingBasket] = useState(false);
  const [cartItem, setCartItem] = useCookies(["cart"]);

  const addBasket = async () => {
    if (!isLoadingBasket) {
      setisLoadingBasket(true);
      setCartItem("cartItem", currentProduct.ID, {
        path: "/",
      });
      setisLoadingBasket(false);
      router.push("/order/", undefined, {
        shallow: true,
      });
    }
  };

  let sliderCount = sliderValues.length;
  const RenderCircular = () => {
    if (sliderCount > 0) {
      sliderCount--;
      return (
        <div>
          <RenderCircular />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className={`w-min m-auto`}>
      <CircularSlider
        label=" &nbsp;&nbsp;"
        prependToValue="$"
        labelColor="#f6c886"
        valueFontSize="4rem"
        knobColor="#f6c886"
        knobPosition="bottom"
        progressColorFrom="#f6c886"
        progressColorTo="#a15400"
        verticalOffset="1rem"
        progressSize={8}
        trackColor="#ffffff"
        trackSize={20}
        data={sliderValues} //...
        dataIndex={0}
        onChange={(value) => {
          setcurrentSliderValue(value);
        }}
        renderLabelValue={<CircularLabel size={currentSliderValue} />}
      >
        <CircleIcon x="22" y="22" width="28px" height="28px" />
      </CircularSlider>
      <button
        style={{
          backgroundColor: currentProduct ? "#f6c886" : "#a15400",
        }}
        className="flex text-3xl relative  w-full rounded-2xl justify-center uppercase shadow outline-none mt-5"
        onClick={() => {
          addBasket();
        }}
      >
        {isLoadingBasket && (
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5"
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
      {/*<div className={styles.circle}>
          <RenderCircular />
        </div>*/}
    </div>
  );
}
