import type { SVGProps } from "react";

const SvgHelpIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9.999 14.5v.04M7.75 7.23c0-1.266 1.007-2.293 2.25-2.293s2.25 1.027 2.25 2.293S11.243 9.522 10 9.522l-.001 1.529M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    />
  </svg>
);
export default SvgHelpIcon;
