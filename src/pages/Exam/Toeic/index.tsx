import React, { useState } from "react";
import { Container, Root } from "./styled";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import sample1 from "assets/pdf/sample1.pdf";

const ToeicExam = () => {
  const [loading, setLoading] = useState<"PDF_LOADING" | "LOADING" | "NONE">(
    "PDF_LOADING"
  );

  const onPdfLoadSuccess = () => {
    setLoading("NONE");
  };

  return (
    <Root>
      <Container>
        <Document file={sample1} onLoadSuccess={onPdfLoadSuccess}>
          <Page pageNumber={1} />
          <Page pageNumber={2} />
          <Page pageNumber={3} />
        </Document>
      </Container>
    </Root>
  );
};

export default ToeicExam;
