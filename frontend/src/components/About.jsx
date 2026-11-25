import React from 'react'
import { SiMongodb } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { FaReact } from "react-icons/fa6";
import { FaNode } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa6";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { FaBootstrap } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaGitAlt } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

const About = () => {
    return (
        <div name="About" className='max-w-screen-2xl container mx-auto px-4 md:px-20 my-20'>
            <h1 className='font-bold text-3xl mb-5 text-emerald-700'>About Section</h1>
            <p className='font-serif md:text-2xl text-s'>Dynamic MERN Stack Developer obsessed with solving real-world problems through javascript. Continuously exploring the latest full-stack trends to build faster, smarter web apps.</p>

            <br />
            
            <h1 className='font-bold text-3xl mb-5 text-emerald-700 mt-10'>Education & Training</h1>
            <div className="overflow-x-auto rounded-lg border border-black shadow-sm">
                
                <table className="w-full border-collapse bg-white text-right md:text-left text-xs md:text-sm text-gray-500 border table-fixed md:table-auto">
                    <thead className="bg-emerald-700 md:text-xl border-2 uppercase text-black">
                        <tr className='border-2 border-black '>
                            <th className="px-2 py-2 md:px-6 md:py-4 w-[25%] md:w-auto">Qualification</th>
                            <th className="px-2 py-2 md:px-6 md:py-4 w-[55%] md:w-auto">School/College</th>
                            <th className="px-2 py-2 md:px-6 md:py-4 w-[20%] md:w-auto">CGPA</th>
                        </tr>
                    </thead>
                    <tbody className="border-t border-black border-2 ">
                        <tr className='border-2 border-black'>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">Semester-5</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">Dharamsinh Desai University Nadiad</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">Current</td>
                        </tr>
                        <tr className='border-2 border-black'>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">Semester-4</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">Dharamsinh Desai University Nadiad</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">80.18</td>
                        </tr>
                        <tr className='border-2 border-black'>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">Semester-3</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">Dharamsinh Desai University Nadiad</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">81.73</td>
                        </tr>
                        <tr className='border-2 border-black'>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">Semester-2</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">Dharamsinh Desai University Nadiad</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">81.16</td>
                        </tr>
                        <tr className='border-2 border-black'>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">Semester-1</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">Dharamsinh Desai University Nadiad</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">78.57</td>
                        </tr>
                        <tr className='border-2 border-black'>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-word">HSC</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">St.Annes High School Nadiad</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">92.46</td>
                        </tr>
                        <tr className='border-2 border-black'>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">SSC</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">St.Annes High School Nadiad</td>
                            <td className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 wrap-break-words">82.82</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Skills */}
            <h1 name="Skills" className='font-bold text-3xl mb-5 text-emerald-700 mt-20'>Skills & Experties</h1>
            <div className='flex md:flex-row flex-col items-center'>
                <ul className="flex">
                                <li><SiMongodb className="text-3xl md:text-6xl ml-3 md:ml-10 mt-4 hover:scale-105 font-bold" /></li>
                                <li><SiExpress className="text-3xl md:text-6xl ml-3 md:ml-10 mt-4 hover:scale-105 font-bold" /></li>
                                <li><FaReact className="text-3xl md:text-6xl ml-3 md:ml-10 mt-4 hover:scale-105 font-bold" /></li>
                                <li><FaNode className="text-3xl md:text-6xl ml-3 md:ml-10 mt-4 hover:scale-105 font-bold" /></li>
                                <li><FaPython className="text-3xl md:text-6xl ml-3 md:ml-10 mt-4 hover:scale-105 font-bold" /></li>
                                <li><FaHtml5 className="text-3xl md:text-6xl ml-3 md:ml-10 mt-4 hover:scale-105 font-bold" /></li>
                                <li><FaCss3Alt className="text-3xl md:text-6xl ml-3 md:ml-10 mt-4 hover:scale-105 font-bold" /></li>
                                <li><IoLogoJavascript className="text-3xl md:text-6xl ml-3 md:ml-10 mt-4 hover:scale-105 font-bold" /></li>            
                </ul>
                <ul className="flex">
                                <li><FaBootstrap className="text-3xl md:text-6xl ml-3 md:ml-10 mt-4 hover:scale-105 font-bold" /></li>
                                <li><RiTailwindCssFill className="text-3xl md:text-6xl ml-3 md:ml-10 mt-4 hover:scale-105 font-bold" /></li>
                                <li><FaGitAlt className="text-3xl md:text-6xl ml-3 md:ml-10 mt-4 hover:scale-105 font-bold" /></li>
                                <li><FaSquareGithub className="text-3xl md:text-6xl ml-3 md:ml-10 mt-4 hover:scale-105 font-bold" /></li>           
                </ul>
            </div>

            

        </div>
    )
}

export default About
