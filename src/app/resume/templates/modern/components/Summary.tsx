import { SectionHeading } from '../atoms/SectionHeading';
import { SectionText } from '../atoms/SectionText';
import { HTMLRenderer } from '../../../helpers/common/components/HTMLRenderer';
import React from 'react';

export const SummarySection = ({ summary }: { summary: string }) => {
  return (
    <div className="mb-3">
      <SectionHeading title="Summary" />
      <SectionText>
        <HTMLRenderer htmlString={summary} />
      </SectionText>
    </div>
  );
};
