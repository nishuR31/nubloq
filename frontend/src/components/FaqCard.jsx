// src/components/FaqCard.jsx
import { useState } from "react";
import "../index.css";




import  {Button}  from "./ui/button"

export default function FaqCard({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`transition-all delay-3000 ease-in animate-slideInLeft p-4 mb-4 rounded-2xl shadow-md backdrop-blur-sm bg-transparent`}
    >
      <Button
      variant="ghost"
        className="w-full text-lg font-semibold text-center text-gray-800 dark:text-white "
        onClick={() => setOpen(!open)}
      >
        {question}
      </Button>
      {open && <p className="mt-2 text-sm text-gray-800 dark:text-gray-300">{answer}</p>}
    </div>
  );
}
