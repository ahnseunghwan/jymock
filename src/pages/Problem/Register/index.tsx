import { message } from 'antd';
import { commonAxios } from 'api/common';
import React, { useState } from 'react';
import {
  ContentButton,
  ContentButtonTypo,
  ContentContainer,
  ContentInput,
  ContentInputColumnContainer,
  ContentInputContainer,
  ContentSelect,
  ContentSelectOption,
  Root,
  TitleTypo,
} from './styled';

type SubproblemType = {
  title: string;
  description: string;
  metadata: any;
  answer: string;
};

const ProblemRegister = () => {
  const order1Default = { order: '1', description: '' };
  const order2Default = { order: '2', description: '' };
  const order3Default = { order: '3', description: '' };
  const order4Default = { order: '4', description: '' };
  const order5Default = { order: '5', description: '' };

  const metadataDefault = {
    problem_type: 'choice_one_from_5_candidates',
    candidates: [
      { ...order1Default },
      { ...order2Default },
      { ...order3Default },
      { ...order4Default },
      { ...order5Default },
    ],
  };

  const subproblemDefault = {
    title: '',
    description: '',
    metadata: { ...metadataDefault },
    answer: '',
  };

  const [name, setName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [subproblems, setSubproblems] = useState<SubproblemType[]>([
    { ...subproblemDefault },
  ]);
  const [pdfFile, setPdfFile] = useState<any>();
  const [audioFile, setAudioFile] = useState<any>();

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
  const onChangeSubproblemMetadataCandidate =
    (index: number, index2: number) => (e: any) => {
      let newSubproblems = [...subproblems];
      newSubproblems[index].metadata.candidates[index2 - 1].description =
        e.target.value;

      setSubproblems([...newSubproblems]);
    };

  const onChangeSubproblemAnswer = (index: number) => (value: any) => {
    const newSubproblems = [...subproblems];
    newSubproblems[index].answer = value;
    setSubproblems([...newSubproblems]);
  };

  const onClickAddSubproblem = () => {
    setSubproblems((prev) => [...prev, { ...subproblemDefault }]);
  };

  const onClickDeleteSubproblem = (index: number) => () => {
    setSubproblems((prev) => prev.filter((value, index2) => index2 !== index));
  };

  const onSubmitProblem = () => {
    if (title === '') {
      message.error('제목을 입력해주세요.');
      return;
    }
    if (name === '') {
      message.error('이름을 입력해주세요');
      return;
    }
    // if (description === '') {
    //   message.error('설명을 입력해주세요');
    //   return;
    // }
    let check = false;

    subproblems.forEach((value, index) => {
      if (value.title === '') {
        message.error(`문제 ${index + 1}의 제목을 입력해주세요`);
        check = true;
      }
      // if (value.description === '') {
      //   message.error(`문제 ${index + 1}의 설명을 입력해주세요`);
      //   check = true;
      // }
      if (value.metadata.answer === '') {
        message.error(`문제 ${index + 1}의 정답을 입력해주세요`);
        check = true;
      }
    });

    if (check) {
      return;
    }

    const newSubproblems = subproblems.map((value, index) => ({
      ...value,
      ordering: index + 1,
    }));

    const formData = new FormData();

    formData.append('name', name);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('subproblems', JSON.stringify(newSubproblems));
    if (audioFile) {
      formData.append('audio_file', audioFile);
    }
    // formData.append('pdf', pdfFile);

    commonAxios({
      url: 'problems/upload',
      method: 'POST',
      data: formData,
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        alert('완료');
        window.location.reload();
      } else {
        alert('서버 오류');
      }
    });
  };

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
              <ContentInput
                addonBefore='1번 선지'
                placeholder='1번 선지를 입력하세요.'
                value={subproblem.metadata.candidates[0].description}
                onChange={onChangeSubproblemMetadataCandidate(index, 1)}
              />
              <ContentInput
                addonBefore='2번 선지'
                placeholder='2번 선지를 입력하세요.'
                value={subproblem.metadata.candidates[1].description}
                onChange={onChangeSubproblemMetadataCandidate(index, 2)}
              />
              <ContentInput
                addonBefore='3번 선지'
                placeholder='3번 선지를 입력하세요.'
                value={subproblem.metadata.candidates[2].description}
                onChange={onChangeSubproblemMetadataCandidate(index, 3)}
              />
              <ContentInput
                addonBefore='4번 선지'
                placeholder='4번 선지를 입력하세요.'
                value={subproblem.metadata.candidates[3].description}
                onChange={onChangeSubproblemMetadataCandidate(index, 4)}
              />
              <ContentInput
                addonBefore='5번 선지'
                placeholder='5번 선지를 입력하세요. (4번 선지까지 있을 경우 공백)'
                value={subproblem.metadata.candidates[4].description}
                onChange={onChangeSubproblemMetadataCandidate(index, 5)}
              />
              <ContentSelect
                placeholder='정답 선택'
                onChange={onChangeSubproblemAnswer(index)}
              >
                {[...Array(5)].map((value, index) => (
                  <ContentSelectOption
                    value={`${index + 1}`}
                    key={`lecture_${index}`}
                  >
                    {index + 1}번
                  </ContentSelectOption>
                ))}
              </ContentSelect>
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
        <input
          type='file'
          placeholder='음성 파일을 입력해주세요.'
          accept='audio'
          onChange={(e: any) => {
            setAudioFile(e.target.files[0]);
          }}
        />
        {/* <input
          type='file'
          placeholder='pdf 파일을 입력해주세요.'
          accept='application/pdf'
          onChange={(e: any) => {
            setAudioFile(e.target.files[0]);
          }}
        /> */}
        <ContentButton onClick={onSubmitProblem}>
          <ContentButtonTypo>문제 등록</ContentButtonTypo>
        </ContentButton>
      </ContentContainer>
    </Root>
  );
};

export default ProblemRegister;
