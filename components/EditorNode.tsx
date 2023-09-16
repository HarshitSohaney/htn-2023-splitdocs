'use client'

import { Editor } from 'novel';
import { useState } from 'react';
import { Handle, Position, useReactFlow } from "reactflow";

import { DocumentDuplicateIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/20/solid';

type EditorNodeProps = {
  data: {
    block_id: string;
    text: string;
  };
}

const EditorNode = ({ id, data}: EditorNodeProps) => {

  console.log(id)

  const [tags, setTags] = useState<string[]>([
    'generational',
    'visionary',
    '10X',
  ]);

  const reactFlowInstance = useReactFlow();

  const generateBlock = () => {

  }

  const addNewNode = (id: string, text?: string) => {
    const nodes = reactFlowInstance.getNodes();
    const edges = reactFlowInstance.getEdges();
    
    const oldData = reactFlowInstance.getNode(id);
    const newData = { ...oldData.data, text };
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

      <div className="flex flex-col gap-2 p-1 rounded-lg">
        <span className='h-6 w-6 block'></span>
        <button onClick={() => addNewNode(id)}>
          <DocumentPlusIcon className="h-6 w-6" />
        </button>
        <button onClick={() => addNewNode(id)}>
          <SparklesIcon className="h-6 w-6" />
        </button>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id={`edge-${reactFlowInstance.getNodes().length-1}`}
        style={{ bottom: 10, zIndex: -30 }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Top}
        id={`edge-${reactFlowInstance.getNodes().length-1}`}
        style={{ top: 40, zIndex: -30 }}
        isConnectable={true}
      />
    </div>
  );
}

export default EditorNode;
