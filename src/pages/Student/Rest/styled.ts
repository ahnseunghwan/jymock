import { Input, Typography } from 'antd';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;
`;

const TitleTypo = styled(Typography.Title)`
  &&& {
    color: #14449a;
  }
`;

const ContentInput = styled(Input)`
  width: 200px;
`;

export { Root, TitleTypo, ContentInput };
