import type { SVGProps } from "react";

const SvgMainIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22px"
    height="22px"
    fill="none"
    viewBox="0 0 21 20"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 15.063h9M9.805 1.21l-7.8 5.275c-.317.214-.505.56-.505.93v9.872c0 .946.806 1.712 1.8 1.712h14.4c.994 0 1.8-.766 1.8-1.712V7.416c0-.37-.188-.716-.505-.93l-7.8-5.275a1.25 1.25 0 0 0-1.39 0"
    />
  </svg>
);
export default SvgMainIcon;
