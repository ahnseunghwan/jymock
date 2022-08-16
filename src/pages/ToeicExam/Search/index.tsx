import React, { useEffect, useState } from 'react';
import {
  Root,
  TitleTypo,
  ContentContainer,
  ContentButtonTypo,
  ContentButton,
} from './styled';
import testData from 'assets/json/learning_material_card.json';
import LearningMaterialCard from 'systems/LearningMaterialCard';
import { commonAxios } from 'api/common';

const ToeicExamSearch = () => {
  const [cardList, setCardList] = useState<any[]>([]);

  useEffect(() => {
    commonAxios({ url: 'toeic-exams/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setCardList(res.data);
      } else {
        alert('서버 오류');
      }
    });
  }, []);

  const onClickCard = (id: string) => () => {
    window.open(`/toeic_exam/viewer/?id=${id}`);
  };

  return (
    <Root>
      <TitleTypo level={2}>토익 문제 조회</TitleTypo>
      <ContentContainer>
        {cardList.map((cardItem, index) => (
          <ContentButton
            onClick={onClickCard(cardItem.id)}
            key={`card_button_${cardItem.id}`}
          >
            <ContentButtonTypo>{cardItem.material_name}</ContentButtonTypo>
          </ContentButton>
        ))}
      </ContentContainer>
    </Root>
  );
};

export default ToeicExamSearch;
