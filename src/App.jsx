import React, { useState, useRef, useEffect } from 'react';
import { 
  Folder, 
  FolderOpen, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Code, 
  Terminal as TerminalIcon, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  BookOpen,
  X,
  Search,
  Puzzle,
  Files,
  Sun,
  Moon
} from 'lucide-react';
import { FaPython, FaReact, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiGooglecloud, SiTerraform, SiTypescript } from 'react-icons/si';
import { PROFILE, MEDIUM_POSTS, GITHUB_REPOS } from './data';
import profileImage from './assets/images/github_avatar.png';
import CareerArc from './CareerArc';
import ArchitectureMinimap from './ArchitectureMinimap';

const getFileIcon = (tags = []) => {
  const tagStr = tags.join(' ').toLowerCase();
  if (tagStr.includes('python')) return <FaPython style={{ color: '#3776AB' }} />;
  if (tagStr.includes('typescript') || tagStr.includes('ts')) return <SiTypescript style={{ color: '#3178C6' }} />;
  if (tagStr.includes('react')) return <FaReact style={{ color: '#61DAFB' }} />;
  if (tagStr.includes('terraform') || tagStr.includes('hcl')) return <SiTerraform style={{ color: '#844FBA' }} />;
  if (tagStr.includes('google') || tagStr.includes('bigquery') || tagStr.includes('gcp')) return <SiGooglecloud style={{ color: '#4285F4' }} />;
  return <FileText size={14} style={{ color: '#ccc' }}/>;
};

// Rich, high-signal project specifications focusing on the 'Why', 'How', and 'What'
const PROJECT_SPECS = {
  "BigQuery Information Schema Agent": {
    why: "Provides natural language access to BigQuery's schema definitions and column-level metadata, reducing database exploration and SQL translation bottlenecks for analysts.",
    how: "User Input ➔ Google ADK ➔ Vertex AI (Session) ➔ BigQuery INFORMATION_SCHEMA ➔ Live Insights",
    patterns: ["Conversational Schema Discovery", "Secure SQL Generation", "Context-Aware Agent Response"],
    tech: ["Google ADK", "Vertex AI API", "Python", "Google Cloud BigQuery"]
  },
  "BigQuery MCP Agent": {
    why: "Bridges the gap between autonomous LLMs and corporate databases using the Model Context Protocol (MCP) to supply real-time database context on demand.",
    how: "LLM Client ➔ MCP Client Tool Call ➔ MCP Server Execution ➔ BigQuery SQL Run ➔ Context Injected",
    patterns: ["Model Context Protocol (MCP)", "Context-Aware Query Injection", "Secure API Credentials"],
    tech: ["Python", "MCP SDK", "Google Cloud BigQuery", "FastAPI"]
  },
  "Gemini Enterprise ADK Sales Agent": {
    why: "Secures enterprise data boundaries while enabling sales representatives to interact dynamically with complex CRM and ERP datasets using secure natural language templates.",
    how: "Sales Representative ➔ Gemini Enterprise Gate ➔ ADK Sales Agent ➔ Enterprise Data Pipeline",
    patterns: ["Secure Agent-to-Database Delegation", "Dynamic CRM Synchronization", "Enterprise Guardrails"],
    tech: ["Python", "Vertex AI Agent Engine", "Google ADK", "Enterprise Security"]
  },
  "GraphRAG with BigQuery": {
    why: "Solves standard Vector Search limitations (loss of global relationships) by merging Graph structures with BigQuery Vector storage to extract multi-degree entity insights.",
    how: "Entity Extraction ➔ Graph Database Node ➔ BigQuery Vector Embeddings ➔ Deep-Context Answer",
    patterns: ["Graph Retrieval-Augmented Generation", "Multi-hop Knowledge Retrieval", "Graph Schema Modeling"],
    tech: ["Jupyter Notebook", "BigQuery GraphRAG", "Vector Search Embeddings"]
  },
  "LLM RAG React App": {
    why: "An end-to-end full-stack showcase designed to demonstrate secure, production-grade enterprise RAG deployment using scalable cloud backends.",
    how: "React App ➔ Firebase Authentication ➔ Flask API Server ➔ Langchain RAG Execution ➔ Vertex AI",
    patterns: ["End-to-End User Authentication", "Prompt Flow Management", "Enterprise Rate Limiting"],
    tech: ["TypeScript", "React", "Python", "Flask", "Langchain", "Firebase", "Vertex AI"]
  },
  "Nix Harness": {
    why: "Prevents development-time dependency drift by providing an isolated, highly reproducible nix-shell configuration to run and test AI agent loops safely.",
    how: "nix-shell Config ➔ Sandboxed Dependencies ➔ Harness Runner ➔ Secure Local Evaluation",
    patterns: ["Deterministic Development Environment", "Sandboxed Execution Loops", "Reproducible builds"],
    tech: ["Nix-shell", "Python", "Agent Testing Frameworks", "Sandbox Isolation"]
  },
  "Terraform BigQuery Streaming Demo": {
    why: "Automates the provisioning of low-latency, real-time GCP data pipelines to ensure highly reliable IaC infrastructure deployments with zero manual errors.",
    how: "Terraform HCL ➔ Google Cloud Provider ➔ Pub/Sub Topic ➔ BigQuery Write Stream Ingestion",
    patterns: ["Infrastructure as Code (IaC)", "Real-time Ingestion Architectures", "Least Privilege IAM Access"],
    tech: ["HashiCorp Terraform (HCL)", "Google Pub/Sub", "BigQuery Streaming", "GCP IAM"]
  },
  "Vertex AI RAG App": {
    why: "Demonstrates production-scale RAG architecture leveraging Google Cloud's enterprise-grade search APIs for highly scalable, real-time document retrieval.",
    how: "User Query ➔ Vertex AI Search ➔ Multi-Document Retrieval ➔ In-Context Gemini Synthesis",
    patterns: ["Enterprise Vector Search", "Cloud Document Ingestion", "Grounding Checks"],
    tech: ["Python", "Vertex AI Vector Search", "GCP Cloud Console", "Streamlit"]
  }
};

