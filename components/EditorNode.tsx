'use client'

import { Editor } from 'novel';
import { useState } from 'react';
import { useReactFlow } from "reactflow";

import { DocumentDuplicateIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';

type EditorNodeProps = {
  data: {
    block_id: string;
    text: string;
  };
}

const EditorNode = ({ id, data}: EditorNodeProps) => {

  const [tags, setTags] = useState<string[]>([
    'generational',
    'visionary',
    '10X',
  ]);

  const reactFlowInstance = useReactFlow();

  const addNewNode = (id: string) => {
    const nodes = reactFlowInstance.getNodes();
    const edges = reactFlowInstance.getEdges();
    
    const oldData = reactFlowInstance.getNode(id);
    const newData = { ...oldData.data };
    const old_pos = oldData.position;

    const newNode = {
        id: `node-${nodes.length + 1}`,
        type: 'editor',
        position: { x: old_pos.x-100, y: old_pos.y+300 },
        data: newData
    };

    reactFlowInstance.setNodes([...nodes, newNode]);
    reactFlowInstance.setEdges([...edges, { id: `edge-${nodes.length + 1}`, source: id, target: newNode.id }]);

  }

  return (
    <div className="flex flex-row">
      <div>
        <p>Block ID: {data.block_id}</p>
        {/* <Handle type="target" position={Position.Top} /> */}
        <div className="bg-black p-1 rounded-lg">
          <Editor
            defaultValue={data.text || 'Testing!'}
            className="bg-white"
            storageKey={data.block_id}
            completionApi='/api/completion'
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
      </div>

      <div className="p-1 rounded-lg">
        <span className='h-6 w-6 block'></span>
        <button onClick={() => addNewNode(id)}>
          <DocumentPlusIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default EditorNode;
