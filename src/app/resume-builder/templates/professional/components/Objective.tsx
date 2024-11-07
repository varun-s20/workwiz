import { HTMLRenderer } from '../../../helpers/common/components/HTMLRenderer';
import React from 'react';

export const Objective = ({ objective }: { objective: string }) => {
  return <HTMLRenderer htmlString={objective} />;
};
