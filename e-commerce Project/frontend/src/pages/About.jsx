import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'


const About = () => {

  
  return (
    <div>

    <div className='text-2xl text-center pt-8 border-t'>
    <Title text1={'ABOUT'} text2={'US'}/>
    </div>

    <div className='my-10 flex flex-col md:flex-row gap-16'>
    <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
    <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
    <p>At Forever, fashion is more than just clothing—it's a reflection of confidence and individuality.</p>
    <p>We design timeless pieces that blend style, comfort, and sustainability, ensuring you always feel your best.</p>
    <b className='text-gray-800'>Our Mission</b>
    <p>Our mission is to create high-quality, sustainable fashion that empowers individuals to embrace their unique style effortlessly, combining innovation, craftsmanship, and ethical responsibility in every design.</p>
    </div>
    </div>

    <div className='text-xl py-4'>
    <Title text1={'WHY'} text2={'CHOOSE US'}/>
    </div>
    <div className='flex flex-col md:flex-row text-sm mb-20 '>
    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
    <b>Quality Assurance:</b>
    <p className='text-gray-600'>We are committed to delivering premium-quality clothing that meets the highest standards. Every piece is crafted with precision, using durable fabrics for long-lasting wear. Rigorous quality checks ensure consistency, comfort, and style in every stitch.</p>
    </div>
    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
    <b>Convinence:</b>
    <p className='text-gray-600'>Shopping with us is effortless, designed for a seamless experience from browsing to checkout. Our user-friendly interface, secure payment options, and fast delivery ensure a hassle-free process. With responsive customer support and easy returns, we prioritize your satisfaction every step of the way.</p>
    </div>
    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
    <b>Exeptional Customer Service:</b>
    <p className='text-gray-600'>Your satisfaction is our priority, and we go the extra mile to ensure a seamless shopping experience. Our dedicated support team is always ready to assist with inquiries, making every interaction smooth and hassle-free. From quick resolutions to personalized assistance, we strive to exceed expectations.</p>
    </div>
    </div>
    
    <NewsletterBox />
    </div>
  )
}

export default About