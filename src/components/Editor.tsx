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

  return (
    <div className="flex flex-1 flex-col">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => renameNote(activeNote.id, title || 'Untitled Note')}
        className="bg-transparent px-6 py-4 text-xl font-semibold outline-none border-b border-neutral-800"
        placeholder="Untitled Note"
      />

      <div className="flex flex-1 overflow-hidden">
        <textarea
          value={activeNote.content}
          onChange={(e) => updateNote(activeNote.id, e.target.value)}
          className="w-1/2 resize-none bg-neutral-950 p-6 font-mono text-sm outline-none border-r border-neutral-800"
          placeholder="Write your markdown here..."
        />

        <div className="w-1/2 overflow-y-auto p-6 prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {activeNote.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default Editor
