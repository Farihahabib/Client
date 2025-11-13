import React from 'react';
import MyContainer from '../Components/MyContainer';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useLoaderData } from 'react-router';
import TopReviewcard from '../Components/TopReviewCard';

const Homepage = () => {
    const slides = [
         {id:1,img:"https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",content:'Savor gourmet perfection — fresh ingredients, creative plating, and unforgettable taste.'},
        { id: 2,img:"https://img.freepik.com/free-photo/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table_141793-3998.jpg?semt=ais_incoming&w=740&q=80" ,content: 'All your favorites — burgers, fries, pizza & more. Pure comfort food bliss!' },
        { id: 3,img:"https://t4.ftcdn.net/jpg/02/84/46/89/360_F_284468940_1bg6BwgOfjCnE3W0wkMVMVqddJgtMynE.jpg" ,content: 'Crispy, juicy, and loaded with flavor — taste the ultimate fried chicken experience!'},
        { id: 4, img: "https://img.freepik.com/free-photo/rice-noodles-bowl-curry-paste-with-chili-cucumber-long-bean-lime-garlic-spring-onion_1150-27078.jpg?semt=ais_hybrid&w=740&q=80", content: 'Bold curry paste, fresh lime & crisp veggies — this noodle bowl hits all the flavour notes' },
        { id: 5, img: "https://upload.wikimedia.org/wikipedia/commons/3/3b/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%B6_%E0%A6%AE%E0%A6%BE%E0%A6%9B_%E0%A6%AD%E0%A6%BE%E0%A6%9C%E0%A6%BE_%E0%A6%93_%E0%A6%AD%E0%A6%BE%E0%A6%A4.jpg", content: 'Crispy fried hilsa served with warm steamed rice — a true taste of Bengal.'}
    ]
 const data = useLoaderData();
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
                        <h1 className='text-[#FF4500]'>Welcome Foodies!</h1>
                        <p className="text-xl mt-4 mx-13">Discover the best food reviews and share your culinary experiences with our vibrant community. Whether you're a foodie, chef, or restaurant owner, FoodLovers Network is your go-to platform for all things food!</p>
                        </div>
                </div>
                <div className='container mx-auto'>
                    <h1 className='text-xl  font-bold text-center  my-9'>Top Reviews</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4  container mb-9">
{data.map(reviews=> <TopReviewcard key={reviews._id} reviews={reviews} /> )}
    </div>
    </div>
            </MyContainer>
        </div>
        </>
    );
};

export default Homepage;