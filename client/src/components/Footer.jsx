import React from 'react'
import { footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/5 pt-12'>
      <div className='flex flex-col md:flex-row justify-between gap-10'>

        {/* Logo and Description */}
        <div className='md:max-w-md'>
                         <h1 
               className='text-2xl sm:text-3xl font-bold text-primary cursor-pointer'
                  >
                 Blog App</h1>
          <p className='mt-6 text-sm text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, praesentium omnis, ipsam facere natus voluptas, rerum officiis consectetur quibusdam aliquid delectus? Culpa cum, laudantium rem atque dolor deleniti sit magni.
          </p>
        </div>

        {/* Footer Links */}
        <div className='flex flex-wrap gap-8'>
          {footer_data.map((section, index) => (
            <div key={index} className='min-w-[120px]'>
              <h3 className='font-semibold text-base text-gray-900 mb-2 md:mb-4'>{section.title}</h3>
              <ul className='text-sm space-y-1 text-gray-600'>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className='hover:underline transition'>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Footer Bottom Text */}
      <p className='py-6 text-center text-sm md:text-base text-gray-500/80 border-t mt-12'>
        © 2025 Piyush Harchandani. All rights reserved.
      </p>
    </div>
  )
}

export default Footer
