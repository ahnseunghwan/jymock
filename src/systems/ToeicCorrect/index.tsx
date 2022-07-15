import Correct from "components/Correct";
import React from "react";
import { Root } from "./styled";

type Props = {
  value: "A" | "B" | "C" | "D" | null;
  onClick: (value: "A" | "B" | "C" | "D") => () => void;
};

const ToeicCorrect: React.FC<Props> = ({ value, onClick }) => {
  const toeicCorrect: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

  return (
    <Root>
      {toeicCorrect.map((item, index) => (
        <Correct
          value={item}
          isChecked={item === value}
          onClick={onClick(item)}
          key={`toeic_correct_${index}`}
        />
      ))}
    </Root>
  );
};

export default ToeicCorrect;
