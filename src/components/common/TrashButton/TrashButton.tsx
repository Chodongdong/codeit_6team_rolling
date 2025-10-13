// src/components/common/TrashButton/TrashButton.tsx
import React, { type ComponentPropsWithoutRef } from "react";
import trashIcon from "../../../assets/icons/trash.jpg";
import "./TrashButton.css";

interface TrashButtonProps extends ComponentPropsWithoutRef<"button"> {}

const TrashButton: React.FC<TrashButtonProps> = ({ className = "", ...props }) => {
  return (
    <button
      className={["trash-button", className].filter(Boolean).join(" ")}
      {...props}
    >
      <img src={trashIcon} alt="trash" className="trash-icon" />
    </button>
  );
};

export default TrashButton;
