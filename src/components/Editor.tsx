import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { useNotesStore } from '../store/notesStore'

function Editor() {
  const activeNoteId = useNotesStore((state) => state.activeNoteId)
  const notes = useNotesStore((state) => state.notes)
  const updateNote = useNotesStore((state) => state.updateNote)
  const renameNote = useNotesStore((state) => state.renameNote)

  const activeNote = notes.find((note) => note.id === activeNoteId)
  const [title, setTitle] = useState(activeNote?.title ?? '')

  useEffect(() => {
    setTitle(activeNote?.title ?? '')
  }, [activeNoteId])

  if (!activeNote) return null

  function handleExport() {
    if (!activeNote) return
    const blob = new Blob([activeNote.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${activeNote.title || 'untitled'}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => renameNote(activeNote.id, title || 'Untitled Note')}
          className="flex-1 bg-transparent text-xl font-semibold outline-none"
          placeholder="Untitled Note"
        />
        <button
          onClick={handleExport}
          className="ml-4 flex-shrink-0 rounded-md border border-neutral-200 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
        >
          Export .md
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <textarea
          value={activeNote.content}
          onChange={(e) => updateNote(activeNote.id, e.target.value)}
          className="h-1/2 w-full resize-none border-b border-neutral-200 bg-white p-6 font-mono text-sm outline-none dark:border-neutral-800 dark:bg-neutral-950 md:h-full md:w-1/2 md:border-b-0 md:border-r"
          placeholder="Write your markdown here..."
        />

        <div className="prose dark:prose-invert h-1/2 w-full max-w-none overflow-y-auto p-6 md:h-full md:w-1/2">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {activeNote.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default Editor
