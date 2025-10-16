import React from 'react'

const SignIn = () => {
  return (
    <div className="  relative h-screen w-screen flex flex-col justify-center gap-3 items-center">
   <div className=' z-50 sticky w-screen top-0 h-20 flex justify-center items-center bg-gradient-to-tl from-amber-300 via-red-800 to-pink-400 mb-200'>
    <p className='font-semibold text-white text-xl'>
      Navbar
      </p></div>
 <div className="h-screen w-screen flex justify-center items-center bg-gray-900">
  <div className="p-[2px] rounded-lg bg-gradient-to-br from-blue-500 to-pink-400 hover:from-amber-500 hover:to-red-700 transition-all duration-300 ">
    <div className="min-w-60 flex flex-col p-8 bg-black/30 rounded-lg backdrop-blur-lg text-white hover:-translate-y-2 hover:scale-135 hover:shadow-2xl transition-all ease-in-out duration-200">
      <h2 className="text-xl font-semibold mb-2">Gradient Glow Card</h2>
      <p>hello</p>
      <p>this is a content</p>
    </div>
  </div>
</div>


    </div>
  )
}

export default SignIn




// Make a two-column layout using grid or flex.

// Create a navbar with items spaced apart (justify-between).

// Build a card with padding, shadow, and rounded corners.

// Make a sticky header with a background and slight blur (backdrop-blur-sm).

   {/* <button className="backdrop-blur-md bg-white/20 px-6 py-3 rounded-xl shadow-lg text-lg font-bold text-gray-800 hover:bg-white/90 transition duration-300">
        Cool Gradient
      </button> */}