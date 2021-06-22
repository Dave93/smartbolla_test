import Image from "next/image";
import SwiperCore, {
  EffectCoverflow,
  Navigation,
  Lazy,
  Autoplay,
  Virtual,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import InView, { useInView } from "react-intersection-observer";
import Delayed from "../Delayed/Delayed";
import chunk from "../../helpers/chunk";
import styles from "./Slider.module.css";
import React from "react";
SwiperCore.use([EffectCoverflow, Navigation, Lazy, Autoplay, Virtual]);

function Slider({ slides, locale }) {
  const { ref, inView } = useInView();
  const resSlides = chunk(slides, 8);
  return (
    <div ref={ref}>
      {InView && (
        <Delayed>
          <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={2}
            pagination={{ clickable: true }}
            grabCursor={true}
            navigation
            autoplay={{
              delay: 3000,
            }}
          >
            {resSlides.map((item, i) => {
              const rows = chunk(item, 4);
              return (
                <SwiperSlide className="" key={i}>
                  {rows.map(
                    (
                      row,
                      rowIndex // Davay v botim, chtobi rasskazal ideyu
                    ) => (
                      <div
                        className={`md:flex ${
                          rowIndex == 0
                            ? "mb-5 xl:ml-40"
                            : "left-20 position-relative justify-center"
                        }`}
                        key={rowIndex}
                      >
                        {row.map((slide, i) => (
                          <div className="md:w-64 p-2" key={i}>
                            <Image
                              src={
                                slide.PREVIEW_PICTURE
                                  ? `${slide.PREVIEW_PICTURE}`
                                  : "/"
                              }
                              width={500}
                              height={500}
                              className="rounded-3xl"
                            />
                            <div>{slide.NAME}</div>
                            <div className="">
                              <div className="text-xs font-medium tracking-wide mt-1 font-mono">
                                {
                                  slide[
                                    `PROPERTY_POSITION_NEW_PROPERTY_${locale}_VALUE`
                                  ]
                                }
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Delayed>
      )}
    </div>
  );
}

export default Slider;
