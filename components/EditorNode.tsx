'use client'

import { Editor } from 'novel';
import { useReactFlow, ReactFlowInstance } from "reactflow";

type EditorNodeProps = {
  data: {
    block_id: string;
    text: string;
  };
}

const EditorNode = ({ id, data}: EditorNodeProps) => {
  const reactFlowInstance = useReactFlow();

  const addNewNode = (id) => {
    const nodes = reactFlowInstance.getNodes();
    const edges = reactFlowInstance.getEdges();
    
    const oldData = reactFlowInstance.getNode(id);
    const newData = { ...oldData.data };
    const old_pos = oldData.position;

    const newNode = {
        id: `node-${nodes.length + 1}`,
        type: 'editor',
        position: { x: old_pos.x-100, y: old_pos.y+200 },
        data: newData
    };

    reactFlowInstance.setNodes([...nodes, newNode]);
    reactFlowInstance.setEdges([...edges, { id: `edge-${nodes.length + 1}`, source: id, target: newNode.id }]);

  }

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
      
        <div className="bg-black p-1 rounded-lg">
            <button className="bg-white" onClick={() => addNewNode(id)}>Create Branch</button>
        </div>

      {/* <Handle type="source" position={Position.Bottom} id="a" /> */}
      {/* <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} /> */}
    </div>
  );
}

export default EditorNode;
