import type { SVGProps } from "react";

const SvgOrdersIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22px"
    height="22px"
    fill="none"
    viewBox="0 0 22 24"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.6 8.4v-3a3.6 3.6 0 0 0-7.2 0v3M3.728 22.2h14.545c1.285 0 2.327-1.023 2.327-2.284L19.11 7.8c0-1.262-1.043-2.284-2.328-2.284H4.928C3.642 5.516 2.6 6.538 2.6 7.8L1.4 19.916c0 1.261 1.042 2.284 2.328 2.284"
    />
  </svg>
);
export default SvgOrdersIcon;
