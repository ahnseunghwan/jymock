import React, { useState } from 'react';
import {
  ContentButton,
  ContentButtonTypo,
  ContentContainer,
  ContentInput,
  ContentInputColumnContainer,
  ContentInputContainer,
  Root,
  TitleTypo,
} from './styled';

type SubproblemType = {
  title: string;
  description: string;
  metadata: any;
};

const subproblemDefault = { title: '', description: '', metadata: {} };

const ProblemRegister = () => {
  const [name, setName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [subproblems, setSubproblems] = useState<SubproblemType[]>([
    subproblemDefault,
  ]);

  const onChangeSubproblemTitle = (index: number) => (e: any) => {
    setSubproblems((prev) =>
      prev.map((value, index2) =>
        index === index2 ? { ...value, title: e.target.value } : value
      )
    );
  };
  const onChangeSubproblemDescription = (index: number) => (e: any) => {
    setSubproblems((prev) =>
      prev.map((value, index2) =>
        index === index2 ? { ...value, description: e.target.value } : value
      )
    );
  };
  const onClickAddSubproblem = () => {
    setSubproblems((prev) => [...prev, subproblemDefault]);
  };
  const onClickDeleteSubproblem = (index: number) => () => {
    setSubproblems((prev) => prev.filter((value, index2) => index2 !== index));
  };

  const onSubmitProblem = () => {};

  return (
    <Root>
      <TitleTypo level={2}>문제 등록</TitleTypo>
      <ContentContainer>
        <ContentInput
          addonBefore='문제 명'
          placeholder='문제 명을 입력하세요.'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <ContentInput
          addonBefore='제목'
          placeholder='제목을 입력하세요.'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ContentInput
          addonBefore='설명'
          placeholder='설명을 입력하세요.'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {subproblems.map((subproblem, index) => {
          return (
            <ContentInputColumnContainer
              key={`content_input_container_${index}`}
            >
              <TitleTypo level={4}>문제 {index + 1}</TitleTypo>
              <ContentInput
                addonBefore='제목'
                placeholder='제목을 입력하세요.'
                value={subproblem.title}
                onChange={onChangeSubproblemTitle(index)}
              />
              <ContentInput
                addonBefore='설명'
                placeholder='설명을 입력하세요.'
                value={subproblem.description}
                onChange={onChangeSubproblemDescription(index)}
              />
              <ContentButton onClick={onClickAddSubproblem}>
                <ContentButtonTypo>소 문제 추가</ContentButtonTypo>
              </ContentButton>
              {index !== 0 && (
                <ContentButton onClick={onClickDeleteSubproblem(index)}>
                  <ContentButtonTypo>소 문제 삭제</ContentButtonTypo>
                </ContentButton>
              )}
            </ContentInputColumnContainer>
          );
        })}
        <ContentButton onClick={onSubmitProblem}>
          <ContentButtonTypo>문제 등록</ContentButtonTypo>
        </ContentButton>
      </ContentContainer>
    </Root>
  );
};

export default ProblemRegister;
