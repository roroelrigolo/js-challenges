// src/store/useStore.ts
import {create} from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { colors } from '../assets/color';

interface Note {
  id: string;
  title: string;
  content: string; 
  createdAt: Date;
  updatedAt: Date;
  color: string;
}

interface Store {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
}

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const useStore = create<Store>((set, get) => ({
  notes: [],
  addNote: (title: string, content:string ) => set((state) => {
    const newNote = { id: uuidv4(), title, content, createdAt: new Date(), updatedAt: new Date(), color: getRandomColor() };
    return { notes: [...state.notes, newNote] };
  }),
  updateNote: (id: string, title: string, content: string) => set((state) => ({
    notes: state.notes.map((note) =>
      note.id === id ? { ...note, title, content, updatedAt: new Date() } : note
    ),
  })),
  deleteNote: (id: string) => set((state) => ({
    notes: state.notes.filter((note) => note.id !== id),
  })),
  getNote: (id: string) => get().notes.find((note: { id: string; }) => note.id === id),
}));

export default useStore;
