'use client'

import { Editor } from 'novel';

const EditorNode = () => {
  return (
    <div>
      <p>Block ID: 3jfo2yvhfguwl278d</p>
      {/* <Handle type="target" position={Position.Top} /> */}
      <div className="bg-black p-1 rounded-lg">
        <Editor
          defaultValue={"Write some cool text here!"}
          className="bg-white"
        />
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" /> */}
      {/* <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} /> */}
    </div>
  );
}

export default EditorNode;
