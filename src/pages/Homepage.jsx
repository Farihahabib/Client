import React from 'react';
import MyContainer from '../Components/MyContainer';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useLoaderData } from 'react-router';

const Homepage = () => {
    const slides = [
        { id: 1, img: "https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ=", content: 'Enjoy cozy brunch moments with family and friends — freshly brewed coffee, pancakes, and laughter!' },
        { id: 2,img:"https://media.gettyimages.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=gi&k=20&c=f-hk_ABcJZiEDNxUfAq-Tqxg0kdE01MbMWkBXhBobl0=" ,content: 'Dive into a burst of spices and colors — the perfect feast for every spice lover' },
        { id: 3,img:"https://t4.ftcdn.net/jpg/02/84/46/89/360_F_284468940_1bg6BwgOfjCnE3W0wkMVMVqddJgtMynE.jpg" ,content: 'Crispy, juicy, and loaded with flavor — taste the ultimate fried chicken experience!'},
        {id:4,img:"https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",content:'Savor gourmet perfection — fresh ingredients, creative plating, and unforgettable taste.'}
    ]
    const data = useLoaderData();
    console.log(data);
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
                        Autoplay={{ delay: 1000 }}
                        loop={true}
                    >
                        {slides.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div className="slide-content">
                                    <img src={slide.img} alt={`Slide ${slide.id}`} className="w-full h-96 object-cover rounded-lg" />
                                    <div className="slide-text absolute bottom-5 left-5  bg-opacity-50 text-white p-3 font-semibold">
                                        {slide.content}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                     <div className="text-center my-6 text-6xl font-semibold">
                        <h1>Welcome Foodies!</h1>
                        <p className="text-xl mt-4 mx-13">Discover the best food reviews and share your culinary experiences with our vibrant community. Whether you're a foodie, chef, or restaurant owner, FoodLovers Network is your go-to platform for all things food!</p>
                        </div>
                </div>
            </MyContainer>
        </div>
        </>
    );
};

export default Homepage;