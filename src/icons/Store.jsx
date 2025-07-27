const StoreIcon = ({ width, color, classList }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      fill={color}
      className={classList}
      viewBox="0 0 384 384"
    >
      <path
        fill="currentColor"
        d="M363 21v43H21V21h342zm21 214h-21v128h-43V235h-85v128H21V235H0v-43L21 85h342l21 107v43zm-192 85v-85H64v85h128z"
      />
    </svg>
  );
};

export default StoreIcon;
