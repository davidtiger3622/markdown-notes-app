import { beforeEach, describe, expect, it } from 'vitest'
import { useNotesStore } from '../notesStore'

beforeEach(() => {
  localStorage.clear()
  useNotesStore.setState({ notes: [], activeNoteId: null })
})

describe('notesStore', () => {
  it('creates a new note and sets it as active', () => {
    useNotesStore.getState().createNote()
    const state = useNotesStore.getState()

    expect(state.notes).toHaveLength(1)
    expect(state.notes[0].title).toBe('Untitled Note')
    expect(state.activeNoteId).toBe(state.notes[0].id)
  })

  it('updates note content', () => {
    useNotesStore.getState().createNote()
    const noteId = useNotesStore.getState().notes[0].id

    useNotesStore.getState().updateNote(noteId, '# Hello World')
    const updatedNote = useNotesStore.getState().notes[0]

    expect(updatedNote.content).toBe('# Hello World')
  })

  it('renames a note', () => {
    useNotesStore.getState().createNote()
    const noteId = useNotesStore.getState().notes[0].id

    useNotesStore.getState().renameNote(noteId, 'My Custom Title')
    const renamedNote = useNotesStore.getState().notes[0]

    expect(renamedNote.title).toBe('My Custom Title')
  })

  it('deletes a note', () => {
    useNotesStore.getState().createNote()
    const noteId = useNotesStore.getState().notes[0].id

    useNotesStore.getState().deleteNote(noteId)
    const state = useNotesStore.getState()

    expect(state.notes).toHaveLength(0)
    expect(state.activeNoteId).toBeNull()
  })

  it('persists notes to localStorage', () => {
    useNotesStore.getState().createNote()
    const stored = localStorage.getItem('markdown-notes-app-data')

    expect(stored).not.toBeNull()
    const parsed = JSON.parse(stored as string)
    expect(parsed).toHaveLength(1)
  })
})
