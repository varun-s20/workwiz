import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import resumeData from '../helpers/constants/resume-data.json';

/**
 * Add a new experience item.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to add experience
 */
const addExperience = (set) => ({
  name,
  position,
  // startDate,
  isWorkingHere,
  // endDate,
  years,
  summary,
  id,
  url = '',
  highlights = [],
}) =>
  set(
    produce((state) => {
      state.experiences.push({
        id,
        name,
        position,
        // startDate,
        isWorkingHere,
        // endDate,
        summary,
        url,
        years,
        highlights,
      });
    })
  );

/**
 * Remove an experience item by index.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to remove experience by index
 */
const removeExperience = (set) => (index) =>
  set((state) => ({
    experiences: state.experiences.slice(0, index).concat(state.experiences.slice(index + 1)),
  }));

/**
 * Set all experience items.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to set experience items
 */
const setExperience = (set) => (values) => {
  set({
    experiences: values,
  });
};

/**
 * Update an experience item by index.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to update experience
 */
const updateExperience = (set) => (index, updatedInfo) => {
  set(
    produce((state) => {
      state.experiences[index] = updatedInfo;
    })
  );
};

/**
 * Get an experience item by index.
 * @param {Function} get - Zustand get function
 * @returns {Function} - Function to get experience by index
 */
const getExperience = (get) => (index) => {
  return get().experiences[index];
};

/**
 * Move an experience item up in the list.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to move experience up
 */
const onMoveUp = (set) => (index) => {
  set(
    produce((state) => {
      if (index > 0) {
        const currentExperience = state.experiences[index];
        state.experiences[index] = state.experiences[index - 1];
        state.experiences[index - 1] = currentExperience;
      }
    })
  );
};

/**
 * Move an experience item down in the list.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to move experience down
 */
const onMoveDown = (set) => (index) => {
  set(
    produce((state) => {
      const totalExp = state.experiences.length;
      if (index < totalExp - 1) {
        const currentExperience = state.experiences[index];
        state.experiences[index] = state.experiences[index + 1];
        state.experiences[index + 1] = currentExperience;
      }
    })
  );
};

/**
 * Zustand store for managing work experience details.
 */
export const useExperiences = create(
  persist(
    (set, get) => ({
      experiences: resumeData.work,
      add: addExperience(set),
      get: getExperience(get),
      remove: removeExperience(set),
      reset: setExperience(set),
      onmoveup: onMoveUp(set),
      onmovedown: onMoveDown(set),
      updateExperience: updateExperience(set),
    }),
    { name: 'experience' }
  )
);
