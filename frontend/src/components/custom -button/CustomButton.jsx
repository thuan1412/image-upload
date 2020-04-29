import React from "react";

import "./custom-button.styles.scss";

export default function CustomButton({ children, buttonType, }) {
  return <button className={`${buttonType}`}>
    {children}
  </button>;
}
