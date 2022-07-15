import React from "react";
import { CheckedRoot, Root } from "./styled";

type Props = {
  isChecked: boolean;
  onClick: () => void;
  value: "A" | "B" | "C" | "D" | "1" | "2" | "3" | "4" | "5";
};

const Correct: React.FC<Props> = ({ isChecked, onClick, value }) => {
  if (isChecked) {
    return <CheckedRoot onClick={onClick} />;
  }

  return <Root onClick={onClick}>{value}</Root>;
};

export default Correct;
