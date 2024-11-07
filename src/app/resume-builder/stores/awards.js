import create from 'zustand';
import { persist } from 'zustand/middleware';
import  produce  from 'immer';
import resumeData from '../helpers/constants/resume-data.json';

// Add a new award to the list
const addAward = (set) => ({ title, awarder, date, summary, id }) =>
  set(
    produce((state) => {
      state.awards.push({
        title,
        awarder,
        // date,
        summary,
        id,
      });
    })
  );

// Remove an award based on its index
const removeAward = (set) => (index) =>
  set((state) => ({
    awards: state.awards.slice(0, index).concat(state.awards.slice(index + 1)),
  }));

// Set all awards to the provided values
const setAllAwards = (set) => (values) => {
  set({
    awards: values,
  });
};

// Get a specific award based on the index
const getAllAwards = (get) => (index) => {
  return get().awards[index];
};

// Move the award up in the list
const onMoveUp = (set) => (index) => {
  set(
    produce((state) => {
      if (index > 0) {
        const currentAward = state.awards[index];
        state.awards[index] = state.awards[index - 1];
        state.awards[index - 1] = currentAward;
      }
    })
  );
};

// Move the award down in the list
const onMoveDown = (set) => (index) => {
  set(
    produce((state) => {
      const totalExp = state.awards.length;
      if (index < totalExp - 1) {
        const currentAward = state.awards[index];
        state.awards[index] = state.awards[index + 1];
        state.awards[index + 1] = currentAward;
      }
    })
  );
};

// Update an award based on its index
const updateAward = (set) => (index, updatedInfo) => {
  set(
    produce((state) => {
      state.awards[index] = updatedInfo;
    })
  );
};

// Create the zustand store with persistence
export const useAwards = create(
  persist(
    (set, get) => ({
      awards: resumeData.awards,
      add: addAward(set),
      get: getAllAwards(get),
      remove: removeAward(set),
      reset: setAllAwards(set),
      onmoveup: onMoveUp(set),
      onmovedown: onMoveDown(set),
      updateAward: updateAward(set),
    }),
    { name: 'awards' }
  )
);
