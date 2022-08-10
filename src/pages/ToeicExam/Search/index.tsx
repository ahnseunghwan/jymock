import React, { useEffect, useState } from 'react';
import { Root, TitleTypo, ContentContainer } from './styled';
import testData from 'assets/json/learning_material_card.json';
import LearningMaterialCard from 'systems/LearningMaterialCard';
import { commonAxios } from 'api/common';

const ToeicExamSearch = () => {
  const [cardList, setCardList] = useState<any[]>([]);

  useEffect(() => {
    commonAxios({ url: 'materials/', method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setCardList(res.data);
      } else {
        alert('서버 오류');
      }
    });
  }, []);

  const onClickCard = (id: string) => () => {
    window.open(`/learning_material/viewer/?id=${id}`);
  };

  return (
    <Root>
      <TitleTypo level={2}>토익 문제 조회</TitleTypo>
      <ContentContainer>
        {cardList?.map((cardData, index) => (
          <LearningMaterialCard
            {...cardData}
            onClick={onClickCard(cardData.id)}
            key={`learning_material_${cardData.id}`}
          />
        ))}
      </ContentContainer>
    </Root>
  );
};

export default ToeicExamSearch;
