import styled from '@emotion/styled';
import React from "react";

const SubTitle = styled.p`
  color: purple;
`;

export const SectionSubtitle = ({ label }: { label: string }) => {
  return <SubTitle className="text-base font-normal">{label}</SubTitle>;
};
