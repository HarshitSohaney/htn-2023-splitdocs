'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Write something amazing here!</p>',
    
  })

  return (
    <EditorContent editor={editor} className='bg-white p-8' />
  )
}

export default Tiptap