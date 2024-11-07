import React from 'react';
import { useTemplates } from '../../../../stores/useTemplate';
import { useZoom } from '../../../../stores/useZoom';
import ResumeController from '../atoms/ResumeController';
import { ResumeTitle } from '../atoms/ResumeTitle';

const ResumeHeader = () => {
  const { zoomIn, zoomOut, resetZoom } = useZoom.getState();
  const templateName = useTemplates((state) => state.activeTemplate.name);

  return (
    <div className="flex float-right">
      <ResumeController zoomIn={zoomIn} zoomOut={zoomOut} resetZoom={resetZoom} />
    </div>
  );
};

export default ResumeHeader;
