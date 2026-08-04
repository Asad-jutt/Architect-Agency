import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { SparklesIcon } from "lucide-react"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

import { Badge } from "./badge"

export interface CardCarouselProps {
  children?: React.ReactNode
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
  children,
  autoplayDelay = 3000,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 60px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 280px;
  }

  @media (min-width: 640px) {
    .swiper-slide {
      width: 340px;
    }
  }

  @media (min-width: 1024px) {
    .swiper-slide {
      width: 380px;
    }
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none !important;
  }
  .swiper-3d .swiper-slide-shadow-right {
    background: none !important;
  }

  .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.3) !important;
    opacity: 1 !important;
    transition: all 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    background: #C6FF00 !important;
    width: 24px !important;
    border-radius: 4px !important;
    box-shadow: 0 0 10px rgba(198, 255, 0, 0.5);
  }

  .swiper-button-next, .swiper-button-prev {
    color: #C6FF00 !important;
    width: 40px !important;
    height: 40px !important;
    background: transparent !important;
    border: none !important;
    border-radius: 0px !important;
    transition: all 0.2s ease;
  }

  .swiper-button-next:after, .swiper-button-prev:after {
    font-size: 16px !important;
    font-weight: bold !important;
  }

  .swiper-button-next:hover, .swiper-button-prev:hover {
    border: none !important;
    background: rgba(198, 255, 0, 0.1) !important;
    color: #C6FF00 !important;
  }
  `

  return (
    <div className="w-full relative">
      <style>{css}</style>
      <Swiper
        spaceBetween={40}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        pagination={showPagination ? { clickable: true } : false}
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index}>
            {child}
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev !hidden sm:!flex" />
        <div className="swiper-button-next !hidden sm:!flex" />
      </Swiper>
    </div>
  )
}
