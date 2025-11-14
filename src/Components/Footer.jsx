import React from 'react';
import MyLink from './MyLink';
import logo from '../assets/foodlovers.png';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import MyContainer from './MyContainer';
const Footer = () => {
    return (
       <>
       <MyContainer>
       <footer className="footer footer-horizontal footer-center bg-[#FF7F50] text-base-content rounded p-10">
 <figure>
    <img src={logo} alt="" className='w-[89px] rounded-3xl' />
    <h1 className='text-white font-semibold'> Local Foodlovers Network</h1>
 </figure>
 
 <div>
 
  <nav className="grid grid-flow-col gap-4">
      <MyLink to={"/about-us"} className="hover">About Us</MyLink>
      <MyLink to={"/Contact"} className="hover">Contact</MyLink>
      <MyLink to={"/Terms_Conditions"} className="hover">Terms & Conditions</MyLink>
      <MyLink to={"/PrivacyPolicy"} className="hover">Privacy Policy</MyLink>
  </nav>
  <nav>
<h1 className='text-white font-semibold text-xl my-3'>Connect with us</h1>
    <div className="grid grid-flow-col gap-4">

      <a>
       <FaFacebook size={40} className="fill-current" />
      </a>
      <a>
        <FaXTwitter size={40} className="fill-current" />
      </a>
     <a>
        <FaLinkedin size={40} className="fill-current" />
     </a>
      <a>
        <FaInstagram size={40} className="fill-current" />
      </a>
    </div>
  </nav>
  </div>
  <aside>
    <p className='text-white'>Copyright © {new Date().getFullYear()} - All right reserved by Local FoodLovers Network</p>
  </aside>
</footer>
   </MyContainer>
       </>
    );
};

export default Footer;