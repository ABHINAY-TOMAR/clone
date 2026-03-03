import { create } from 'zustand';

export interface DBFile {
  _id: string; 
  fileName: string;
  language: string;
  content: string;
}

interface IDEStore {
  activeProjectId: string | null;
  setActiveProjectId: (id: string | null) => void;
  
  files: DBFile[];
  setFiles: (files: DBFile[]) => void;
  
  activeFileId: string | null;
  setActiveFileId: (id: string | null) => void;
  
  // Local unstored content changes
  unsavedContent: Record<string, string>;
  setUnsavedContent: (id: string, content: string) => void;
  clearUnsavedContent: (id: string) => void;
}

export const useIDEStore = create<IDEStore>((set) => ({
  activeProjectId: null,
  setActiveProjectId: (id) => set({ activeProjectId: id }),
  
  files: [],
  setFiles: (files) => set({ files }),
  
  activeFileId: null,
  setActiveFileId: (id) => set({ activeFileId: id }),
  
  unsavedContent: {},
  setUnsavedContent: (id, content) => 
    set((state) => ({ 
      unsavedContent: { ...state.unsavedContent, [id]: content } 
    })),
  clearUnsavedContent: (id) => 
    set((state) => {
      const newUnsaved = { ...state.unsavedContent };
      delete newUnsaved[id];
      return { unsavedContent: newUnsaved };
    }),
}));
