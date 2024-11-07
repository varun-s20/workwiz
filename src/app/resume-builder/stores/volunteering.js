import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import resumeData from '../helpers/constants/resume-data.json';

// Define the initial state and actions
const addVolunteering = (set) => ({
  organization,
  position,
  isVolunteeringNow,
  // endDate,
  summary,
  id,
  url = '',
  highlights = [],
}) =>
  set(
    produce((state) => {
      state.volunteeredExps.push({
        id,
        organization,
        position,
        // startDate, // Commented out in the TypeScript version
        isVolunteeringNow,
        // endDate, // Commented out in the TypeScript version
        summary,
        url,
        highlights,
      });
    })
  );

const removeVolunteeringExp = (set) => (index) =>
  set((state) => ({
    volunteeredExps: state.volunteeredExps
      .slice(0, index)
      .concat(state.volunteeredExps.slice(index + 1)),
  }));

const setVolunteeringExps = (set) => (values) => {
  set({ volunteeredExps: values });
};

const updatedVolunteeringExp = (set) => (index, updatedInfo) => {
  set(
    produce((state) => {
      state.volunteeredExps[index] = updatedInfo;
    })
  );
};

const getVolunteeringExp = (get) => (index) => {
  return get().volunteeredExps[index];
};

const onMoveUp = (set) => (index) => {
  set(
    produce((state) => {
      if (index > 0) {
        const currentExperience = state.volunteeredExps[index];
        state.volunteeredExps[index] = state.volunteeredExps[index - 1];
        state.volunteeredExps[index - 1] = currentExperience;
      }
    })
  );
};

const onMoveDown = (set) => (index) => {
  set(
    produce((state) => {
      const totalExp = state.volunteeredExps.length;
      if (index < totalExp - 1) {
        const currentExperience = state.volunteeredExps[index];
        state.volunteeredExps[index] = state.volunteeredExps[index + 1];
        state.volunteeredExps[index + 1] = currentExperience;
      }
    })
  );
};

// Create the store
export const useVolunteeringStore = create(
  persist(
    (set, get) => ({
      volunteeredExps: resumeData.volunteer,
      add: addVolunteering(set),
      get: getVolunteeringExp(get),
      remove: removeVolunteeringExp(set),
      reset: setVolunteeringExps(set),
      onmoveup: onMoveUp(set),
      onmovedown: onMoveDown(set),
      updatedVolunteeringExp: updatedVolunteeringExp(set),
    }),
    { name: 'volunteering' }
  )
);
