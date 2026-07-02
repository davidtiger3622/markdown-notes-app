import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Sidebar from '../Sidebar'
import { useNotesStore } from '../../store/notesStore'

beforeEach(() => {
  localStorage.clear()
  useNotesStore.setState({ notes: [], activeNoteId: null })
})

describe('Sidebar', () => {
  it('shows empty state when there are no notes', () => {
    render(<Sidebar isOpen={true} onClose={() => {}} />)
    expect(screen.getByText('No notes yet')).toBeInTheDocument()
  })

  it('creates a new note when the button is clicked', async () => {
    const user = userEvent.setup()
    render(<Sidebar isOpen={true} onClose={() => {}} />)

    await user.click(screen.getByText('+ New Note'))

    expect(screen.getByText('Untitled Note')).toBeInTheDocument()
    expect(useNotesStore.getState().notes).toHaveLength(1)
  })

  it('displays existing notes from the store', () => {
    useNotesStore.getState().createNote()
    useNotesStore.getState().renameNote(useNotesStore.getState().notes[0].id, 'My Note')

    render(<Sidebar isOpen={true} onClose={() => {}} />)

    expect(screen.getByText('My Note')).toBeInTheDocument()
  })
})
