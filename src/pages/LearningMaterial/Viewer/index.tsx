import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import {
  PageContainer,
  PageHandlerContainer,
  PageHandlerInput,
  PageHandlerInputButton,
  PageHandlerInputButtonTypo,
  PageHandlerInputContainer,
  PageHandlerWrapper,
  PageNumTypo,
  PageNumTypoWrapper,
  Root,
} from './styled';
import sample6 from 'assets/pdf/sample6.pdf';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const LearningMaterialViewer = () => {
  const [numPages, setNumPages] = useState<number>(1);
  const [page, setPage] = useState(1);
  const [toPage, setToPage] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const handlePage = (type: 'NEXT' | 'PREVIOUS' | 'TO') => () => {
    if (type === 'NEXT') {
      if (page + 2 <= numPages) {
        setPage((prev) => prev + 2);
      }
      return;
    }
    if (type === 'PREVIOUS') {
      if (page === 1 || page === 2) {
        setPage(1);
        return;
      }
      setPage((prev) => prev - 2);
    }
    if (toPage && toPage > 0) {
      if (toPage % 2 === 1) {
        setPage(toPage);
        return;
      }
      setPage(toPage - 1);
    }
  };

  return (
    <Root>
      <Document file={sample6} onLoadSuccess={onDocumentLoadSuccess}>
        <PageContainer>
          <div style={{ border: '1px #0002 solid' }}>
            <Page pageNumber={page} />
            <PageNumTypoWrapper>
              <PageNumTypo>
                Page {page} of {numPages}
              </PageNumTypo>
            </PageNumTypoWrapper>
          </div>
          <div style={{ border: '1px #0002 solid' }}>
            <Page pageNumber={page + 1} />
            <PageNumTypoWrapper>
              <PageNumTypo>
                Page {page + 1} of {numPages}
              </PageNumTypo>
            </PageNumTypoWrapper>
          </div>
        </PageContainer>
      </Document>
      <PageHandlerContainer>
        <PageHandlerWrapper>
          <LeftOutlined onClick={handlePage('PREVIOUS')} />
          <PageHandlerInputContainer>
            <PageHandlerInput
              value={toPage}
              min={1}
              max={numPages}
              onChange={(value: any) => setToPage(value)}
            />
            <PageHandlerInputButton onClick={handlePage('TO')}>
              <PageHandlerInputButtonTypo>이동</PageHandlerInputButtonTypo>
            </PageHandlerInputButton>
          </PageHandlerInputContainer>
          <RightOutlined onClick={handlePage('NEXT')} />
        </PageHandlerWrapper>
      </PageHandlerContainer>
    </Root>
  );
};

export default LearningMaterialViewer;
