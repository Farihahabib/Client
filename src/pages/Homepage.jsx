import React from 'react';
import MyContainer from '../Components/MyContainer';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Homepage = () => {
    const slides = [
        { id: 1, img: "https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ=", content: 'Slide 1 Content' },
        { id: 2,img:"https://media.gettyimages.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=gi&k=20&c=f-hk_ABcJZiEDNxUfAq-Tqxg0kdE01MbMWkBXhBobl0=" ,content: 'Slide 2 Content' },
        { id: 3,img:"https://t4.ftcdn.net/jpg/02/84/46/89/360_F_284468940_1bg6BwgOfjCnE3W0wkMVMVqddJgtMynE.jpg" ,content: 'Slide 3 Content'},
        {id:4,img:"https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",content:'Slide 4 Content'}
    ]
    return (
        <>
        <div>
            <title>FoodLovers Network -Home</title>

            <MyContainer>
                <div className="slider w-80% mx-auto ">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={50}
                        slidesPerView={1}
                        autoplay={{ delay: 1000 }}
                        loop={true}
                    >
                        {slides.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div className="slide-content">
                                    <img src={slide.img} alt={`Slide ${slide.id}`} className="w-full h-96 object-cover rounded-lg" />
                                    <div className="slide-text absolute bottom-5 left-5 bg-black bg-opacity-50 text-white p-3 rounded">
                                        {slide.content}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </MyContainer>
        </div>
        </>
    );
};

export default Homepage;