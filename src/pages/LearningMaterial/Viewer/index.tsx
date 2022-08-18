import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import {
  AudioContainer,
  PageContainer,
  PageHandlerContainer,
  PageHandlerInput,
  PageHandlerInputButton,
  PageHandlerInputButtonTypo,
  PageHandlerInputContainer,
  PageHandlerWrapper,
  PageNumTypo,
  PageNumTypoWrapper,
  PageWrapper,
  Root,
} from './styled';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { commonAxios } from 'api/common';
import AudioPlayer from 'components/AudioPlayer';

const LearningMaterialViewer = () => {
  const location = useLocation();
  const [numPages, setNumPages] = useState<number>(1);
  const [page, setPage] = useState(1);
  const [toPage, setToPage] = useState<number>(1);
  const [pdfFileUrl, setPdfFileUrl] = useState<string>('');
  const [audioList, setAudioList] = useState<
    { file: string; id: number; material: string; name: string; page: number }[]
  >([]);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const handlePage = (type: 'NEXT' | 'PREVIOUS' | 'TO') => () => {
    if (type === 'NEXT') {
      if (page + 2 <= numPages) {
        setPage((prev) => prev + 2);
        return;
      }
      return;
    }
    if (type === 'PREVIOUS') {
      if (page === 1 || page === 2) {
        setPage(1);
        return;
      }
      setPage((prev) => prev - 2);
      return;
    }
    if (toPage && toPage > 0) {
      if (toPage % 2 === 1) {
        setPage(toPage);
        return;
      }
      setPage(toPage - 1);
      return;
    }
  };

  useEffect(() => {
    const id = location.search.split('?id=')[1];
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    commonAxios({ url: `materials/${id}`, method: 'GET' }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setPdfFileUrl(res.data.file);
        setAudioList(res.data.attachments);
      } else {
        alert('오류');
      }
    });
  }, []);

  const leftAudioList = audioList.filter((item) => item.page === page);
  const rightAudioList = audioList.filter((item) => item.page === page + 1);

  return (
    <Root>
      {pdfFileUrl !== '' && (
        <Document
          file={`https://corsanywhere-kojima.herokuapp.com/${pdfFileUrl}`}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          <PageContainer>
            <PageWrapper>
              <AudioContainer>
                {leftAudioList.map((audio) => (
                  <AudioPlayer
                    src={audio.file}
                    name={audio.name}
                    key={`audio_player_${audio.id}`}
                  />
                ))}
              </AudioContainer>
              <Page pageNumber={page} />
              <PageNumTypoWrapper>
                <PageNumTypo>
                  Page {page} of {numPages}
                </PageNumTypo>
              </PageNumTypoWrapper>
            </PageWrapper>
            <PageWrapper>
              <AudioContainer>
                {rightAudioList.map((audio) => (
                  <AudioPlayer
                    src={audio.file}
                    name={audio.name}
                    key={`audio_player_${audio.id}`}
                  />
                ))}
              </AudioContainer>
              <Page pageNumber={page + 1} />
              <PageNumTypoWrapper>
                <PageNumTypo>
                  Page {page + 1} of {numPages}
                </PageNumTypo>
              </PageNumTypoWrapper>
            </PageWrapper>
          </PageContainer>
        </Document>
      )}
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