const SKILLS_EXTENSIONS = [
  {
    id: "python-ext",
    name: "Python Platform Development",
    publisher: "abhijitdc",
    description: "Advanced system engineering, asynchronous pipelines, robust unit-testing, and database APIs.",
    rating: "5.0",
    version: "v3.12.0",
    icon: <FaPython style={{ color: '#3776AB' }} size={20} />,
    downloads: "2.4M",
    installed: true
  },
  {
    id: "gcp-ext",
    name: "Google Cloud Engineering (GCP)",
    publisher: "abhijitdc",
    description: "Enterprise data architecture, BigQuery GraphRAG, Vertex AI ADK, and serverless server management.",
    rating: "5.0",
    version: "v5.2.0",
    icon: <SiGooglecloud style={{ color: '#4285F4' }} size={20} />,
    downloads: "1.9M",
    installed: true
  },
  {
    id: "terraform-ext",
    name: "Terraform IaC (Infrastructure)",
    publisher: "hashicorp",
    description: "Multi-service GCP deployments, modular schemas, IAM secure roles, and robust state pipelines.",
    rating: "4.9",
    version: "v1.7.0",
    icon: <SiTerraform style={{ color: '#844FBA' }} size={20} />,
    downloads: "1.2M",
    installed: true
  },
  {
    id: "react-ext",
    name: "React 19 & TypeScript App Suite",
    publisher: "facebook",
    description: "High-performance modular UI, responsive IDE styling, dynamic layouts, and type-safe data schemas.",
    rating: "4.8",
    version: "v19.2.0",
    icon: <FaReact style={{ color: '#61DAFB' }} size={20} />,
    downloads: "3.2M",
    installed: true
  }
];

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [activeSidebar, setActiveSidebar] = useState('explorer'); // 'explorer' | 'search' | 'extensions'
  const [expandedDirs, setExpandedDirs] = useState({ projects: true, blog: true });
  
  // State for tabs
  const [openTabs, setOpenTabs] = useState([
    { id: 'about.md', type: 'about', title: 'about.md', data: null }
  ]);
  const [activeFileId, setActiveFileId] = useState('about.md');

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Terminal state
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([
    'abhijit@portfolio:~$ booting kernel...', 
    'abhijit@portfolio:~$ connected! Type "help" for commands.'
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current && terminalOpen) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, terminalOpen]);

  const toggleDir = (dir) => setExpandedDirs(prev => ({ ...prev, [dir]: !prev[dir] }));

  // Dynamic file opener
  const openFile = (id, type, title, data) => {
    // Check if tab is already open
    const isAlreadyOpen = openTabs.some(tab => tab.id === id);
    if (!isAlreadyOpen) {
      setOpenTabs(prev => [...prev, { id, type, title, data }]);
    }
    setActiveFileId(id);
  };

  const closeTab = (id, e) => {
    e.stopPropagation(); // prevent setting active tab while closing
    
    // Find index of tab to close
    const tabIndex = openTabs.findIndex(tab => tab.id === id);
    if (tabIndex === -1) return;

    const updatedTabs = openTabs.filter(tab => tab.id !== id);
    setOpenTabs(updatedTabs);

    // If closing the currently active tab
    if (activeFileId === id) {
      if (updatedTabs.length > 0) {
        // Switch to adjacent tab
        const nextActiveIndex = Math.min(tabIndex, updatedTabs.length - 1);
        setActiveFileId(updatedTabs[nextActiveIndex].id);
      } else {
        // If no tabs remain, open about.md as default
        setOpenTabs([{ id: 'about.md', type: 'about', title: 'about.md', data: null }]);
        setActiveFileId('about.md');
      }
    }
  };

  const getActiveFile = () => {
    return openTabs.find(tab => tab.id === activeFileId);
  };

  const handleTerminalCommand = (e) => {
    if (e.key === 'Enter') {
      const fullCmd = terminalInput.trim();
      const cmd = fullCmd.toLowerCase();
      let output = '';

      if (fullCmd) {
        setCommandHistory(prev => [...prev, fullCmd]);
        setHistoryIndex(-1);
      }
      
      if (cmd.startsWith('cat ')) {
        const fileParam = fullCmd.substring(4).trim();
        const fileParamLower = fileParam.toLowerCase();

        if (fileParamLower === 'about.md') {
          output = PROFILE.bio;
        } else if (fileParamLower === 'skills.md') {
          output = `ABHIJIT DATTA CHOWDHURY - CAPABILITIES & SKILLS MATRIX
======================================================

[PILLAR 1] AI PLATFORMS & AGENTIC ARCHITECTURES
----------------------------------------------
- Core: Multi-agent systems, context engineering, evaluation, inference optimization
- Tech: Vertex AI, Google ADK, LangGraph, Nvidia NeMo, Claude Code, Antigravity, GraphRAG

[PILLAR 2] CLOUD INFRASTRUCTURE & PLATFORM ENGINEERING
------------------------------------------------------
- Core: IaC, target-state enterprise architecture, managed PaaS services, chaos engineering
- Tech: Google Cloud (GCP), AWS, HashiCorp Terraform (HCL), Kubernetes (CKA), Knative, GKE

[PILLAR 3] DATA ENGINEERING & DISTRIBUTED SYSTEMS
-------------------------------------------------
- Core: Greenfield cloud data lakes, distributed telemetry streams, MDM lifecycles, ETL
- Tech: BigQuery, Dataproc, BigTable, Spark, Beam, Pub/Sub, AWS S3/EMR/Redshift, MapR, Hadoop

[PILLAR 4] LEADERSHIP, DELIVERY & PRODUCT STRATEGY
--------------------------------------------------
- Core: Cross-functional leadership (6-10+ engineers/vendors), technical mentoring, 
        roadmaps, partner vendor selection, executive communication, POC design
- Domains: Banking & Financial Services, Media/Streaming, Enterprise Cloud Platforms

[CERTIFICATIONS]
----------------
- Google Cloud Certified: Professional ML Engineer, Data Engineer, & Cloud Architect
- CKA: Certified Kubernetes Administrator
- MapR Certified Hadoop Administrator`;
        } else if (fileParamLower.startsWith('projects/') || fileParamLower.startsWith('blog/')) {
          const isProject = fileParamLower.startsWith('projects/');
          const searchName = fileParam.substring(isProject ? 9 : 5).trim();
          
          if (isProject) {
            const foundRepo = GITHUB_REPOS.find(r => r.name.toLowerCase() === searchName.toLowerCase());
            if (foundRepo) {
              const spec = PROJECT_SPECS[foundRepo.name];
              output = `[PROJECT] ${foundRepo.name}
Why: ${spec ? spec.why : foundRepo.description}
Architecture: ${spec ? spec.how : 'N/A'}
Tech Stack: ${spec ? spec.tech.join(', ') : foundRepo.tags.join(', ')}
Link: ${foundRepo.link}`;
            } else {
              output = `cat: projects/${searchName}: No such file or repository`;
            }
          } else {
            const foundPost = MEDIUM_POSTS.find(p => p.title.toLowerCase().includes(searchName.toLowerCase()));
            if (foundPost) {
              output = `[BLOG] ${foundPost.title}
Published: ${new Date(foundPost.date).toLocaleDateString()}
Excerpt: ${foundPost.excerpt}
Read Link: ${foundPost.link}`;
            } else {
              output = `cat: blog/${searchName}: No such file or blog post`;
            }
          }
        } else {
          output = `cat: ${fileParam}: No such file. Try: cat about.md, cat skills.md`;
        }
      } else {
        switch (cmd) {
          case 'help': 
            output = 'Available commands: whoami, skills, contact, ls, cat <filename>, clear, date'; 
            break;
          case 'whoami': 
            output = PROFILE.bio; 
            break;
          case 'skills': 
            output = 'Pillars: 1. AI & Agentic, 2. Cloud & Platforms, 3. Data & Distributed, 4. Leadership & Strategy | Cloud: GCP, AWS | AI: Google ADK, LangGraph, Vertex AI'; 
            break;
          case 'contact': 
            output = `GitHub: ${PROFILE.links.github} | LinkedIn: ${PROFILE.links.linkedin} | Medium: ${PROFILE.links.medium}`; 
            break;
          case 'date': 
            output = new Date().toString(); 
            break;
          case 'ls':
            output = `about.md
skills.md
projects/
  ${GITHUB_REPOS.map(r => r.name).join('\n  ')}
blog/
  ${MEDIUM_POSTS.map((p, i) => `blog-${i} ("${p.title.substring(0, 20)}...")`).join('\n  ')}`;
            break;
          case 'clear': 
            setTerminalHistory([]); 
            setTerminalInput(''); 
            return;
          case '': 
            return;
          default: 
            output = `bash: ${cmd}: command not found. Type "help" for a list of commands.`;
        }
      }
      
      setTerminalHistory(prev => [...prev, `abhijit@portfolio:~$ ${terminalInput}`, output]);
      setTerminalInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setTerminalInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setTerminalInput(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setTerminalInput('');
        }
      }
    }
  };

  const activeFile = getActiveFile();

  const renderActiveContent = () => {
    if (!activeFile) return null;

    if (activeFile.type === 'about') {
      return (
        <div className="modern-about animate-fade-in">
          {/* Full-width interactive Career Arc visual taking full precedence */}
          <div className="hero-full-width-visual animate-slide-up">
            <CareerArc />
          </div>

          {/* Below section: Bio description & competencies */}
          <div className="hero-bio-section animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <p className="hero-bio">{PROFILE.bio}</p>
            <div className="hero-badges">
              <span className="hero-badge"><SiGooglecloud style={{ color: '#4285F4' }} size={14} /> GenAI & GCP</span>
              <span className="hero-badge"><SiTerraform style={{ color: '#844FBA' }} size={14} /> IaC (Terraform)</span>
              <span className="hero-badge"><FaPython style={{ color: '#3776AB' }} size={14} /> Data Engineering</span>
              <span className="hero-badge"><Code size={14} style={{ color: '#61DAFB' }} /> Full-Stack RAG</span>
            </div>
          </div>

          {(() => {
            const featuredItem = MEDIUM_POSTS.find(post => post.title === 'Build a Gemini Agent Harness from Scratch with Nix-Shell Sandbox');
            if (!featuredItem) return null;
            return (
              <div className="featured-section animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="featured-title">Featured Highlight</h3>
                <div 
                  className="featured-card glass-panel" 
                  onClick={() => openFile('featured-blog', 'blog', 'featured-blog.md', featuredItem)}
                >
                  {featuredItem.image && (
                    <div className="featured-image">
                      <img src={`/images/${featuredItem.image}`} alt={featuredItem.title} />
                    </div>
                  )}
                  <div className="featured-content">
                    <h4>{featuredItem.title}</h4>
                    <p>{featuredItem.excerpt}</p>
                    <div className="featured-tags">
                      {featuredItem.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="modern-tag mini">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
          
          <div className="about-footer animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <span>🛠️ Engineered and autonomously maintained via <a href="https://github.com/All-Hands-AI/OpenHands" target="_blank" rel="noopener noreferrer" className="footer-link">OpenHands Software Factory</a></span>
          </div>
        </div>
      );
    }

    if (activeFile.type === 'skills_doc') {
      return (
        <div className="modern-detail animate-fade-in" style={{ padding: '40px' }}>
          <div className="detail-card glass-panel animate-slide-up" style={{ padding: '40px' }}>
            <div className="readme-header-badge">📄 README.md ➔ skills.md</div>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--text-primary)', marginBottom: '15px' }}>Engineering Capabilities & Skills</h2>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '35px' }}>
              With over 20 years of hands-on experience, my background spans deep technical expertise as an individual contributor, platform architect, and engineering manager. Below is a structured view of my capabilities across key professional pillars.
            </p>

            {/* Pillar 1 */}
            <div className="readme-section-title" style={{ marginTop: '25px' }}>
              <Code size={18} style={{ color: 'var(--accent-blue)' }} /> 1. AI Platforms & Agentic Architectures
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '15px' }}>
              Leading-edge expertise in building multi-agent workflows, model evaluation, and inference optimization frameworks. Deep hands-on experience designing robust generative AI platform strategies, agentic systems, and high-performance inference pipelines.
            </p>
            <div className="readme-specs-grid" style={{ marginBottom: '30px' }}>
              <div className="spec-item">
                <div className="spec-label">Core Capabilities</div>
                <div className="spec-value" style={{ color: 'var(--text-primary)' }}>Multi-agent systems, context engineering, semantic layers, evaluation frameworks, trajectory validation, inference optimization (latency/throughput), open vs. closed model strategy</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Tools & Frameworks</div>
                <div className="spec-value" style={{ color: 'var(--text-primary)' }}>Vertex AI, Google Agent Development Kit (ADK), LangGraph, Claude Code, Antigravity, Nvidia NeMo & Nemotron, Vector databases, GraphRAG, Prompt engineering</div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="readme-section-title">
              <TerminalIcon size={18} style={{ color: 'var(--accent-blue)' }} /> 2. Cloud Infrastructure & Platform Engineering
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '15px' }}>
              Decades of experience architecting highly scalable target-state cloud systems, internal PaaS offerings, managed services, and automated CI/CD and GitOps environments.
            </p>
            <div className="readme-specs-grid" style={{ marginBottom: '30px' }}>
              <div className="spec-item">
                <div className="spec-label">Core Capabilities</div>
                <div className="spec-value" style={{ color: 'var(--text-primary)' }}>Infrastructure as Code (IaC), target-state enterprise architecture, managed platform services, chaos engineering, container orchestration, GitOps automation</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Tools & Infrastructure</div>
                <div className="spec-value" style={{ color: 'var(--text-primary)' }}>Google Cloud Platform (GCP), AWS, HashiCorp Terraform (HCL), Kubernetes (CKA), Knative/Cloud Run, GKE, Jenkins BlueOcean, CI/CD pipelines</div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="readme-section-title">
              <BookOpen size={18} style={{ color: 'var(--accent-blue)' }} /> 3. Data Engineering & Distributed Systems
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '15px' }}>
              Extensive background designing greenfield cloud data lakes, distributed real-time telemetry platforms, and Master Data Management (MDM) integrations at enterprise scale.
            </p>
            <div className="readme-specs-grid" style={{ marginBottom: '30px' }}>
              <div className="spec-item">
                <div className="spec-label">Core Capabilities</div>
                <div className="spec-value" style={{ color: 'var(--text-primary)' }}>Greenfield cloud data lakes, distributed telemetry streams, MDM lifecycles, data quality guardrails, data modeling, batch & real-time ETL pipelines</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Tools & Big Data</div>
                <div className="spec-value" style={{ color: 'var(--text-primary)' }}>BigQuery, Dataproc, BigTable, Apache Spark, Apache Beam, Pub/Sub, AWS EMR/Redshift/Athena/Spectrum/Glue, MapR, Hadoop, Redis, Python, Java, Scala, Bash</div>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="readme-section-title">
              <Puzzle size={18} style={{ color: 'var(--accent-blue)' }} /> 4. Engineering Leadership, Delivery & Strategy
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '15px' }}>
              Proven track record managing cross-functional engineering and operations teams. Skilled in bridging the gap between business strategy, customer feedback, and technical execution.
            </p>
            <div className="readme-specs-grid" style={{ marginBottom: '35px' }}>
              <div className="spec-item">
                <div className="spec-label">Leadership Capabilities</div>
                <div className="spec-value" style={{ color: 'var(--text-primary)' }}>Cross-functional engineering leadership, technical mentoring, executive stakeholder management, roadmaps & milestones, partner vendor selection, POC design</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Industry & Domains</div>
                <div className="spec-value" style={{ color: 'var(--text-primary)' }}>Banking & Financial Services, Media, Entertainment & Subscription Streaming, and Enterprise Cloud Platforms</div>
              </div>
            </div>

            <div className="readme-section-title">
              <FileText size={18} style={{ color: 'var(--accent-blue)' }} /> Industry Certifications
            </div>
            <ul style={{ listStyle: 'none', color: 'var(--text-primary)', padding: 0 }}>
              <li style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--accent-blue)' }}>✔</span>
                <span>Google Cloud Certified Professional Machine Learning Engineer</span>
              </li>
              <li style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--accent-blue)' }}>✔</span>
                <span>Google Cloud Certified Professional Data Engineer</span>
              </li>
              <li style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--accent-blue)' }}>✔</span>
                <span>Google Cloud Certified Professional Architect</span>
              </li>
              <li style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--accent-blue)' }}>✔</span>
                <span>CKA: Certified Kubernetes Administrator</span>
              </li>
              <li style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--accent-blue)' }}>✔</span>
                <span>MapR Certified Hadoop Administrator</span>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    if (activeFile.type === 'project') {
      const spec = PROJECT_SPECS[activeFile.data.name];
      return (
        <div className="modern-detail animate-fade-in">
          <div className="detail-card glass-panel animate-slide-up">
            <div className="readme-header-badge">📄 README.md ➔ projects/{activeFile.data.name.toLowerCase().replace(/ /g, '-')}</div>
            
            {/* Procedural SVG System Architecture Minimap instead of static image */}
            <ArchitectureMinimap file={activeFile} />
            
            <div className="detail-header">
              <h2>{activeFile.data.name}</h2>
              <a href={activeFile.data.link} target="_blank" rel="noopener noreferrer" className="action-btn primary-btn">
                View Source <ExternalLink size={16} />
              </a>
            </div>
            
            <div className="detail-meta">
              <span className="meta-item">🕒 Last Updated: {new Date(activeFile.data.updated_at).toLocaleDateString()}</span>
            </div>

            <div className="detail-tags">
              {activeFile.data.tags.map(tag => (
                <span key={tag} className="modern-tag">
                  {getFileIcon([tag])} {tag}
                </span>
              ))}
            </div>

            {/* Virtual README specification section */}
            <div className="virtual-readme">
              <div>
                <div className="readme-section-title">🚀 Why It Was Built (The Mission)</div>
                <p className="detail-body">{spec ? spec.why : activeFile.data.description}</p>
              </div>

              {spec && (
                <>
                  <div>
                    <div className="readme-section-title">⛓️ Architectural Flow (The "How")</div>
                    <div className="architecture-diagram-container">
                      {spec.how.split(' ➔ ').map((item, idx, arr) => (
                        <span key={idx}>
                          <span className="architecture-box">{item}</span>
                          {idx < arr.length - 1 && <span className="architecture-arrow"> ➔ </span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="readme-section-title">📦 Repository Contents & Core Patterns</div>
                    <div className="readme-specs-grid">
                      <div className="spec-item">
                        <div className="spec-label">Technical Stack</div>
                        <div className="spec-value">{spec.tech.join(', ')}</div>
                      </div>
                      <div className="spec-item">
                        <div className="spec-label">Key Engineering Patterns</div>
                        <div className="spec-value">{spec.patterns.join(' | ')}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (activeFile.type === 'blog') {
      return (
        <div className="modern-detail animate-fade-in">
          <div className="detail-card glass-panel animate-slide-up">
            <div className="readme-header-badge">📄 BLOG_POST.md ➔ blog/{activeFile.title}</div>
            
            {/* Procedural SVG System Architecture Minimap instead of static image */}
            <ArchitectureMinimap file={activeFile} />
            
            <div className="detail-header">
              <h2>{activeFile.data.title}</h2>
              <a href={activeFile.data.link} target="_blank" rel="noopener noreferrer" className="action-btn primary-btn">
                Read Full Article <ExternalLink size={16} />
              </a>
            </div>
            
            <div className="detail-meta">
              <span className="meta-item">📅 Published: {new Date(activeFile.data.date).toLocaleDateString()}</span>
            </div>

            <div className="detail-tags">
              {activeFile.data.tags.map(tag => (
                <span key={tag} className="modern-tag">
                  {getFileIcon([tag])} {tag}
                </span>
              ))}
            </div>
            
            <div>
              <div className="readme-section-title">📝 Article Introduction & Summary</div>
              <p className="detail-body">{activeFile.data.excerpt}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  // Perform search queries across repositories and blog posts
  const getSearchResults = () => {
    if (!searchQuery) return { repos: [], blogs: [] };
    const query = searchQuery.toLowerCase();
    
    const matchedRepos = GITHUB_REPOS.filter(repo => {
      const spec = PROJECT_SPECS[repo.name] || {};
      return (
        repo.name.toLowerCase().includes(query) ||
        (repo.description && repo.description.toLowerCase().includes(query)) ||
        (spec.why && spec.why.toLowerCase().includes(query)) ||
        repo.tags.some(tag => tag.toLowerCase().includes(query))
      );
    });

    const matchedBlogs = MEDIUM_POSTS.filter(post => {
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    });

    return { repos: matchedRepos, blogs: matchedBlogs };
  };

  const { repos: searchRepos, blogs: searchBlogs } = getSearchResults();

  return (
    <div className="ide-layout">
      {/* Activity Bar (Far Left Icon Strip) */}
      <aside className="activity-bar">
        <div className="activity-icons">
          <div 
            className={`activity-icon-btn ${activeSidebar === 'explorer' ? 'active' : ''}`}
            onClick={() => setActiveSidebar('explorer')}
            title="Explorer"
          >
            <Files size={22} />
          </div>
          <div 
            className={`activity-icon-btn ${activeSidebar === 'search' ? 'active' : ''}`}
            onClick={() => setActiveSidebar('search')}
            title="Search"
          >
            <Search size={22} />
          </div>
          <div 
            className={`activity-icon-btn ${activeSidebar === 'extensions' ? 'active' : ''}`}
            onClick={() => setActiveSidebar('extensions')}
            title="Skills & Extensions"
          >
            <Puzzle size={22} />
          </div>
        </div>
        <div className="activity-icons">
          <div 
            className="activity-icon-btn" 
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'} 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </div>
          <div className="activity-icon-btn" title="Toggle Terminal" onClick={() => setTerminalOpen(!terminalOpen)}>
            <TerminalIcon size={20} />
          </div>
        </div>
      </aside>

      {/* Primary Sidebar (Explorer or Search or Extensions) */}
      <aside className="sidebar">
        {/* Explorer Panel */}
        {activeSidebar === 'explorer' && (
          <>
            <div className="sidebar-header">
              <div className="profile-mini">
                <img src={profileImage} alt={PROFILE.name} className="avatar-mini" />
                <div>
                  <div className="name">{PROFILE.name}</div>
                </div>
              </div>
            </div>
            
            <div className="sidebar-section">
              <div className="section-title">EXPLORER</div>
              <ul className="file-tree">
                <li className={`tree-node ${activeFileId === 'about.md' ? 'active-node' : ''}`} onClick={() => openFile('about.md', 'about', 'about.md', null)}>
                  <FileText size={14} /> about.md
                </li>

                <li className={`tree-node ${activeFileId === 'skills.md' ? 'active-node' : ''}`} onClick={() => openFile('skills.md', 'skills_doc', 'skills.md', null)}>
                  <FileText size={14} style={{ color: '#4CAF50' }} /> skills.md
                </li>
                
                {/* Projects Dir */}
                <li>
                  <div className="tree-dir" onClick={() => toggleDir('projects')}>
                    {expandedDirs.projects ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    {expandedDirs.projects ? <FolderOpen size={14} style={{color: '#dcb67a'}}/> : <Folder size={14} style={{color: '#dcb67a'}}/>}
                    projects
                  </div>
                  {expandedDirs.projects && (
                    <ul className="tree-children">
                      {GITHUB_REPOS.map(repo => (
                        <li key={repo.name} className={`tree-node ${activeFileId === repo.name ? 'active-node' : ''}`} onClick={() => openFile(repo.name, 'project', repo.name, repo)} title={repo.name}>
                          <span className="file-icon-mini">{getFileIcon(repo.tags)}</span> <span className="file-label">{repo.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Blog Dir */}
                <li>
                  <div className="tree-dir" onClick={() => toggleDir('blog')}>
                    {expandedDirs.blog ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    {expandedDirs.blog ? <FolderOpen size={14} style={{color: '#dcb67a'}}/> : <Folder size={14} style={{color: '#dcb67a'}}/>}
                    blog
                  </div>
                  {expandedDirs.blog && (
                    <ul className="tree-children">
                      {MEDIUM_POSTS.map((post, i) => {
                        const shortName = post.title.length > 25 ? post.title.substring(0, 25) + '...' : post.title;
                        const fileId = `blog-${i}`;
                        return (
                          <li key={i} className={`tree-node ${activeFileId === fileId ? 'active-node' : ''}`} onClick={() => openFile(fileId, 'blog', shortName, post)} title={post.title}>
                            <FileText size={14} style={{color: '#519aba'}}/> <span className="file-label">{shortName}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </>
        )}

        {/* Search Panel */}
        {activeSidebar === 'search' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="search-box">
              <div className="section-title" style={{ paddingLeft: 0, paddingBottom: '8px' }}>SEARCH</div>
              <div className="search-input-container">
                <Search size={14} className="search-icon-inside" />
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search projects, technologies..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            
            <div className="search-results">
              {searchQuery === '' ? (
                <div className="search-no-results">Type above to search keywords, tags, languages, or project descriptions...</div>
              ) : (searchRepos.length === 0 && searchBlogs.length === 0) ? (
                <div className="search-no-results">No results found matching "{searchQuery}"</div>
              ) : (
                <>
                  {searchRepos.length > 0 && (
                    <div className="search-result-group">
                      <div className="search-result-group-title">Projects ({searchRepos.length})</div>
                      {searchRepos.map(repo => (
                        <div 
                          key={repo.name} 
                          className="search-result-item"
                          onClick={() => openFile(repo.name, 'project', repo.name, repo)}
                        >
                          <span className="file-icon-mini">{getFileIcon(repo.tags)}</span>
                          <span className="file-label" style={{ maxWidth: '200px' }}>{repo.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchBlogs.length > 0 && (
                    <div className="search-result-group">
                      <div className="search-result-group-title">Blog posts ({searchBlogs.length})</div>
                      {searchBlogs.map((post, i) => {
                        const idx = MEDIUM_POSTS.indexOf(post);
                        const shortName = post.title.length > 25 ? post.title.substring(0, 25) + '...' : post.title;
                        return (
                          <div 
                            key={i} 
                            className="search-result-item"
                            onClick={() => openFile(`blog-${idx}`, 'blog', shortName, post)}
                          >
                            <FileText size={14} style={{ color: '#519aba' }} />
                            <span className="file-label" style={{ maxWidth: '200px' }}>{shortName}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Extensions Panel */}
        {activeSidebar === 'extensions' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
            <div style={{ padding: '15px 15px 0' }}>
              <div className="section-title" style={{ paddingLeft: 0 }}>TECHNICAL EXTENSIONS (SKILLS)</div>
            </div>
            <div className="extensions-list">
              {SKILLS_EXTENSIONS.map(ext => (
                <div key={ext.id} className="extension-card">
                  <div className="extension-icon">{ext.icon}</div>
                  <div className="extension-info">
                    <div className="extension-name-row">
                      <div className="extension-name" title={ext.name}>{ext.name}</div>
                      <div className="extension-badge">Installed</div>
                    </div>
                    <div className="extension-publisher">by {ext.publisher}</div>
                    <div className="extension-desc">{ext.description}</div>
                    <div className="extension-meta">
                      <span>⭐ {ext.rating}</span>
                      <span>⬇️ {ext.downloads}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Workspace */}
      <main className="workspace">
        {/* Tab Bar Container (VS Code Tabs) */}
        <div className="tabs-container">
          {openTabs.map(tab => (
            <div 
              key={tab.id} 
              className={`tab-item ${activeFileId === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFileId(tab.id)}
            >
              {tab.type === 'about' && <FileText size={14} />}
              {tab.type === 'skills_doc' && <FileText size={14} style={{ color: '#4CAF50' }} />}
              {tab.type === 'project' && <span style={{ display: 'inline-flex' }}>{getFileIcon(tab.data.tags)}</span>}
              {tab.type === 'blog' && <FileText size={14} style={{ color: '#519aba' }} />}
              <span className="tab-title">{tab.title.length > 15 ? tab.title.substring(0, 15) + '...' : tab.title}</span>
              <span className="tab-close" onClick={(e) => closeTab(tab.id, e)}>
                <X size={12} />
              </span>
            </div>
          ))}
        </div>

        {/* Breadcrumb / Title Bar */}
        <div className="title-bar">
          <div className="breadcrumb">
            <span className="crumb">~</span>
            <span className="crumb-separator">/</span>
            {activeFile?.type === 'about' && <span className="crumb active">about.md</span>}
            {activeFile?.type === 'skills_doc' && <span className="crumb active">skills.md</span>}
            {activeFile?.type === 'project' && (
              <>
                <span className="crumb">projects</span>
                <span className="crumb-separator">/</span>
                <span className="crumb active">{activeFile.title}</span>
              </>
            )}
            {activeFile?.type === 'blog' && (
              <>
                <span className="crumb">blog</span>
                <span className="crumb-separator">/</span>
                <span className="crumb active">{activeFile.title}</span>
              </>
            )}
          </div>

          {/* Collaborative IDE Profile Status Badge */}
          <div className="title-bar-profile">
            <img src={profileImage} alt={PROFILE.name} className="title-profile-avatar" />
            <div className="title-profile-info">
              <span className="title-profile-name">{PROFILE.name}</span>
              <span className="title-profile-title">{PROFILE.title}</span>
            </div>
            <div className="title-profile-socials">
              <a href={PROFILE.links.github} target="_blank" rel="noopener noreferrer" className="title-social-icon" title="GitHub">
                <FaGithub size={14} />
              </a>
              <a href={PROFILE.links.linkedin} target="_blank" rel="noopener noreferrer" className="title-social-icon" title="LinkedIn">
                <FaLinkedin size={14} />
              </a>
              <a href={PROFILE.links.medium} target="_blank" rel="noopener noreferrer" className="title-social-icon" title="Medium">
                <BookOpen size={14} />
              </a>
              <a href={PROFILE.links.twitter} target="_blank" rel="noopener noreferrer" className="title-social-icon" title="Twitter/X">
                <FaTwitter size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area" style={{ height: terminalOpen ? 'calc(100% - 250px)' : 'calc(100% - 40px)' }}>
          {renderActiveContent()}
        </div>
        
        {/* Terminal Drawer (doubles as status bar when closed) */}
        <div className={`terminal-drawer ${terminalOpen ? 'open' : 'closed'}`}>
          <div className="terminal-header" onClick={() => setTerminalOpen(!terminalOpen)}>
            <div className="term-title">
              <TerminalIcon size={16} style={{marginRight: '8px'}}/> 
              {terminalOpen ? 'TERMINAL' : 'CLICK TO OPEN TERMINAL'}
            </div>
            <div className="term-status-info">
              {!terminalOpen && (
                <>
                  <Code size={14} style={{marginRight: '5px'}}/> main*
                  <span style={{margin: '0 15px', color: '#555'}}>|</span>
                  <span>{PROFILE.title}</span>
                  <span style={{margin: '0 15px', color: '#555'}}>|</span>
                  <a href="https://github.com/All-Hands-AI/OpenHands" target="_blank" rel="noopener noreferrer" style={{ color: '#9cdcfe', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }} title="Maintained by OpenHands Software Factory">
                    🤖 OpenHands Factory
                  </a>
                </>
              )}
            </div>
            <div className="term-actions">
              {terminalOpen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </div>
          </div>
          {terminalOpen && (
            <div className="terminal-body" onClick={() => document.getElementById('term-input').focus()}>
              {terminalHistory.map((line, i) => (
                <div key={i} className="term-line" style={{ whiteSpace: 'pre-wrap' }}>{line}</div>
              ))}
              <div className="term-input-line">
                <span className="prompt">abhijit@portfolio:~$</span>
                <input 
                  id="term-input"
                  type="text" 
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleTerminalCommand}
                  autoComplete="off"
                  spellCheck="false"
                />
                <span className="cursor"></span>
              </div>
              <div ref={terminalEndRef} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
