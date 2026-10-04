import React, { useState, useRef, useEffect } from 'react';
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown, Code, Terminal as TerminalIcon, Maximize2, Minimize2, ExternalLink, BookOpen } from 'lucide-react';
import { FaPython, FaReact, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiGooglecloud, SiTerraform, SiTypescript } from 'react-icons/si';
import { PROFILE, MEDIUM_POSTS, GITHUB_REPOS } from './data';
import profileImage from './assets/images/github_avatar.png';

const getFileIcon = (tags = []) => {
  const tagStr = tags.join(' ').toLowerCase();
  if (tagStr.includes('python')) return <FaPython style={{ color: '#3776AB' }} />;
  if (tagStr.includes('typescript') || tagStr.includes('ts')) return <SiTypescript style={{ color: '#3178C6' }} />;
  if (tagStr.includes('react')) return <FaReact style={{ color: '#61DAFB' }} />;
  if (tagStr.includes('terraform') || tagStr.includes('hcl')) return <SiTerraform style={{ color: '#844FBA' }} />;
  if (tagStr.includes('google') || tagStr.includes('bigquery') || tagStr.includes('gcp')) return <SiGooglecloud style={{ color: '#4285F4' }} />;
  return <FileText size={14} style={{ color: '#ccc' }}/>;
};

function App() {
  const [expandedDirs, setExpandedDirs] = useState({ projects: true, blog: true, skills: false });
  // Instead of an array of tabs, we just track the currently active file. Default to about.md.
  const [activeFile, setActiveFile] = useState({ id: 'about.md', type: 'about', title: 'about.md', data: null });
  
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState(['abhijit@portfolio:~$ booting kernel...', 'abhijit@portfolio:~$ connected! Type "help" for commands.']);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current && terminalOpen) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, terminalOpen]);

  const toggleDir = (dir) => setExpandedDirs(prev => ({ ...prev, [dir]: !prev[dir] }));

  const openFile = (id, type, title, data) => {
    setActiveFile({ id, type, title, data });
  };

  const handleTerminalCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.trim().toLowerCase();
      let output = '';
      
      switch (cmd) {
        case 'help': output = 'Available commands: whoami, skills, contact, clear, date'; break;
        case 'whoami': output = PROFILE.bio; break;
        case 'skills': output = 'Python, TypeScript, React, Google Cloud, Terraform, BigQuery'; break;
        case 'contact': output = `GitHub: ${PROFILE.links.github} | LinkedIn: ${PROFILE.links.linkedin}`; break;
        case 'date': output = new Date().toString(); break;
        case 'clear': 
          setTerminalHistory([]); 
          setTerminalInput(''); 
          return;
        case '': return;
        default: output = `bash: ${cmd}: command not found`;
      }
      
      setTerminalHistory(prev => [...prev, `abhijit@portfolio:~$ ${terminalInput}`, output]);
      setTerminalInput('');
    }
  };

  const renderActiveContent = () => {
    // Fallback if somehow activeFile is null, though it shouldn't be.
    if (!activeFile || activeFile.type === 'about') {
      return (
        <div className="modern-about animate-fade-in">
          <div className="hero-section animate-slide-up">
            <div className="hero-avatar-container">
               <img src={profileImage} alt={PROFILE.name} className="hero-avatar" />
            </div>
            <div className="hero-text">
               <h1 className="hero-name">{PROFILE.name}</h1>
               <h2 className="hero-title">{PROFILE.title}</h2>
               <p className="hero-bio">{PROFILE.bio}</p>
            </div>
          </div>
          
          <div className="social-links animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <a href={PROFILE.links.github} target="_blank" rel="noopener noreferrer" className="social-btn github">
              <FaGithub size={20} /> <span>GitHub</span>
            </a>
            <a href={PROFILE.links.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn linkedin">
              <FaLinkedin size={20} /> <span>LinkedIn</span>
            </a>
            <a href={PROFILE.links.medium} target="_blank" rel="noopener noreferrer" className="social-btn medium">
              <BookOpen size={20} /> <span>Medium</span>
            </a>
            <a href={PROFILE.links.twitter} target="_blank" rel="noopener noreferrer" className="social-btn twitter">
              <FaTwitter size={20} /> <span>Twitter</span>
            </a>
          </div>

          {/* Featured Section */}
          {(() => {
            const featuredItem = MEDIUM_POSTS.find(post => post.title === 'Build a Gemini Agent Harness from Scratch with Nix-Shell Sandbox');
            if (!featuredItem) return null;
            return (
              <div className="featured-section animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="featured-title">Featured Highlight</h3>
                <div 
                  className="featured-card glass-panel" 
                  onClick={() => openFile('featured-blog', 'blog', featuredItem.title, featuredItem)}
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
        </div>
      );
    }

    if (activeFile.type === 'project' || activeFile.type === 'blog') {
      const isBlog = activeFile.type === 'blog';
      return (
        <div className="modern-detail animate-fade-in">
          <div className="detail-card glass-panel animate-slide-up">
            {activeFile.data.image && (
              <div className="detail-hero-image">
                <img src={`/images/${activeFile.data.image}`} alt={activeFile.title} />
              </div>
            )}
            <div className="detail-header">
              <h2>{activeFile.data.title || activeFile.data.name}</h2>
              <a href={activeFile.data.link} target="_blank" rel="noopener noreferrer" className="action-btn primary-btn">
                {isBlog ? 'Read Full Article' : 'View Source'} <ExternalLink size={16} />
              </a>
            </div>
            
            <div className="detail-meta">
              {isBlog ? (
                <span className="meta-item">📅 Published: {new Date(activeFile.data.date).toLocaleDateString()}</span>
              ) : (
                <span className="meta-item">🕒 Updated: {new Date(activeFile.data.updated_at).toLocaleDateString()}</span>
              )}
            </div>

            <div className="detail-tags">
              {activeFile.data.tags.map(tag => (
                <span key={tag} className="modern-tag">
                  {getFileIcon([tag])} {tag}
                </span>
              ))}
            </div>
            
            <div className="detail-body">
              <p>{isBlog ? activeFile.data.excerpt : (activeFile.data.description || 'No description provided.')}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="ide-layout">
      {/* Sidebar */}
      <aside className="sidebar">
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
            <li className={`tree-node ${activeFile?.id === 'about.md' ? 'active-node' : ''}`} onClick={() => openFile('about.md', 'about', 'about.md', null)}>
              <FileText size={14} /> about.md
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
                    <li key={repo.name} className={`tree-node ${activeFile?.id === repo.name ? 'active-node' : ''}`} onClick={() => openFile(repo.name, 'project', repo.name, repo)} title={repo.name}>
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
                    return (
                      <li key={i} className={`tree-node ${activeFile?.id === `blog-${i}` ? 'active-node' : ''}`} onClick={() => openFile(`blog-${i}`, 'blog', shortName, post)} title={post.title}>
                        <FileText size={14} style={{color: '#519aba'}}/> <span className="file-label">{shortName}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="workspace">
        {/* Breadcrumb / Title Bar */}
        <div className="title-bar">
          <div className="breadcrumb">
            <span className="crumb">~</span>
            <span className="crumb-separator">/</span>
            {activeFile?.type === 'about' && <span className="crumb active">about.md</span>}
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
                <div key={i} className="term-line">{line}</div>
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
