import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import MyContainer from "../Components/MyContainer";
import AllReviewcard from "../Components/AllReviewcard";

const AllReview = () => {
  const data = useLoaderData();
  const [review, setReview] = useState(data);
  const [search, setsearch] = useState("");

 useEffect(() => {
const searchText = search.trim()
if(!searchText){
    setReview(data)
    return
}
const timeout = setTimeout(() =>
{
 fetch(`http://localhost:3100/search?searchText=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      setReview(data);
    })
    .catch((err) => {
      console.error(err);
    })
}, 500)
return () => clearTimeout(timeout);
 },[search,data])
  
  return (
    <>
      <div className="mb-9">
        <MyContainer>
          <h1 className="text-xl  font-bold text-center mb-9 my-9">
            All Reviews
          </h1>

          <label className="input  mt-0 mx-9 my-5 text-center rounded-md  shadow-md">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input value={search} onChange={(e)=> setsearch(e.target.value)} name="search" type="search" className="text-center" required placeholder="Search" />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  container mb-9">
            {review.length >0 ?
            review.map((reviews) => (
              <AllReviewcard key={reviews._id} reviews={reviews} />
            )) :(<p className="text-center col-span-4 text-xl font-semibold">No reviews found</p>)}
          </div>
        </MyContainer>
      </div>
    </>
  );

}
export default AllReview;
