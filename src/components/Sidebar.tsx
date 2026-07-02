import { useNotesStore } from '../store/notesStore'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const notes = useNotesStore((state) => state.notes)
  const activeNoteId = useNotesStore((state) => state.activeNoteId)
  const createNote = useNotesStore((state) => state.createNote)
  const deleteNote = useNotesStore((state) => state.deleteNote)
  const setActiveNote = useNotesStore((state) => state.setActiveNote)

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`fixed z-30 h-full w-72 flex-shrink-0 flex-col border-r border-neutral-200 bg-white transition-transform dark:border-neutral-800 dark:bg-neutral-950 md:static md:flex md:translate-x-0 ${
          isOpen ? 'flex translate-x-0' : 'hidden -translate-x-full'
        }`}
      >
        <div className="border-b border-neutral-200 p-4 dark:border-neutral-800">
          <button
            onClick={() => {
              createNote()
              onClose()
            }}
            className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
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
              onClick={() => {
                setActiveNote(note.id)
                onClose()
              }}
              className={`group flex cursor-pointer items-center justify-between border-b border-neutral-100 px-4 py-3 hover:bg-neutral-100 dark:border-neutral-900 dark:hover:bg-neutral-900 ${
                note.id === activeNoteId ? 'bg-neutral-100 dark:bg-neutral-900' : ''
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
                className="text-xs text-neutral-500 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}

export default Sidebar
