import React from 'react';
import { Stage, Layer, Rect, Text, Line } from 'react-konva';

const CertificateCanvas = React.forwardRef(({ recipientName = 'John Doe', courseName = 'Web Development', issueDate = '2024-01-01', issuerName = 'CredVal Academy' }, ref) => {
  const STAGE_WIDTH = 794;
  const STAGE_HEIGHT = 562;

  return (
    <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT} ref={ref}>
      <Layer>
        {/* Background */}
        <Rect width={STAGE_WIDTH} height={STAGE_HEIGHT} fill="white" />

        {/* Outer decorative border */}
        <Rect
          x={20}
          y={20}
          width={STAGE_WIDTH - 40}
          height={STAGE_HEIGHT - 40}
          fill="transparent"
          stroke="#c9a84c"
          strokeWidth={6}
        />

        {/* Inner decorative border */}
        <Rect
          x={50}
          y={50}
          width={STAGE_WIDTH - 100}
          height={STAGE_HEIGHT - 100}
          fill="transparent"
          stroke="#c9a84c"
          strokeWidth={2}
        />

        {/* Certificate title */}
        <Text
          text="Certificate of Achievement"
          x={0}
          y={60}
          width={STAGE_WIDTH}
          fontSize={36}
          fontStyle="bold"
          fill="#0f172a"
          align="center"
          fontFamily="Arial"
        />

        {/* Horizontal divider line below title */}
        <Line
          points={[100, 130, STAGE_WIDTH - 100, 130]}
          stroke="#c9a84c"
          strokeWidth={2}
        />

        {/* "This is to certify that" text */}
        <Text
          text="This is to certify that"
          x={0}
          y={160}
          width={STAGE_WIDTH}
          fontSize={16}
          fill="#808080"
          align="center"
          fontFamily="Arial"
        />

        {/* Recipient name */}
        <Text
          text={recipientName}
          x={0}
          y={210}
          width={STAGE_WIDTH}
          fontSize={32}
          fontStyle="bold"
          fill="#0f172a"
          align="center"
          fontFamily="Arial"
        />

        {/* "has successfully completed" text */}
        <Text
          text="has successfully completed"
          x={0}
          y={280}
          width={STAGE_WIDTH}
          fontSize={16}
          fill="#808080"
          align="center"
          fontFamily="Arial"
        />

        {/* Course name */}
        <Text
          text={courseName}
          x={0}
          y={320}
          width={STAGE_WIDTH}
          fontSize={22}
          fontStyle="bold"
          fill="#4338ca"
          align="center"
          fontFamily="Arial"
        />

        {/* Issue date (left) */}
        <Text
          text={`Issued: ${issueDate}`}
          x={80}
          y={460}
          fontSize={14}
          fill="#0f172a"
          fontFamily="Arial"
        />

        {/* Issuer name (right) */}
        <Text
          text={`By: ${issuerName}`}
          x={STAGE_WIDTH - 300}
          y={460}
          fontSize={14}
          fill="#0f172a"
          fontFamily="Arial"
        />
      </Layer>
    </Stage>
  );
});

CertificateCanvas.displayName = 'CertificateCanvas';

export default CertificateCanvas;
