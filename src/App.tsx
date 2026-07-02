import { useState, useEffect } from 'react'
import { useNotesStore } from './store/notesStore'
import { useThemeStore } from './store/themeStore'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import Header from './components/Header'

function App() {
  const activeNoteId = useNotesStore((state) => state.activeNoteId)
  const theme = useThemeStore((state) => state.theme)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="flex h-screen flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {activeNoteId ? (
          <Editor />
        ) : (
          <div className="flex flex-1 items-center justify-center text-neutral-500">
            Select a note or create a new one to get started
          </div>
        )}
      </div>
    </div>
  )
}

export default App
