import React from "react";

type ArrowProps = { visible: boolean };

const Arrow: React.FC<ArrowProps> = ({ visible }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke={visible ? "currentColor" : "transparent"}
    className="h-8 w-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={5}
      d="M19 14l-7 7m0 0l-7-7m7 7V3"
    />
  </svg>
);

export default Arrow;
