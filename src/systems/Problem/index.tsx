import AudioPlayer from 'components/AudioPlayer';
import React from 'react';
import {
  AudioContainer,
  Blank,
  DescriptionTypo,
  Inline,
  ProblemImg,
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
  image_file: any;
};

const Problem: React.FC<Props> = ({
  audio_file,
  description,
  no,
  pdf_file,
  subproblems,
  title,
  image_file,
}) => {
  return (
    <Root>
      <TitleTypo level={2}>
        {no}. {title}
      </TitleTypo>
      {audio_file && (
        <AudioContainer>
          <AudioPlayer src={audio_file} name='듣기 파일' />
        </AudioContainer>
      )}
      {image_file && <ProblemImg src={image_file} />}
      <DescriptionTypo>{description}</DescriptionTypo>
      <SubproblemContainer>
        {subproblems.map((subproblems, index) => (
          <SubproblemWrapper key={`subproblems_${index}`}>
            <SubproblemTitleTypo>
              ({index + 1}) {subproblems.title}
            </SubproblemTitleTypo>
            <SubproblemDescriptionTypo>
              {/* {subproblems.description
                .replace(/\n/g, '<br>')
                .replace('<blank>', '<div class="blank" ></div>')
                .split(' ')
                .map((value, index) => {
                  return (
                    <Inline
                      dangerouslySetInnerHTML={{ __html: `${value}&nbsp;` }}
                    ></Inline>
                  );
                })} */}

              <Inline
                dangerouslySetInnerHTML={{
                  __html: subproblems.description
                    .replace(/\n/g, '<br>')
                    .replace(
                      '<blank>',
                      '<span class="blank" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'
                    ),
                }}
              ></Inline>
            </SubproblemDescriptionTypo>
            <SubproblemCandidateContainer>
              {subproblems.metadata.candidates.map((candidate, index2) => (
                <SubproblemCandidateTypo
                  key={`subproblems_candidate_${index}_${index2}`}
                >
                  {index2 + 1 === 1 && `①`}
                  {index2 + 1 === 2 && `②`}
                  {index2 + 1 === 3 && `③`}
                  {index2 + 1 === 4 && `④`}
                  {index2 + 1 === 5 &&
                    candidate?.description !== '' &&
                    `⑤`}{' '}
                  {candidate.description}
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
