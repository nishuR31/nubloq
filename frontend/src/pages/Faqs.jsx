// src/components/FaqSection.jsx
import faqs from "../data/faqs.json";
import FaqCard from "../components/FaqCard";
import {Button} from "../components/ui/button"
import {Link} from "react-router-dom"

export default function FaqSection() {
  return (
    
    <section className="flex flex-col animate-slideInLeft py-10 transition-all delay-3000 ease-in bg-cover  bg-no-repeat dark:bg-left dark:bg-cover min-h-content bg-wave dark:bg-blackWave w-full mx-auto p-6 text-gray-800 dark:text-gray-200">
      <h2
        className="relative text-3xl font-bold my-6 text-center 
      after:content-[''] after:absolute after:-bottom-2 after:right-1/2 after:-translate-x-0 after:w-0 after:h-1 after:bg-gray-500 after:transition-all hover:after:w-[100px]
      before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:translate-x-0 before:w-0 before:h-1 before:bg-gray-500 before:transition-all hover:before:w-[100px]
      "
      >
        Frequently Asked Questions
      </h2>
      <div className="grid gap-4 max-w-3xl mx-auto">
        {faqs.map((faq, idx) => (
          <FaqCard key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>
              <div className=""><Link to="/" className=""><Button variant="ghost" className="w-full">Home</Button></Link></div>
      
    </section>
  );
}
