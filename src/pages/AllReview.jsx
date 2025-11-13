import React, { useState } from "react";
import { useLoaderData } from "react-router";
import MyContainer from "../Components/MyContainer";
import AllReviewcard from "../Components/AllReviewcard";

const AllReview = () => {
  const data = useLoaderData();
 const [review, setReview] = useState(data);
  const handlesearch = (e) => {
 e.preventDefault();
    const searchText = e.target.search.value;
    console.log(searchText);
    fetch(`http://localhost:3100/search?searchText=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReview(data);
      });
  };
  return (
    <>
      <div className="mb-9">
        <MyContainer>
          <h1 className="text-xl  font-bold text-center mb-9 my-9">
            All Reviews
          </h1>
          <form
            onSubmit={handlesearch}
            className="flex justify-center items-center gap-5 mb-9"
          >
            <label className="input  mt-0 mx-9 rounded-md  shadow-md">
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
              <input
                name="search"
                type="search"
                required
                placeholder="Search"
              />
            </label>
            <button type="submit" className="btn">search</button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  container mb-9">
            {review.map((reviews) => (
              <AllReviewcard key={reviews._id} reviews={reviews} />
            ))}
          </div>
        </MyContainer>
      </div>
    </>
  );
};

export default AllReview;
