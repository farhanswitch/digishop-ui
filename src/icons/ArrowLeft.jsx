import React from "react";

function ArrowLeftIcon({ width, color, classList }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      viewBox="0 0 24 24"
      fill={color}
      className={classList}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2.5"
        d="m14 7l-5 5m0 0l5 5"
      />
    </svg>
  );
}

export default ArrowLeftIcon;
