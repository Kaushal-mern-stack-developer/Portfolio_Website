import React from 'react'
import main_image from '../assets/main_image.png'
import { BsLinkedin } from "react-icons/bs";
import { SiGithub } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { FaReact } from "react-icons/fa6";
import { FaNode } from "react-icons/fa";
import { ReactTyped, Typed } from "react-typed";
import { FaPython } from "react-icons/fa";

const Home = () => {
  return (
    <div name="Home" className='max-w-screen-2xl container mx-auto px-4 md:px-20 my-20'>
      <div className="flex flex-col md:flex-row mt-10 gap-10 md:gap-0 items-center justify-between">
        <div className="md:w-1/2 order-2 md:order-1">
          <span className="text-xl font-semibold">Welcome to My Portfolio</span>
          <div className="flex">
            <h1 className='font-bold my-4 text-lg md:text-4xl'>Hello, I'm a 
              {/* <span className="text-emerald-700 font-bold">MERN Stack Developer</span> */}
                <ReactTyped className='m-2 text-emerald-700 font-bold text-xl md:text-4xl'
                strings={[
                  "Web Developer","Full Stack Developer","MERN Stack Developer"
                ]}
                typeSpeed={40}
                backSpeed={50}
                loop={true}
              />
            </h1>
          </div>
          <p className='text-gray-600 mt-4 text-justify'>I am a Full Stack Developer with a passion for creating dynamic and responsive web applications. I specialize in React, Node.js, and MongoDB, and I am always eager to learn new technologies and improve my skills.</p>
          <br />
          <hr className='w-full opacity-25' />
          {/* Social Media Links */}
          <div className="md:flex justify-between flex-col md:flex-row space-y-6 md:space-y-0">
            <div className="md:space-y-2 flex flex-col items-center md:items-start">
              <h1 className="text-2xl font-bold text-c">Availabe on</h1>
              <ul className="flex">
                <li>
                  <a href='https://www.linkedin.com/in/kaushal-fumakiya-9116kdf/' target='_blank'>
                    <BsLinkedin className="text-2xl m-2 hover:scale-105 font-bold" />  
                  </a>
                </li>
                <li>
                  <a href='https://github.com/Kaushal-mern-stack-developer' target='_blank'>
                    <SiGithub className="text-2xl m-2 hover:scale-105 font-bold" />  
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2 flex flex-col items-center md:items-start">
              <h1 className='text-2xl font-bold'>Currently working on</h1>
              <ul className="flex">
                <li><SiMongodb className="text-2xl m-2 hover:scale-105 font-bold" /></li>
                <li><SiExpress className="text-2xl m-2 hover:scale-105 font-bold" /></li>
                <li><FaReact className="text-2xl m-2 hover:scale-105 font-bold" /></li>
                <li><FaNode className="text-2xl m-2 hover:scale-105 font-bold" /></li>
                <li><FaPython className="text-2xl m-2 hover:scale-105 font-bold" /></li>
              </ul>
            </div>
          </div>

        </div>


        <div className="md:w-1/2 order-1 md:order-2">
          <div className="image">
            <img src={main_image} alt="main_profile" className="rounded-full shadow-xl h-70 w-70 md:h-120 md:w-120 m-2 md:ml-45" />
          </div>
        </div>

      </div>
      <hr className='w-full opacity-25 mt-32'/>

    </div>
  )
}

export default Home
