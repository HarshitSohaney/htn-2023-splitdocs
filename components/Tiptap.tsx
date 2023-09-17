'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

// A new Y document
// const ydoc = new Y.Doc()
// // Registered with a WebRTC provider
// const provider = new WebrtcProvider('example-document', ydoc)

type TiptapProps = {
  text?: string;
  editor: any;
}

const Tiptap = ({ text, editor }: TiptapProps) => {
  return (
    <EditorContent editor={editor} className='bg-white p-8 cursor-text' />
  )
}

export default Tiptap