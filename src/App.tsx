import { useNotesStore } from './store/notesStore'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'

function App() {
  const activeNoteId = useNotesStore((state) => state.activeNoteId)

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-100">
      <Sidebar />
      {activeNoteId ? (
        <Editor />
      ) : (
        <div className="flex flex-1 items-center justify-center text-neutral-500">
          Select a note or create a new one to get started
        </div>
      )}
    </div>
  )
}

export default App
