import type { Note } from '../types/note.tsx';

import { v4 as uuidv4 } from 'uuid';
import {create} from 'zustand';

import { colors } from '../assets/color';

interface Store {
	notes: Array<Note>;
	addNote: (title: string, content: string) => void;
	updateNote: (id: string, title: string, content: string) => void;
	deleteNote: (id: string) => void;
	getNote: (id: string) => Note | undefined;
}

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const use_store = create<Store>((set, get) => ({
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
  getNote: (id: string) => get().notes.find((note) => note.id === id),
}));

export default use_store;
