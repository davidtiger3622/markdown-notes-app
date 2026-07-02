function ShortcutsHint() {
    return (
      <div className="hidden md:block fixed bottom-4 right-4 rounded-md border border-neutral-200 bg-white/90 px-3 py-2 text-xs text-neutral-500 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
        <p className="font-medium text-neutral-700 dark:text-neutral-300 mb-1">Shortcuts</p>
        <p><kbd className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">N</kbd> New note</p>
      </div>
    )
  }
  
  export default ShortcutsHint
  