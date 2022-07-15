import React from "react";
import { CheckedRoot, Root } from "./styled";

type Props = {
  isChecked: boolean;
  onClick: () => void;
  value: string;
};

const Correct: React.FC<Props> = ({ isChecked, onClick, value }) => {
  if (isChecked) {
    return <CheckedRoot onClick={onClick} />;
  }

  return <Root onClick={onClick}>{value}</Root>;
};

export default Correct;
