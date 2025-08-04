import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react'; // or use any other icon
import "../index.css";




const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed z-50 p-3 text-black transition-all bg-transparent rounded-full shadow-md bottom-6 right-6 filter-blur-md dark:text-white animate-bounce"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    )
  );
};

export default ScrollToTop;
