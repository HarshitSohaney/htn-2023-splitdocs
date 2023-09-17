'use client'

import { useCallback, useState } from 'react';
import { Handle, Position, useReactFlow } from "reactflow";

import { DocumentDuplicateIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/20/solid';

import {v4 as uuid} from 'uuid';
import Tiptap from './Tiptap';

type EditorNodeProps = {
  data: {
    block_id: string;
    text: string;
  };
}

const EditorNode = ({ id, data}: EditorNodeProps) => {

  console.log(id)

  // const editor = useCurrentEditor();
  // console.log(editor)

  const [tags, setTags] = useState<string[]>([
    'generational',
    'visionary',
    '10X',
  ]);

  const { setNodes, setEdges, getNodes, getNode, getEdges, setViewport, getViewport } = useReactFlow();

  const generateBlock = () => {

  }

  const addNewNode = (id: string, text?: string) => {
    const nodes = getNodes();
    const edges = getEdges();
    
    const oldData = getNode(id);
    if (!oldData) return;

    const newData = { ...oldData.data, text, block_id: uuid() };
    const old_pos = oldData.position;

    console.log("old pos: ", old_pos);

    let adder_x = oldData?.width - oldData?.width / 5;
    let adder_y = oldData?.height + 100;

    console.log("nodes: ", nodes);
    for(let i = 0; i < edges.length; i++) { 
      const edge = edges[i];
      if(edge.source == id) {
        while(true) {
          console.log("edge: ", edge);
          const target = getNode(edge.target);

          console.log("target: ", target);

          if(target.position.x != old_pos.x-adder_x || target.position.y != old_pos.y+adder_y) {
            break;
          }
          else if(target.position.x != old_pos.x+adder_x  || target.position.y != old_pos.y+adder_y) {
            adder_x = -adder_x;
            console.log("x: ", adder_x);
            break;
          }
          
          adder_x += 100;
          adder_y += 200;
        }
      }
    }
    // add new node

    const x = old_pos.x-adder_x;
    const y = old_pos.y+adder_y;

    const newNode = {
        id: `node-${nodes.length + 1}`,
        type: 'editor',
        position: { x, y },
        data: newData
    };

    setNodes([...nodes, newNode]);
    setEdges([...edges, { id: `edge-${nodes.length + 1}`, source: id, target: newNode.id }]);

    console.log(x,y)
    // jumpToBlock(x, y);
  }

  const jumpToBlock = useCallback((x: number, y: number) => {
    setViewport({ x, y, zoom: getViewport().zoom }, { duration: 800 });
  }, [setViewport]);

  return (
    <div className="flex flex-row max-w-[50%]">
      <div>
        <p>Block ID: {data.block_id}</p>
        <div className="flex gap-1 items-center justify-center bg-gray-200 h-4 drag-handle rounded-t-lg">
          {[1,2,3].map((i) => (
            <span className="rounded-full h-1 w-1 bg-gray-400"></span>
          ))}
        </div>
        <div className="bg-black p-1 rounded-b-lg">
          {/* <Editor
            defaultValue={data.text || 'Testing!'}
            className="bg-white"
            storageKey={data.block_id}
            completionApi='/api/completion'
            // onUpdate={}
          /> */}
          <Tiptap />
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
        id={`edge-${getNodes().length-1}`}
        style={{ bottom: 10, zIndex: -30 }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Top}
        id={`edge-${getNodes().length-1}`}
        style={{ top: 40, zIndex: -30 }}
        isConnectable={true}
      />
    </div>
  );
}

export default EditorNode;
