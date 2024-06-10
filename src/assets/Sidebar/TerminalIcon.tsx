import type { SVGProps } from "react";

const SvgTerminalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22px"
    height="22px"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7.8 5.05H5.05m2.75 3.3H5.05m9.9-3.3H12.2m2.75 3.3H12.2m-4.4 3.3H5.05m2.75 3.3H5.05M1.2 4.5v11a3.3 3.3 0 0 0 3.3 3.3h11a3.3 3.3 0 0 0 3.3-3.3v-11a3.3 3.3 0 0 0-3.3-3.3h-11a3.3 3.3 0 0 0-3.3 3.3"
    />
  </svg>
);
export default SvgTerminalIcon;
