import React from "react";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
  ref: React.RefObject<HTMLButtonElement>
) {
  return (
    <button {...props} ref={ref}>
      {props.children}
    </button>
  );
}
