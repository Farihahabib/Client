import { useState } from "react";
import MyContainer from "../Components/MyContainer";
import AllReviewcard from "../Components/AllReviewcard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AllReview = () => {
  const [search, setSearch] = useState("");
  const { data: reviews = [], isLoading, error } = useQuery({
    queryKey: ["allreviews", search],
  queryFn: async () => {
  try {
    const baseURL =  "https://server-alpha-neon.vercel.app";
    
    if (!search.trim()) {
      const res = await axios.get(`${baseURL}/reviews`);
      console.log(res)
      return res.data || [];
    }
    
    const res = await axios.get(`${baseURL}/search`, {
      params: { searchText: search.trim() },
    });
    
    console.log('Search response:', res.data);
    
    return res.data.reviews || res.data.results || res.data || [];
    
  } catch (error) {
    console.error('Query error:', error);
    return [];
  }
},
  });
console.log(reviews)
  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-10">Something went wrong</p>;
  }

  return (
    <div className="mb-9">
      <MyContainer>
        <h1 className="text-3xl font-bold text-center my-9 text-gray-800 dark:text-white">All Reviews</h1>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search reviews by food name..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:ring-2 focus:ring-[#FF4500] focus:border-[#FF4500] 
                         transition-colors duration-200 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-9">
          {reviews.length > 0 ? (
            reviews.map((reviews, index) => (
              <AllReviewcard key={reviews._id || index} reviews={reviews} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No reviews found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {search ? `No reviews match "${search}"` : "No reviews available at the moment"}
              </p>
            </div>
          )}
        </div>
      </MyContainer>
    </div>
  );
};

export default AllReview;



















// import React, { useEffect, useState } from "react";
// import { useLoaderData } from "react-router";
// import MyContainer from "../Components/MyContainer";
// import AllReviewcard from "../Components/AllReviewcard";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";

// const AllReview = () => {
//   // const data = useLoaderData();
//   const [review, setReview] = useState(data);
//   const [search, setsearch] = useState("");
//   const { data: reviews = [], isLoading } = useQuery({
//     queryKey: ["allreviews"],
//     queryFn: async () => {
//       const res = await axios.get(
//         "http://localhost:3000/reviews"
//       );
//       return res.data.reviews;
//     },
//   })
//  useEffect(() => {
// const searchText = search.trim()
// if(!searchText){
//     setReview(data)
//     return
// }
//   const timeout = setTimeout(async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:3000/search`,
//         { params: { searchText } }
//       );
//       setReview(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }, 500);
// return () => clearTimeout(timeout);
//  },[search,data])
  
//   return (
//     <>
//       <div className="mb-9">
//         <MyContainer>
//           <h1 className="text-xl  font-bold text-center mb-9 my-9">
//             All Reviews
//           </h1>

//           <label className="input  mt-0 mx-9 my-5 text-center rounded-md  shadow-md">
//             <svg
//               className="h-[1em] opacity-50"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//             >
//               <g
//                 strokeLinejoin="round"
//                 strokeLinecap="round"
//                 strokeWidth="2.5"
//                 fill="none"
//                 stroke="currentColor"
//               >
//                 <circle cx="11" cy="11" r="8"></circle>
//                 <path d="m21 21-4.3-4.3"></path>
//               </g>
//             </svg>
//             <input value={search} onChange={(e)=> setsearch(e.target.value)} name="search" type="search" className="text-center" required placeholder="Search" />
//           </label>

//           <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3  container mb-9">
//             {review.length >0 ?
//             review.map((reviews) => (
//               <AllReviewcard key={reviews._id} reviews={reviews} />
//             )) :(<p className="text-center col-span-4 text-xl font-semibold">No reviews found</p>)}
//           </div>
//         </MyContainer>
//       </div>
//     </>
//   );

// }
// export default AllReview;
