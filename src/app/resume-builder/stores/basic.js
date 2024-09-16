import { create } from "zustand";
import { persist } from "zustand/middleware";
import resumeData from "../helpers/constants/resume-data.json";

/**
 * Handle text change and update basic details.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to set basic details values
 */
const onChangeText = (set) => (values) => set({ values });

export const useBasicDetails = create(
  persist(
    (set) => ({
      values: resumeData.basics,
      reset: onChangeText(set),
    }),
    { name: "basic" }
  )
);
