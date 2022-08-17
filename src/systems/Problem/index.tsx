import React from 'react';
import {
  DescriptionTypo,
  Root,
  SubproblemCandidateContainer,
  SubproblemCandidateTypo,
  SubproblemContainer,
  SubproblemDescriptionTypo,
  SubproblemTitleTypo,
  SubproblemWrapper,
  TitleTypo,
} from './styled';

type MetadataType = {
  answer: string;
  candidates: { order: string; description: string }[];
};

type SubproblemsType = {
  created_at: string;
  description: string;
  title: string;
  id: number;
  metadata: MetadataType;
};

type Props = {
  no: number;
  title: string;
  description: string;
  subproblems: SubproblemsType[];
  audio_file: any;
  pdf_file: any;
};

const Problem: React.FC<Props> = ({
  audio_file,
  description,
  no,
  pdf_file,
  subproblems,
  title,
}) => {
  return (
    <Root>
      <TitleTypo level={2}>
        {no}. {title}
      </TitleTypo>
      <DescriptionTypo>{description}</DescriptionTypo>
      <SubproblemContainer>
        {subproblems.map((subproblems, index) => (
          <SubproblemWrapper key={`subproblems_${index}`}>
            <SubproblemTitleTypo>
              ({index + 1}) {subproblems.title}
            </SubproblemTitleTypo>
            <SubproblemDescriptionTypo>
              {subproblems.description}
            </SubproblemDescriptionTypo>
            <SubproblemCandidateContainer>
              {subproblems.metadata.candidates.map((candidate, index2) => (
                <SubproblemCandidateTypo
                  key={`subproblems_candidate_${index}_${index2}`}
                >
                  {index2 + 1 === 1 && `①`}
                  {index2 + 1 === 2 && `②`}
                  {index2 + 1 === 3 && `③`}
                  {index2 + 1 === 4 && `④`} {candidate.description}
                </SubproblemCandidateTypo>
              ))}
            </SubproblemCandidateContainer>
          </SubproblemWrapper>
        ))}
      </SubproblemContainer>
    </Root>
  );
};

export default Problem;
