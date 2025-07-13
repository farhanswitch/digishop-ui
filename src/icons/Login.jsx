import React from "react";

const LoginIcon = ({ width, color, classList }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      viewBox="0 0 24 24"
      fill={color}
      className={classList}
    >
      <path
        fill="currentColor"
        d="M3 11h9.586l-3.5-3.5L10.5 6.086L16.414 12L10.5 17.914L9.086 16.5l3.5-3.5H3v-2Zm11 8.5h5v-15h-5v-2h7v19h-7v-2Z"
      />
    </svg>
  );
};
export default LoginIcon;
