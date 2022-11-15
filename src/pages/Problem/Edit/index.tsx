import { message, Typography } from 'antd';
import { commonAxios } from 'api/common';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
};

const ProblemEdit = () => {
  const location = useLocation();
  const problemId = location.search.split('?id=')[1];
  const order1Default = { order: '1', description: '' };
  const order2Default = { order: '2', description: '' };
  const order3Default = { order: '3', description: '' };
  const order4Default = { order: '4', description: '' };
  const order5Default = { order: '5', description: '' };

  const metadataDefaut = {
    problem_type: 'choice_one_from_5_candidates',
    candidates: [
      { ...order1Default },
      { ...order2Default },
      { ...order3Default },
      { ...order4Default },
      { ...order5Default },
    ],
    answer: '',
  };

  const subproblemDefault = {
    title: '',
    description: '',
    metadata: { ...metadataDefaut },
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
    newSubproblems[index].metadata.answer = value;
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
    // formData.append('audio', audioFile);
    // formData.append('pdf', pdfFile);

    commonAxios({
      url: `problems/${problemId}/update`,
      method: 'PATCH',
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

  useEffect(() => {
    commonAxios({
      url: `problems/${problemId}`,
      method: 'GET',
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        const data = res.data;
        setName(data.name);
        setTitle(data.title);
        setDescription(data.description);
        setSubproblems(data.subproblems);
      } else {
        alert('서버 오류');
      }
    });
  }, []);

  return (
    <Root>
      <TitleTypo level={2}>문제 수정</TitleTypo>
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
        <ContentInput.TextArea
          style={{ width: '600px' }}
          rows={4}
          cols={20}
          autoSize={false}
          placeholder='설명을 입력하세요. (빈칸 -> <blank>, 빈칸 텍스트 -> <blank_text>내용</blank_text>, 밑줄 -> <u>내용</u> )'
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
              <ContentInput.TextArea
                placeholder='설명을 입력하세요.'
                style={{ width: '600px' }}
                rows={4}
                cols={20}
                autoSize={false}
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
                value={subproblem.metadata.candidates[4]?.description}
                onChange={onChangeSubproblemMetadataCandidate(index, 5)}
              />
              {/* <ContentSelect
                placeholder='정답 선택'
                onChange={onChangeSubproblemAnswer(index)}
                value={subproblem.metadata.answer}
              >
                {[...Array(4)].map((value, index) => (
                  <ContentSelectOption
                    value={`${index + 1}`}
                    key={`lecture_${index}`}
                  >
                    {index + 1}번
                  </ContentSelectOption>
                ))}
              </ContentSelect> */}
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
        <Typography>음성 파일은 수정할 수 없습니다.</Typography>
        <ContentButton onClick={onSubmitProblem}>
          <ContentButtonTypo>문제 수정</ContentButtonTypo>
        </ContentButton>
      </ContentContainer>
    </Root>
  );
};

export default ProblemEdit;
