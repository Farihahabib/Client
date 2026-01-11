import { h } from 'preact';
import MyContainer from '../Components/MyContainer';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TopReviewcard from '../Components/TopReviewCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const Homepage = () => {
    const slides = [
         {id:1,img:"https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",content:'Savor gourmet perfection — fresh ingredients, creative plating, and unforgettable taste.'},
        { id: 2,img:"https://img.freepik.com/free-photo/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table_141793-3998.jpg?semt=ais_incoming&w=740&q=80" ,content: 'All your favorites — burgers, fries, pizza & more. Pure comfort food bliss!' },
        { id: 3,img:"https://t4.ftcdn.net/jpg/02/84/46/89/360_F_284468940_1bg6BwgOfjCnE3W0wkMVMVqddJgtMynE.jpg" ,content: 'Crispy, juicy, and loaded with flavor — taste the ultimate fried chicken experience!'},
        { id: 4, img: "https://img.freepik.com/free-photo/rice-noodles-bowl-curry-paste-with-chili-cucumber-long-bean-lime-garlic-spring-onion_1150-27078.jpg?semt=ais_hybrid&w=740&q=80", content: 'Bold curry paste, fresh lime & crisp veggies — this noodle bowl hits all the flavour notes' },
        { id: 5, img: "https://upload.wikimedia.org/wikipedia/commons/3/3b/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%B6_%E0%A6%AE%E0%A6%BE%E0%A6%9B_%E0%A6%AD%E0%A6%BE%E0%A6%9C%E0%A6%BE_%E0%A6%93_%E0%A6%AD%E0%A6%BE%E0%A6%A4.jpg", content: 'Crispy fried hilsa served with warm steamed rice — a true taste of Bengal.'}
    ]
//  const data = useLoaderData();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["top-reviews"],
    queryFn: async () => {
      const res = await axios.get(
        "https://server-alpha-neon.vercel.app/top-ratedreviews"
      );
      return res.data.reviews;
    },
  })
  console.log(reviews)
    return (
        <>
        <div>
            <title>FoodLovers Network -Home</title>

            {/* Banner Section - Full Width */}
            <div className="slider w-full">
                <Swiper
                    slidesPerView={1}   
                    loop={true}         
                    speed={1400} 
                    autoplay={{
                        delay: 4000,     
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="w-full h-[400px]"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="slide-content relative">
                                <img src={slide.img} alt={`Slide ${slide.id}`} className="w-full h-[400px] object-cover" />
                                <div className="slide-text absolute bottom-6 left-6 bg-black bg-opacity-60 text-white p-4 rounded-lg font-semibold text-base max-w-sm">
                                    {slide.content}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Welcome Section */}
            <MyContainer>
                <div className="text-center my-10 px-4">
                    <h1 className='text-4xl md:text-6xl font-semibold text-[#FF4500] mb-6'>Welcome Foodies!</h1>
                    <p className="text-lg md:text-xl mt-4 max-w-4xl mx-auto leading-relaxed">
                        Discover the best food reviews and share your culinary experiences with our vibrant community. 
                        Whether you're a foodie, chef, or restaurant owner, FoodLovers Network is your go-to platform for all things food!
                    </p>
                </div>

                {/* Top Reviews Section */}
                <div className='container mx-auto'>
                    <h1 className='text-2xl md:text-3xl font-bold text-center my-12'>Top Reviews</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mb-12">
                        {reviews.map(reviews=> <TopReviewcard key={reviews._id} reviews={reviews} />)}
                    </div>
                </div>
            </MyContainer>
        </div>
        </>
    );
};

export default Homepage;