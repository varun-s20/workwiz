import { AVAILABLE_TEMPLATES } from '../helpers/constants';
import {create} from 'zustand';

/**
 * Zustand store for managing templates.
 */

export const useTemplates = create((set) => ({
  availableTemplate: AVAILABLE_TEMPLATES,
  activeTemplate: AVAILABLE_TEMPLATES['modern'],
  setTemplate: (template) => {
    // console.log("ID: ", template.id)
    localStorage.setItem('selectedTemplateId', template.id);
    set({ activeTemplate: template });
    console.log("ActiveTemplate: ",template);
  },
}));
