// src/components/FaqSection.jsx
import faqs from "../data/faqs.json";
import FaqCard from "../components/FaqCard";
import {Button} from "../components/ui/button"
import {Link} from "react-router-dom"
import "../index.css";



export default function FaqSection() {
  return (
    
    <section className="animate-fadeIn flex flex-col w-full p-6 py-10 mx-auto  transition-all ease-in bg-no-repeat bg-transparent text-secondary-fg bg-cover min-h-content ">
      <h2
        className="relative text-3xl font-bold my-6 text-center 
      after:content-[''] after:absolute after:-bottom-2 after:right-1/2 after:-translate-x-0 after:w-0 after:h-1 after:bg-gray-500 after:transition-all hover:after:w-[100px]
      before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:translate-x-0 before:w-0 before:h-1 before:bg-gray-500 before:transition-all hover:before:w-[100px]
      "
      >
        Frequently Asked Questions
      </h2>
      <div className="grid max-w-3xl gap-4 mx-auto">
        {faqs.map((faq, idx) => (
          <FaqCard key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>
              <div className=""><Link to="/" className=""><Button variant="ghost" className="w-full bg-muted text-secondary-fg">Home</Button></Link></div>
      
    </section>
  );
}
