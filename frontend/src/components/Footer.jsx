import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        
        <div className=' flex max-w-screen-2xl container mx-auto px-4 md:px-20 my-4 justify-center gap-3'>
          <a href="https://www.facebook.com/profile.php?id=61560854139422" target='_blank' rel='noopener noreferrer'> <h1 className='font-bold text-4xl hover:scale-110'>{<FaFacebook />}</h1> </a>
          <a href="https://web.telegram.org/a/" target='_blank' rel='noopener noreferrer'> <h1 className='font-bold text-4xl hover:scale-110'>{<FaTelegram />}</h1> </a>
          <a href="https://www.linkedin.com/in/kaushal-fumakiya-9116kdf/" target='_blank' rel='noopener noreferrer'> <h1 className='font-bold text-4xl hover:scale-110'>{<FaLinkedinIn />}</h1> </a>
        
        </div>

        <div className='flex w-full justify-center'>
            <hr className='mb-5 md:w-xl w-sm' />
            
        </div>
        <div className='mb-20 flex justify-center flex-col items-center'>
            <p>Email:-kaushalfumakiya9@gmail.com</p>
            <p>Contact:- 9327229447</p>
        </div>

    </div>
    
    
  )
}

export default Footer
