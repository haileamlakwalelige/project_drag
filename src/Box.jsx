/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

const Box = forwardRef(({ title, children, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    style={{
      backgroundColor: "lightblue",
      padding: "16px",
      width: "200px",
      minHeight: "400px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    }}
  >
    <h4>{title}</h4>
    {children}
  </div>
));

export default Box;
