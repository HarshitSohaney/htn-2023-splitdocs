'use client'

import { Editor } from 'novel';

type EditorNodeProps = {
  data: {
    block_id: string;
  };
}

const EditorNode = ({ data }: EditorNodeProps) => {
  return (
    <div>
      <p>Block ID: {data.block_id}</p>
      {/* <Handle type="target" position={Position.Top} /> */}
      <div className="bg-black p-1 rounded-lg">
        <Editor
          defaultValue={"Write some cool text here!"}
          className="bg-white"
          storageKey={data.block_id}
        />
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" /> */}
      {/* <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} /> */}
    </div>
  );
}

export default EditorNode;
