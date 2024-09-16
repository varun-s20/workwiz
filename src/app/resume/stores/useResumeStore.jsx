import React from "react";
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from "./skills";

import ResumeData from "../helpers/constants/resume-data.json";
import { useActivity } from "./activity";
import { useAwards } from "./awards";
import { useBasicDetails } from "./basic";
import { useEducations } from "./education";
import { useExperiences } from "./experience";
import { useVolunteeringStore } from "./volunteering";

/**
 * Custom hook to use the resume store
 */
export const useResumeStore = () => {
  return {
    ...ResumeData,
    basics: useBasicDetails((state) => state.values),
    work: useExperiences((state) => state.experiences),
    education: useEducations((state) => state.academics),
    awards: useAwards((state) => state.awards),
    // volunteer: useVolunteeringStore(state => state.volunteeredExps),
    skills: {
      languages: useLanguages((state) => state.get()),
      frameworks: useFrameworks((state) => state.get()),
      technologies: useTechnologies((state) => state.get()),
      libraries: useLibraries((state) => state.get()),
      databases: useDatabases((state) => state.get()),
      practices: usePractices((state) => state.get()),
      tools: useTools((state) => state.get()),
    },
    activities: useActivity((state) => state.get()),
  };
};

/**
 * Reset all the stores to their initial state
 */
export const resetResumeStore = () => {
  useBasicDetails.getState().reset(ResumeData.basics);
  useLanguages.getState().reset(ResumeData.skills.languages);
  useFrameworks.getState().reset(ResumeData.skills.frameworks);
  useLibraries.getState().reset(ResumeData.skills.libraries);
  useDatabases.getState().reset(ResumeData.skills.databases);
  useTechnologies.getState().reset(ResumeData.skills.technologies);
  usePractices.getState().reset(ResumeData.skills.practices);
  useTools.getState().reset(ResumeData.skills.tools);
  useExperiences.getState().reset(ResumeData.work);
  useEducations.getState().reset(ResumeData.education);
  useVolunteeringStore.getState().reset(ResumeData.volunteer);
  useAwards.getState().reset(ResumeData.awards);
  useActivity.getState().reset(ResumeData.activities);
};

// Example usage in a component
const ResumeComponent = () => {
  const resumeData = useResumeStore();

  return (
    <div>
      <h1>Resume</h1>
      {/* Render resume data here */}
      {/* Example: */}
      <section>
        <h2>Basic Details</h2>
        <pre>{JSON.stringify(resumeData.basics, null, 2)}</pre>
      </section>
      {/* Add more sections for other resume data */}
    </div>
  );
};

export default ResumeComponent;
