'use client'

import { useCallback, useState } from 'react';
import ReactFlow, { Background, Controls, Connection, Node, Edge, EdgeChange, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

import EditorNode from '@/components/EditorNode';

const initialNodes = [
  { id: 'node-1', type: 'editor', position: { x: 0, y: 0 }, data: { block_id: 123 } },
  { id: 'node-2', type: 'editor', position: { x: 100, y: 0 }, data: { block_id: 456 } },
];

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
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
