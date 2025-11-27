"use client";
import React, { useEffect, useState } from 'react';
import { ReactFlow, Background, useNodesState, useEdgesState, Handle, Position, useReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { PhoneCall, FileText, Settings, ShieldCheck } from 'lucide-react';

// Custom Node Component
const CustomNode = ({ data }) => {
  const Icon = data.icon;
  return (
    <div className={`bg-white p-8 rounded-3xl border-[3px] ${data.borderColor} shadow-xl min-w-96 sm:96 text-center relative group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>
      {/* Dynamic Target Handle */}
      {data.targetHandle && (
        <Handle
          type="target"
          position={data.targetHandle}
          className="!bg-teal-600 !w-4 !h-4 !border-4 !border-white"
        />
      )}

      <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${data.color} shadow-inner transform group-hover:rotate-6 transition-transform duration-300`}>
        <Icon size={36} strokeWidth={1.5} />
      </div>

      <h3 className="font-extrabold text-2xl text-gray-900 mb-3 tracking-tight">{data.title}</h3>
      <p className="text-base text-gray-600 leading-relaxed font-medium">{data.description}</p>

      <div className="absolute -top-6 -right-6 w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg border-4 border-white transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
        {data.id}
      </div>

      {/* Dynamic Source Handle */}
      {data.sourceHandle && (
        <Handle
          type="source"
          position={data.sourceHandle}
          className="!bg-teal-600 !w-4 !h-4 !border-4 !border-white"
        />
      )}
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'step',               // ⬅️ rectangular connector
    animated: true,
    style: { stroke: '#0d9488', strokeWidth: 3 },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'step',               // ⬅️ rectangular connector
    animated: true,
    style: { stroke: '#0284c7', strokeWidth: 3 },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'step',               // ⬅️ rectangular connector
    animated: true,
    style: { stroke: '#4f46e5', strokeWidth: 3 },
  },
];


const FlowContent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();
  const [windowWidth, setWindowWidth] = useState(0);

  // Initialize window width
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update nodes based on screen size
  useEffect(() => {
    // Breakpoint at 1024px to accommodate wider nodes in zig-zag
    const isMobile = windowWidth < 1024;
    const verticalGap = 350; // Increased vertical gap for larger nodes

    // Desktop positions
    const leftX = 50;
    const rightX = 600;

    const newNodes = [
      {
        id: '1',
        type: 'custom',
        position: { x: isMobile ? 0 : leftX, y: 0 },
        data: {
          id: 1,
          title: 'Contact & Inspection',
          description: 'Share your requirement—our team will visit and inspect your site.',
          icon: PhoneCall,
          color: 'bg-teal-50 text-teal-600',
          borderColor: 'border-teal-100',
          sourceHandle: Position.Right, // 1. Start from right side
        },
      },
      {
        id: '2',
        type: 'custom',
        position: { x: isMobile ? 0 : rightX, y: verticalGap },
        data: {
          id: 2,
          title: 'Free Quotation',
          description: 'Receive a clear, transparent estimate based on your measurements and needs.',
          icon: FileText,
          color: 'bg-sky-50 text-sky-600',
          borderColor: 'border-sky-100',
          targetHandle: Position.Top, // 2. Receive from top
          sourceHandle: Position.Bottom, // 2. Send from bottom
        },
      },
      {
        id: '3',
        type: 'custom',
        position: { x: isMobile ? 0 : leftX, y: verticalGap * 2 },
        data: {
          id: 3,
          title: 'Custom Fabrication',
          description: 'We prepare customized invisible grill cables, nets, or window frames to fit your space perfectly.',
          icon: Settings,
          color: 'bg-indigo-50 text-indigo-600',
          borderColor: 'border-indigo-100',
          targetHandle: Position.Right, // 3. Receive from right
          sourceHandle: Position.Bottom, // 3. Send from bottom
        },
      },
      {
        id: '4',
        type: 'custom',
        position: { x: isMobile ? 0 : rightX, y: verticalGap * 3 },
        data: {
          id: 4,
          title: 'Professional Installation',
          description: 'Our experts install neatly, safely, and quickly—ready to use on the same day.',
          icon: ShieldCheck,
          color: 'bg-emerald-50 text-emerald-600',
          borderColor: 'border-emerald-100',
          targetHandle: Position.Left, // 4. Receive from left
        },
      },
    ];

    setNodes(newNodes);

    // Fit view after a brief delay to allow rendering
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 800 });
    }, 100);

  }, [windowWidth, setNodes, fitView]);

  return (
    <div className="h-[900px] w-full max-w-5xl mx-auto overflow-hidden  relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        preventScrolling={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        // Add connection line to be as rectangle
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#f0fdfa" gap={20} size={1} />
      </ReactFlow>
      <div className="absolute inset-0 z-10 bg-transparent pointer-events-none" />
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50 relative border bg-white">
      <div className="text-center max-w-3xl mx-auto mb-10 px-4 ">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-800 tracking-tight mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-600">
          Our Simple 4-Step Installation Process
        </p>
      </div>

      <ReactFlowProvider>
        <FlowContent />
      </ReactFlowProvider>
    </section>
  );
};

export default HowItWorks;
