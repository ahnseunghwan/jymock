import { message } from 'antd';
import { commonAxios } from 'api/common';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ContentButton,
  ContentButtonTypo,
  ContentContainer,
  ContentInput,
  ContentInputColumnContainer,
  ContentInputContainer,
  Root,
  TitleTypo,
  ContentInputArea,
  ContentSelect,
  ContentSelectOption,
} from './styled';

const today = new Date();

const ExamRegister = () => {
  const [title, setTitle] = useState<string>('');
  const [problemList, setProblemList] = useState<any[]>([]);
  const [selectedProblemList, setSelectedProblemList] = useState<any[]>([0]);
  const [timer, setTimer] = useState<number>(10);

  useEffect(() => {
    commonAxios({ url: 'problems/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setProblemList(res.data);
      } else {
        alert('서버 오류');
      }
    });
  }, []);

  const onChangeProblem = (index: number) => (value: any) => {
    setSelectedProblemList((prev) =>
      prev.map((value2, index2) => (index2 === index ? value : value2))
    );
  };

  const onClickAddProblem = () => {
    setSelectedProblemList((prev) => [...prev, 0]);
  };

  const onClickSubmit = () => {
    if (title === '') {
      message.error('시험 제목을 입력해주세요.');
      return;
    }
    let check = false;
    problemList.forEach((problem, index) => {
      if (problem === 0) {
        message.error(`문제 ${index + 1}을 선택해주세요.`);
      }
    });
    if (check) {
      return;
    }

    const data = {
      material_name: title,
      problem_ids: selectedProblemList,
      duration: timer,
    };

    commonAxios({ url: 'exams/upload', method: 'POST', data }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        alert('성공적으로 등록되었습니다.');
        window.location.reload();
      } else {
        alert('서버 오류');
      }
    });
  };

  return (
    <Root>
      <TitleTypo level={2}>시험 등록</TitleTypo>
      <ContentContainer>
        <ContentInput
          addonBefore='제목'
          value={title}
          placeholder='시험 제목을 입력해주세요.'
          onChange={(e) => setTitle(e.target.value)}
        />
        {selectedProblemList.map((problem, index) => (
          <ContentSelect
            placeholder='문제 선택'
            onChange={onChangeProblem(index)}
            key={`content_select_${index}`}
          >
            {problemList.map((problem, index2) => (
              <ContentSelectOption
                value={problem.id}
                key={`problem_${index}_${problem.id}`}
              >
                {problem.name}
              </ContentSelectOption>
            ))}
          </ContentSelect>
        ))}
        <ContentButton onClick={onClickAddProblem}>
          <ContentButtonTypo>문제 추가</ContentButtonTypo>
        </ContentButton>
        <ContentInput
          type='number'
          min={0}
          value={timer}
          onChange={(e: any) => setTimer(e.target.value)}
          addonBefore='타이머'
          addonAfter='분'
        />
        <ContentButton onClick={onClickSubmit}>
          <ContentButtonTypo>등록하기</ContentButtonTypo>
        </ContentButton>
      </ContentContainer>
    </Root>
  );
};

export default ExamRegister;
