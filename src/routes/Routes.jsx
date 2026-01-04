import { createBrowserRouter } from "react-router";
import MainLayouts from "../layout/MainLayouts";
import Homepage from "../pages/Homepage";
import AboutUs from "../pages/AboutUs";



import Login from "../pages/Login";
import Register from "../pages/Register";

import PrivacyPolicy from "../pages/PrivacyPolicy";

import AddReview from "../pages/AddReview";
import MyReviews from "../pages/MyReviews";
import Privateroute from "../PrivateRoute/Privateroute";
import AllReview from "../pages/AllReview";
import Error from "../pages/Error";
import ReviewDetail from "../pages/ReviewDetail";
import MyFavourite from "../pages/MyFavourite";
import Editreview from "../pages/Editreview";
import ContactUs from "../pages/Contact";
import TermsAndConditions from "../pages/TermsConditions";
import DashboardLayout from "../layout/DashboardLayout";
import Profile from "../pages/Profile";




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
              
            },
            {
                path:"/about-us",
                element:<AboutUs />
            },
   
           {
            path:"/reviewdetails/:id",
            element:
            <ReviewDetail />,
            loader:({params})=>fetch(`https://server-alpha-neon.vercel.app/reviews/${params.id}`)
           },
          
            {
                path:"/AddReview",
                element:(<Privateroute>
                     <AddReview />
                </Privateroute>
               
            )
            },
         
          
            {
                path:"/AllReview",
                element:<AllReview />,     // loader:()=>fetch('http://localhost:3000/reviews')
           
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
               {
                path:"/AddReview",
                element:(<Privateroute>
                     <AddReview />
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
               loader:({params})=>fetch(`https://server-alpha-neon.vercel.app/reviews/${params.id}`)
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
            path:"/Favouritereviews",
            element:(<Privateroute>
            <MyFavourite />
            </Privateroute>
            )
           },
        
         
        ]
    }
    ,
      {  path:"/login", element:<Login /> },
     { path:"/Register",element:<Register />},
           {
    path: '/dashboard',
    element: (
      <Privateroute>
        <DashboardLayout />
      </Privateroute>
    ),
    children: [
       {
        path: 'profile',
        element: (
          <Privateroute>
            <Profile />
          </Privateroute>
        ),
      },
   
    //   {
    //     path: 'manage-scholarship',
    //     element: (
    //       <PrivateRoute>
    //         <AdminRoute>  
    //            <ManageScholarships />
    //            </AdminRoute>
         
    //       </PrivateRoute>
    //     ),
    //   },
//             {
//   path: 'updatescholarship/:id',
//   element: (
//     <Privateroute>
//       <AdminRoute>
//          <UpdateScholarship />
//          </AdminRoute>
  
//     </Privateroute>
//   ),
// },

    //   {
    //     path: 'manage-users',
    //     element: (
    //       <PrivateRoute>
    //         <AdminRoute>
    //            <ManageUsers />
    //            </AdminRoute>
           
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: 'analytics',
    //     element: (
    //       <PrivateRoute>
    //         <AdminRoute> 
    //            <Analytics />
    //         </AdminRoute>
          
    //       </PrivateRoute>
    //     ),
    //   },
  
    //   {
    //     path: 'my-applications',
    //     element: (
    //       <PrivateRoute>
    //         <MyApplications />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: 'manage-applications',
    //     element: (
    //     <PrivateRoute>
    //       <ModeratorRoute>
    //         <ManageApplys />
    //         </ModeratorRoute>
    //     </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: 'all-reviews',
    //     element:  (  <PrivateRoute>
    //       <ModeratorRoute>
    //         <AllReviews />
    //         </ModeratorRoute>
    //     </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: 'my-reviews',
    //     element:(
    //     <PrivateRoute> 
    //       <MyReviews />
    //       </PrivateRoute>
    //    )
    //     ,
    //   },

  
    ],
  },
])