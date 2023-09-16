'use client'

import { useCallback, useState, useRef, useContext } from 'react';
import ReactFlow, { Background, Controls, 
  Connection, Node, Edge, EdgeChange, 
  NodeChange, addEdge, applyEdgeChanges, 
  applyNodeChanges, useReactFlow, useNodesState
  , useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

import EditorNode from '@/components/EditorNode';


const initialNodes = [
  { 
    id: 'node-1', 
    type: 'editor', 
    position: { x: 0, y: 0 }, 
    data: { label:'', block_id: 'block-1' },
  },
];

// create a dict for edges

const nodeTypes = { editor: EditorNode };

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Edge | Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        panOnScroll={true}
        selectionOnDrag={true}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}