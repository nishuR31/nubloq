import { useState, useEffect } from "react";

const TypingText = ({ header = "Stay ahead with in-depth articles, tutorials, and insights on web development, digital marketing, and tech innovations." }) => {
  const [heading, setHeading] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setHeading((prev) => {
        if (index < header.length) {
          const updated = prev + header[index];
          index++;
          return updated;
        } else {
          clearInterval(interval);
          return prev; // return unchanged string
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, [header]);

  return (
    <h2 className="text-lg md:text-xl opacity-80 mb-6 font-semibold">
      {heading}
      <span className="animate-pulse">|</span>
    </h2>
  );
};

export default TypingText;
