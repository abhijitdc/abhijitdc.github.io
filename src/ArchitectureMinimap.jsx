import React from 'react';

const MINIMAP_DATA = {
  // Projects Node Maps
  "BigQuery Information Schema Agent": [
    { "label": "User Query", "desc": "Natural Language Input" },
    { "label": "Google ADK", "desc": "Agent Orchestration" },
    { "label": "Vertex AI Engine", "desc": "Context Verification" },
    { "label": "BigQuery Schema", "desc": "Live Database Metadata" }
  ],
  "BigQuery MCP Agent": [
    { "label": "LLM Client", "desc": "Claude / Gemini App" },
    { "label": "MCP Protocol", "desc": "Tool Request Standard" },
    { "label": "bq_mcp_agent", "desc": "Python Context Server" },
    { "label": "BigQuery Engine", "desc": "Raw Database Fetch" }
  ],
  "Gemini Enterprise ADK Sales Agent": [
    { "label": "Sales Rep", "desc": "Conversational UI" },
    { "label": "Gemini Gateway", "desc": "Enterprise Auth Gate" },
    { "label": "ADK Agent", "desc": "Context Injection Layer" },
    { "label": "Enterprise DB", "desc": "ERP / CRM Systems" }
  ],
  "GraphRAG with BigQuery": [
    { "label": "Entity Extractor", "desc": "Semantic Tagging" },
    { "label": "Graph Database", "desc": "Multi-Degree Nodes" },
    { "label": "Vector Search", "desc": "BigQuery Embeddings" },
    { "label": "Contextual SQL", "desc": "Multi-hop Graph RAG" }
  ],
  "LLM RAG React App": [
    { "label": "React Frontend", "desc": "Vite Responsive UI" },
    { "label": "Firebase Auth", "desc": "User Identity & MFA" },
    { "label": "Flask API Server", "desc": "REST Routing Controller" },
    { "label": "Langchain / Gemini", "desc": "Semantic RAG Pipeline" }
  ],
  "Nix Harness": [
    { "label": "Nix-Shell Config", "desc": "Deterministic Environment" },
    { "label": "Sandboxed Dev", "desc": "OS-Level Isolation" },
    { "label": "Harness Runner", "desc": "Local Execution Loop" },
    { "label": "Agent Evaluation", "desc": "Secure Verification" }
  ],
  "Terraform BigQuery Streaming Demo": [
    { "label": "Terraform HCL", "desc": "Modular Infrastructure" },
    { "label": "GCP IAM Role", "desc": "Least Privilege Security" },
    { "label": "Cloud Pub/Sub", "desc": "Real-time Message Bus" },
    { "label": "BigQuery Stream", "desc": "Low-Latency Ingestion" }
  ],
  "Vertex AI RAG App": [
    { "label": "User Query", "desc": "Conversational Intent" },
    { "label": "Vertex AI Search", "desc": "Enterprise Vector Search" },
    { "label": "Multi-Docs Fetch", "desc": "Chunked Retrieval" },
    { "label": "Gemini Synthesis", "desc": "Grounding Check Answer" }
  ]
};

const DEFAULT_MINIMAP = [
  { "label": "Context & Problem", "desc": "Engineering Pain Point" },
  { "label": "System Design", "desc": "Architectural Planning" },
  { "label": "Implementation", "desc": "Modular Code Delivery" },
  { "label": "Production Output", "desc": "Verified & Built Assets" }
];

export default function ArchitectureMinimap({ file }) {
  if (!file) return null;

  const isProject = file.type === 'project';
  const dataKey = isProject ? file.data.name : file.title;
  
  // Try to find specific project nodes, otherwise fallback to defaults (e.g. for blogs)
  const nodes = MINIMAP_DATA[dataKey] || DEFAULT_MINIMAP;

  return (
    <div className="architecture-minimap-wrapper glass-panel animate-fade-in">
      <div className="minimap-header">
        <span className="minimap-title">⚙️ Procedural System Architecture Minimap</span>
        <span className="minimap-status">● Live Data Flowing</span>
      </div>

      <div className="minimap-canvas-container">
        <svg viewBox="0 0 800 110" className="minimap-svg" width="100%" height="100%">
          <defs>
            {/* Direct Arrow Marker */}
            <marker 
              id="minimap-arrow" 
              viewBox="0 0 10 10" 
              refX="6" 
              refY="5" 
              markerWidth="6" 
              markerHeight="6" 
              orient="auto-start-reverse"
            >
              <path d="M 0 2 L 8 5 L 0 8 z" fill="var(--accent-blue)" />
            </marker>

            {/* Glowing filter effect */}
            <filter id="minimap-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Lines (Animated Data Flows) */}
          {[0, 1, 2].map((idx) => {
            const x1 = 30 + idx * 200 + 140; // End of node idx
            const x2 = 30 + (idx + 1) * 200; // Start of node idx+1
            const y = 55;

            return (
              <g key={idx}>
                {/* Background static line */}
                <line 
                  x1={x1} 
                  y1={y} 
                  x2={x2} 
                  y2={y} 
                  stroke="rgba(255, 255, 255, 0.06)" 
                  strokeWidth="2" 
                />
                {/* Animated overlay flowing line */}
                <line 
                  x1={x1} 
                  y1={y} 
                  x2={x2} 
                  y2={y} 
                  stroke="var(--accent-blue)" 
                  strokeWidth="2" 
                  strokeDasharray="4 4" 
                  className="minimap-flow-line"
                  markerEnd="url(#minimap-arrow)"
                />
              </g>
            );
          })}

          {/* Node Cards */}
          {nodes.map((node, idx) => {
            const x = 30 + idx * 200;
            const y = 32.5;
            const width = 140;
            const height = 45;

            return (
              <g key={idx} className="minimap-node-group">
                {/* Rounded Box with subtle background */}
                <rect 
                  x={x} 
                  y={y} 
                  width={width} 
                  height={height} 
                  rx="6" 
                  ry="6" 
                  className="minimap-node-rect"
                />
                
                {/* Primary label */}
                <text 
                  x={x + width / 2} 
                  y={y + 19} 
                  className="minimap-node-label"
                  textAnchor="middle"
                >
                  {node.label}
                </text>

                {/* Subtitle / Description */}
                <text 
                  x={x + width / 2} 
                  y={y + 33} 
                  className="minimap-node-desc"
                  textAnchor="middle"
                >
                  {node.desc}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
