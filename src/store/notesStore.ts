import { create } from 'zustand'

export interface Note {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
}

interface NotesState {
  notes: Note[]
  activeNoteId: string | null
  createNote: () => void
  updateNote: (id: string, content: string) => void
  renameNote: (id: string, title: string) => void
  deleteNote: (id: string) => void
  setActiveNote: (id: string) => void
}

const STORAGE_KEY = 'markdown-notes-app-data'

function loadNotes(): Note[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Note[]
  } catch {
    return []
  }
}

function persist(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: loadNotes(),
  activeNoteId: null,

  createNote: () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    const notes = [newNote, ...get().notes]
    persist(notes)
    set({ notes, activeNoteId: newNote.id })
  },

  updateNote: (id, content) => {
    const notes = get().notes.map((note) =>
      note.id === id ? { ...note, content, updatedAt: Date.now() } : note
    )
    persist(notes)
    set({ notes })
  },

  renameNote: (id, title) => {
    const notes = get().notes.map((note) =>
      note.id === id ? { ...note, title, updatedAt: Date.now() } : note
    )
    persist(notes)
    set({ notes })
  },

  deleteNote: (id) => {
    const notes = get().notes.filter((note) => note.id !== id)
    persist(notes)
    const activeNoteId = get().activeNoteId === id ? null : get().activeNoteId
    set({ notes, activeNoteId })
  },

  setActiveNote: (id) => {
    set({ activeNoteId: id })
  },
}))
