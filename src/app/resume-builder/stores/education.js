import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce  from 'immer';
import resumeData from '../helpers/constants/resume-data.json';

/**
 * Add new education item.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to add education
 */
const addEducation = (set) => ({
  institution,
  studyType,
  area,
  // startDate,
  isStudyingHere,
  // endDate,
  id,
  url,
  score,
  courses,
}) =>
  set(
    produce((state) => {
      state.academics.push({
        institution,
        studyType,
        area,
        // startDate,
        isStudyingHere,
        // endDate,
        id,
        url,
        courses,
        score,
      });
    })
  );

/**
 * Remove an education item by index.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to remove education by index
 */
const removeEducation = (set) => (index) =>
  set((state) => ({
    academics: state.academics.slice(0, index).concat(state.academics.slice(index + 1)),
  }));

/**
 * Set all education items.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to set education items
 */
const setEducation = (set) => (values) => {
  set({
    academics: values,
  });
};

/**
 * Get a specific education item by index.
 * @param {Function} get - Zustand get function
 * @returns {Function} - Function to get education by index
 */
const getEducation = (get) => (index) => {
  return get().academics[index];
};

/**
 * Move an education item up in the list.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to move education up
 */
const onMoveUp = (set) => (index) => {
  set(
    produce((state) => {
      if (index > 0) {
        const currentExperience = state.academics[index];
        state.academics[index] = state.academics[index - 1];
        state.academics[index - 1] = currentExperience;
      }
    })
  );
};

/**
 * Move an education item down in the list.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to move education down
 */
const onMoveDown = (set) => (index) => {
  set(
    produce((state) => {
      const totalExp = state.academics.length;
      if (index < totalExp - 1) {
        const currentExperience = state.academics[index];
        state.academics[index] = state.academics[index + 1];
        state.academics[index + 1] = currentExperience;
      }
    })
  );
};

/**
 * Update education item by index.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to update education by index
 */
const updateEducation = (set) => (index, updatedInfo) => {
  set(
    produce((state) => {
      state.academics[index] = updatedInfo;
    })
  );
};

/**
 * Zustand store for managing education details.
 */
export const useEducations = create(
  persist(
    (set, get) => ({
      academics: resumeData.education,
      add: addEducation(set),
      get: getEducation(get),
      remove: removeEducation(set),
      reset: setEducation(set),
      onmoveup: onMoveUp(set),
      onmovedown: onMoveDown(set),
      updateEducation: updateEducation(set),
    }),
    { name: 'education' }
  )
);
