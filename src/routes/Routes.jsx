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


export const router = createBrowserRouter([
    {
        path : "/",
        element:
        <MainLayouts />,
        children:[
            {
                index:true,
                element:<Homepage />
            },
            {
                path:"/about-us",
                element:<AboutUs />
            },
            // {
            //     path:"/profile",
            //     element: ( <Privateroute>
            //         <Profile />
            //         </Privateroute>
            //     )
            // },
            {
                path:"/login",
                element:<Login />
            },
            // {
            //     path:"/logout",
            //     element:<Logout />
            // },
            {
                path:"/Register",
                element:<Register />
            },
            {
                path:"/contact",
                element:<Contact />
            },
            {
                path:"/PrivacyPolicy",
                element:<PrivacyPolicy />
            },
            {
                path:"/Terms_Conditions",
                element:<TermsConditions />
            },
        
         
        ]
    }
])