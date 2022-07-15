import styled from "styled-components";

const Root = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 720px;
  position: relative;
`;

const PdfContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResponseContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 120px;
  padding-left: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  overflow-y: scroll;
  padding-bottom: 40px;
`;

const ResponseTitleContainer = styled.div`
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 10px;
  position: fixed;
  top: 0;
`;

const ResponseTitleTypo = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

type ResponseDescriptionTypoProps = {
  isPoint: boolean;
};

const ResponseDescriptionTypo = styled.div<ResponseDescriptionTypoProps>`
  color: ${props => (props.isPoint ? `#f00` : `#111`)};
  font-size: 44px;
  font-weight: 700;
  margin-top: 10px;
  margin-left: 5px;
`;

export {
  Root,
  Container,
  PdfContainer,
  ResponseContainer,
  ResponseTitleContainer,
  ResponseTitleTypo,
  ResponseDescriptionTypo,
};
