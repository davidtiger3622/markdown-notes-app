import { useNotesStore } from '../store/notesStore'

function Sidebar() {
  const notes = useNotesStore((state) => state.notes)
  const activeNoteId = useNotesStore((state) => state.activeNoteId)
  const createNote = useNotesStore((state) => state.createNote)
  const deleteNote = useNotesStore((state) => state.deleteNote)
  const setActiveNote = useNotesStore((state) => state.setActiveNote)

  return (
    <aside className="w-72 flex-shrink-0 border-r border-neutral-800 flex flex-col">
      <div className="p-4 border-b border-neutral-800">
        <button
          onClick={createNote}
          className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-500 transition-colors"
        >
          + New Note
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 && (
          <p className="p-4 text-sm text-neutral-500">No notes yet</p>
        )}

        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => setActiveNote(note.id)}
            className={`group flex items-center justify-between px-4 py-3 cursor-pointer border-b border-neutral-900 hover:bg-neutral-900 ${
              note.id === activeNoteId ? 'bg-neutral-900' : ''
            }`}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{note.title}</p>
              <p className="text-xs text-neutral-500">
                {new Date(note.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteNote(note.id)
              }}
              className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-red-500 text-xs transition-opacity"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
