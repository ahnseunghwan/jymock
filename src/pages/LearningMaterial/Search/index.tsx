import React from 'react';
import { Root, TitleTypo, ContentContainer } from './styled';
import testData from 'assets/json/learning_material_card.json';
import LearningMaterialCard from 'systems/LearningMaterialCard';

const LearningMaterialSearch = () => {
  return (
    <Root>
      <TitleTypo level={2}>교재 조회</TitleTypo>
      <ContentContainer>
        {testData.learning_material_card_list.map((cardData, index) => (
          <LearningMaterialCard
            {...cardData}
            key={`learning_material_${cardData.id}`}
          />
        ))}
      </ContentContainer>
    </Root>
  );
};

export default LearningMaterialSearch;
