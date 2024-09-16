import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import resumeData from "../helpers/constants/resume-data.json";

/**
 * Add a skill.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to add skill
 */
const addSkill =
  (set) =>
  ({ name, level }) =>
    set(
      produce((state) => {
        state.values.push({ name, level });
      })
    );

/**
 * Remove a skill by index.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to remove skill by index
 */
const removeSkill = (set) => (index) =>
  set(
    produce((state) => {
      state.values.splice(index, 1);
    })
  );

/**
 * Set all skills.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to set skills
 */
const setSkills = (set) => (values) => set(() => ({ values }));

/**
 * Get all skills if enabled.
 * @param {Function} get - Zustand get function
 * @returns {Function} - Function to get skills
 */
const getSkills = (get) => () => (get().isEnabled ? get().values : []);

/**
 * Set whether the skills are enabled.
 * @param {Function} set - Zustand set function
 * @returns {Function} - Function to set enabled state
 */
const setIsEnabled = (set) => (isEnabled) => set(() => ({ isEnabled }));

/**
 * Get methods for skill state management.
 * @param {Function} set - Zustand set function
 * @param {Function} get - Zustand get function
 * @returns {Object} - Methods for managing skills
 */
const getMethods = (set, get) => ({
  get: getSkills(get),
  add: addSkill(set),
  remove: removeSkill(set),
  reset: setSkills(set),
  setIsEnabled: setIsEnabled(set),
});

/**
 * Zustand store for managing language skills.
 */
export const useLanguages = create(
  persist(
    (set, get) => ({
      title: "Languages",
      hasLevel: true,
      values: resumeData.skills.languages,
      isEnabled: true,

      ...getMethods(set, get),
    }),
    { name: "languages" }
  )
);

/**
 * Zustand store for managing framework skills.
 */
export const useFrameworks = create(
  persist(
    (set, get) => ({
      title: "Frameworks",
      hasLevel: true,
      values: resumeData.skills.frameworks,
      isEnabled: true,

      ...getMethods(set, get),
    }),
    { name: "frameworks" }
  )
);

/**
 * Zustand store for managing technology skills.
 */
export const useTechnologies = create(
  persist(
    (set, get) => ({
      title: "Technologies",
      hasLevel: false,
      values: resumeData.skills.technologies,
      isEnabled: true,

      ...getMethods(set, get),
    }),
    { name: "technologies" }
  )
);

/**
 * Zustand store for managing library skills.
 */
export const useLibraries = create(
  persist(
    (set, get) => ({
      title: "Libraries",
      hasLevel: false,
      values: resumeData.skills.libraries,
      isEnabled: true,

      ...getMethods(set, get),
    }),
    { name: "libraries" }
  )
);

/**
 * Zustand store for managing database skills.
 */
export const useDatabases = create(
  persist(
    (set, get) => ({
      title: "Databases",
      hasLevel: false,
      values: resumeData.skills.databases,
      isEnabled: true,

      ...getMethods(set, get),
    }),
    { name: "databases" }
  )
);

/**
 * Zustand store for managing practice skills.
 */
export const usePractices = create(
  persist(
    (set, get) => ({
      title: "Practices",
      hasLevel: false,
      values: resumeData.skills.practices,
      isEnabled: true,

      ...getMethods(set, get),
    }),
    { name: "practices" }
  )
);

/**
 * Zustand store for managing tool skills.
 */
export const useTools = create(
  persist(
    (set, get) => ({
      title: "Tools",
      hasLevel: false,
      values: resumeData.skills.tools,
      isEnabled: true,

      ...getMethods(set, get),
    }),
    { name: "tools" }
  )
);
