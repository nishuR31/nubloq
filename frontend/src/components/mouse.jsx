import React, { useEffect, useState } from "react";

const Mouse = ({ xcolor = "#000000", color = "#ff0000" }) => {
  const [visible, setVisible] = useState(true);


  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="28.5px"
        height="43.5px"
        viewBox="0 0 28.5 43.5"
        xmlSpace="preserve"
      >
        <g>
          <path
            fill="none"
            stroke={xcolor}
            strokeWidth="3"
            d="M14.415,41.848C7.587,41.848,2,36.261,2,29.433V14.415C2,7.587,7.587,2,14.415,2
            c6.828,0,12.415,5.587,12.415,12.415v15.019C26.829,36.261,21.243,41.848,14.415,41.848z"
          />
          <line
            x1="14.415"
            y1="12.408"
            x2="14.415"
            y2="12.408"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
          >
            <animate
              attributeName="y2"
              dur="3s"
              values="12.408;12.408;12.408;15.908;19.408;19.408;23.408;23.408;23.408;23.408;23.408"
              repeatCount="indefinite"
              begin="0s"
              fill="freeze"
            />
            <animate
              attributeName="y1"
              dur="3s"
              values="12.408;12.408;12.408;12.408;12.408;12.408;23.408;23.408;23.408;23.408;23.408"
              repeatCount="indefinite"
              begin="0s"
              fill="freeze"
            />
            <animate
              attributeName="opacity"
              dur="3s"
              values="0;1;1;1;1;1;1;1;1;0;0"
              repeatCount="indefinite"
              begin="0s"
              fill="freeze"
            />
          </line>
        </g>
      </svg>
    </div>
  );
};

export default Mouse;
