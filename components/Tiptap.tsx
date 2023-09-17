'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

// A new Y document
const ydoc = new Y.Doc()
// Registered with a WebRTC provider
const provider = new WebrtcProvider('example-document', ydoc)

type TiptapProps = {
  text?: string;
}

const Tiptap = ({ text }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        document: ydoc,
      }),
    ],
    content: `<p>${text ?? 'Write something amazing here!'}</p>`,
    
  })

  return (
    <EditorContent editor={editor} className='bg-white p-8' />
  )
}

export default Tiptap