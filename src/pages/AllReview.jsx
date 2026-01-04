import React, { useState } from "react";
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
    if (!search.trim()) {
      const res = await axios.get("https://server-alpha-neon.vercel.app/reviews");
      console.log(res)
      return res.data || [];
    }
    
    const res = await axios.get("https://server-alpha-neon.vercel.app/search", {
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
        <h1 className="text-xl font-bold text-center my-9">All Reviews</h1>

        <label className="input mx-9 my-5 text-center rounded-md shadow-md">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search"
            className="text-center"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-9">
          {reviews.length > 0 ? (
            reviews.map((reviews) => (
              <AllReviewcard reviews={reviews} />
            ))
          ) : (
            <p className="text-center col-span-4 text-xl font-semibold">
              No reviews found
            </p>
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
