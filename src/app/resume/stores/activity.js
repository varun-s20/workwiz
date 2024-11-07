import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import resumeData from "../helpers/constants/resume-data.json";

/**
 * Set all activities
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to set activities
 */
const setAllAwards = (set) => (activityItem) => {
  set({
    activities: activityItem,
  });
};

/**
 * Update achievements in the activities
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to update achievements
 */
const updateAchievements = (set) => (achievements) => {
  set(
    produce((state) => {
      state.activities.achievements = achievements;
    })
  );
};

/**
 * Update involvements in the activities
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to update involvements
 */
const updateInvolvements = (set) => (involvements) => {
  set(
    produce((state) => {
      state.activities.involvements = involvements;
    })
  );
};

// Create Zustand store
export const useActivity = create(
  persist(
    (set, get) => ({
      activities: resumeData.activities,

      get: () => get().activities,
      reset: setAllAwards(set),
      updateAchievements: updateAchievements(set),
      updateInvolvements: updateInvolvements(set),
    }),
    { name: "activities" }
  )
);
