'use client'

import { Editor } from 'novel';
import { useState } from 'react';

type EditorNodeProps = {
  data: {
    block_id: string;
    text: string;
  };
}

const EditorNode = ({ data }: EditorNodeProps) => {

  const [tags, setTags] = useState<string[]>([
    'generational',
    'visionary',
    '10X',
  ]);

  return (
    <div>
      <p>Block ID: {data.block_id}</p>
      {/* <Handle type="target" position={Position.Top} /> */}
      <div className="bg-black p-1 rounded-lg">
        <Editor
          defaultValue={data.text}
          className="bg-white"
          storageKey={data.block_id}
        />
        <div>
          {tags.map((tag) => (
            <span
              className="bg-gray-200 rounded-full px-2 py-1 text-xs font-bold mr-1 hover:bg-gray-300"
              onClick={() => alert('hi')}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" /> */}
      {/* <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} /> */}
    </div>
  );
}

export default EditorNode;
