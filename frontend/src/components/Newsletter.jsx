import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import "../index.css";




const Newsletter = () => {
  return (
    <div>
        <section className="bg-[#262629] dark:bg-gray-800 p-8 rounded-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Subscribe to the Newsletter</h2>
          <p className="mb-6 text-gray-300">
            Get the latest posts and updates delivered straight to your inbox.
          </p>
          <div className="flex flex-col max-w-md gap-2 mx-auto sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex w-full h-10 px-3 py-2 text-sm text-gray-300 bg-gray-900 border rounded-md border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Newsletter
