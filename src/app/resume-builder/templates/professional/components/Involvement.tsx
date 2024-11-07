import { HTMLRenderer } from '../../../helpers/common/components/HTMLRenderer';
import React from 'react';

export default function Involvement({ data }: { data: string }) {
  return (
    <div>
      <HTMLRenderer htmlString={data} />
    </div>
  );
}
