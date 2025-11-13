import { createBrowserRouter } from "react-router";
import MainLayouts from "../layout/MainLayouts";
import Homepage from "../pages/Homepage";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";


import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";
import AddReview from "../pages/AddReview";
import MyReviews from "../pages/MyReviews";
import Privateroute from "../PrivateRoute/Privateroute";
import AllReview from "../pages/AllReview";
import ReviewDetails from "../pages/MyFavourite";
import ReviewDetail from "../pages/ReviewDetail";
import MyFavourite from "../pages/MyFavourite";
import Editreview from "../pages/Editreview";
import ContactUs from "../pages/Contact";
import TermsAndConditions from "../pages/TermsConditions";


export const router = createBrowserRouter([
    {
        path : "/",
        element:
        <MainLayouts />,
        errorElement: <Error />,
        children:[
            {
                index:true,
                element:<Homepage />,
                loader:()=>fetch('http://localhost:3100/top-ratedreviews')
            },
            {
                path:"/about-us",
                element:<AboutUs />
            },
           {
            path:"/Favouritereviews",
            element:(<Privateroute>
            <MyFavourite />
            </Privateroute>
            )
           },
           {
            path:"/reviewdetails/:id",
            element:(<Privateroute>
            <ReviewDetail />
            </Privateroute>
            ),
            loader:({params})=>fetch(`http://localhost:3100/reviews/${params.id}`)
           },
            {
                path:"/login",
                element:<Login />
            },
            {
                path:"/AddReview",
                element:(<Privateroute>
                     <AddReview />
                </Privateroute>
               
            )
            },
            {
                path:"/MyReviews",
                element:
                ( <Privateroute>
                     <MyReviews />
                </Privateroute>
               )
            },
            {
                path:"/editreview/:id",
                element:
                ( <Privateroute>
                     <Editreview />
                </Privateroute>
               ),
               loader:({params})=>fetch(`http://localhost:3100/reviews/${params.id}`)
            },
            {
                path:"/AllReview",
                element:<AllReview />,
                loader:()=>fetch('http://localhost:3100/reviews')
             
            },
           
            {
                path:"/Register",
                element:<Register />
            },
            {
                path:"/contact",
                element:<ContactUs />
            },
            {
                path:"/PrivacyPolicy",
                element:<PrivacyPolicy />
            },
            {
                path:"/Terms_Conditions",
                element:<TermsAndConditions />
            },
        
         
        ]
    }
])