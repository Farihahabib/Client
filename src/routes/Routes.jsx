import { createBrowserRouter, Navigate } from "react-router";
import MainLayouts from "../layout/MainLayouts";
import Homepage from "../pages/Homepage";
import AboutUs from "../pages/AboutUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import AddReview from "../pages/AddReview";
import MyReviews from "../pages/MyReviews";
import Privateroute from "../PrivateRoute/Privateroute";
import AdminRoute from "../PrivateRoute/AdminRoute";
import ModeratorRoute from "../PrivateRoute/ModeratorRoute";
import AllReview from "../pages/AllReview";
import Error from "../pages/Error";
import ReviewDetail from "../pages/ReviewDetail";
import FavoriteDetail from "../pages/FavoriteDetail";
import MyFavourite from "../pages/MyFavourite";
import Editreview from "../pages/Editreview";
import ContactUs from "../pages/Contact";
import TermsAndConditions from "../pages/TermsConditions";
import DashboardLayout from "../layout/DashboardLayout";
import Profile from "../pages/Profile";

// Dashboard Pages
import UserDashboard from "../pages/Dashboard/User/UserDashboard";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Analytics from "../pages/Dashboard/Admin/Analytics";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";
import ApplyBusiness from "../pages/ApplyBusiness";




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
            element: <ReviewDetail />
           },
           {
            path:"/favoritedetails/:id",
            element: (
              <Privateroute>
                <FavoriteDetail />
              </Privateroute>
            )
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
                element:<AllReview />,    
           
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
                path:"/apply-business",
                element:(
                    <Privateroute>
                        <ApplyBusiness />
                    </Privateroute>
                )
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
                path:"/MyFavourite",
                element:(
                    <Privateroute>
                        <MyFavourite />
                    </Privateroute>
                )
            },
            {
                path:"/Favouritereviews",
                element: <Navigate to="/MyFavourite" replace />
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
        index: true,
        element: (
          <Privateroute>
            <UserDashboard />
          </Privateroute>
        ),
      },
      {
        path: 'profile',
        element: (
          <Privateroute>
            <Profile />
          </Privateroute>
        ),
      },
      // Admin Routes
      {
        path: 'manage-users',
        element: (
          <Privateroute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </Privateroute>
        ),
      },
      {
        path: 'analytics',
        element: (
          <Privateroute>
            <AdminRoute>
              <Analytics />
            </AdminRoute>
          </Privateroute>
        ),
      },
      // Moderator Routes
      {
        path: 'manage-all-reviews',
        element: (
          <Privateroute>
            <ModeratorRoute>
              <AllReviews />
            </ModeratorRoute>
          </Privateroute>
        ),
      },
    ],
  },
])