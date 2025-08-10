// src/components/FaqCard.jsx
import { useState } from "react";
import "../index.css";




import  {Button}  from "./ui/button"

export default function FaqCard({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`transition-all delay-3000 ease-in p-4 mb-4 rounded-2xl shadow-md backdrop-blur-sm bg-transparent`}
    >
      <Button
      variant="ghost"
        className="w-full text-lg font-semibold text-center text-app "
        onClick={() => setOpen(!open)}
      >
        {question}
      </Button>
      {open && <p className="mt-2 text-sm text-secondary-fg">{answer}</p>}
    </div>
  );
}
