import React, { useState } from 'react';
import { Award, Briefcase, MapPin, Code } from 'lucide-react';

const DATASET = {
  "roles": [
    { "title": "Software Developer",          "start": 2003.25, "end": 2004.33, "leadPct": 0,  "country": "India",         "period": "Apr 2003 – May 2004", "style": "solid" },
    { "title": "Product Specialist",          "start": 2004.33, "end": 2007.50, "leadPct": 15, "country": "India",         "period": "May 2004 – Jun 2007", "style": "solid" },
    { "title": "Senior Technical Consultant", "start": 2007.50, "end": 2011.00, "leadPct": 30, "country": "United States", "period": "Jul 2007 – Dec 2010", "style": "solid" },
    { "title": "Engineering Manager",         "start": 2011.00, "end": 2013.33, "leadPct": 75, "country": "United States", "period": "Jan 2011 – Apr 2013", "style": "solid" },
    { "title": "Project Manager",             "start": 2013.33, "end": 2015.00, "leadPct": 90, "country": "United States", "period": "May 2013 – Jan 2015", "style": "solid" },
    { "title": "Senior Engineer (Team Lead)", "start": 2015.00, "end": 2018.08, "leadPct": 40, "country": "United States", "period": "Jan 2015 – Jan 2018", "style": "solid" },
    { "title": "Engineering Lead",            "start": 2018.08, "end": 2019.08, "leadPct": 55, "country": "United States", "period": "Feb 2018 – Feb 2019", "style": "solid" },
    { "title": "Lead Data Engineer",          "start": 2019.08, "end": 2019.33, "leadPct": 30, "country": "Australia",     "period": "Feb 2019 – May 2019", "style": "solid" },
    { "title": "Data Engineering Manager",    "start": 2019.33, "end": 2019.75, "leadPct": 80, "country": "Australia",     "period": "May 2019 – Oct 2019", "style": "solid" },
    { "title": "Enterprise Architect",        "start": 2019.75, "end": 2021.17, "leadPct": 55, "country": "Australia",     "period": "Oct 2019 – Mar 2021", "style": "ring"  },
    { "title": "Solution Architect",          "start": 2021.17, "end": 2025.08, "leadPct": 35, "country": "Australia",     "period": "Mar 2021 – Feb 2025", "style": "ring"  },
    { "title": "Data & AI Specialist",        "start": 2025.08, "end": null,    "leadPct": 25, "country": "United States", "period": "Feb 2025 – Present",  "style": "ring"  }
  ],
  "countries": [
    { "label": "India",         "start": 2003.25, "end": 2007.50 },
    { "label": "United States", "start": 2007.50, "end": 2019.08 },
    { "label": "Australia",     "start": 2019.08, "end": 2025.08 },
    { "label": "USA",           "start": 2025.08, "end": null }
  ]
};

const computeCurrentYear = () => {
  const now = new Date();
  return now.getFullYear() + (now.getMonth() + 0.5) / 12;
};

const getProgressionNote = (role) => {
  if (role.style === 'ring') {
    return {
      icon: <Award size={13} style={{ marginRight: '5px', flexShrink: 0 }} />,
      text: "Strategic advisory and system design chapter. Combines technical architect authority with broad cross-functional alignment."
    };
  }
  if (role.leadPct >= 50) {
    return {
      icon: <Briefcase size={13} style={{ marginRight: '5px', flexShrink: 0 }} />,
      text: "Leadership & team management chapter. Accountable for process scalability, team enablement, and high-impact delivery."
    };
  }
  return {
    icon: <Code size={13} style={{ marginRight: '5px', flexShrink: 0 }} />,
    text: "Hands-on engineering foundation. Establishes the deep system and software knowledge that informs subsequent architecture design."
  };
};

export default function CareerArc() {
  const [activeIdx, setActiveIdx] = useState(DATASET.roles.length - 1); // Default active is the current role
  const [currentYear] = useState(computeCurrentYear);

  // Dimensions & Grid
  const width = 1000;
  const height = 420;
  const paddingLeft = 95;
  const paddingRight = 30;
  const paddingTop = 45;
  const paddingBottom = 45;

  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  const xMin = 2003.25;
  const xMax = currentYear;

  // Scales
  const xScale = (val) => {
    return paddingLeft + ((val - xMin) / (xMax - xMin)) * plotWidth;
  };

  const yScale = (val) => {
    return paddingTop + plotHeight - (val / 100) * plotHeight;
  };

  const y50 = yScale(50);

  // Keyboard navigation
  const handleKeyDown = (e, idx) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (idx + 1) % DATASET.roles.length;
      setActiveIdx(nextIdx);
      document.getElementById(`hit-zone-${nextIdx}`)?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (idx - 1 + DATASET.roles.length) % DATASET.roles.length;
      setActiveIdx(prevIdx);
      document.getElementById(`hit-zone-${prevIdx}`)?.focus();
    }
  };

  // 1. Generate line path D and fill path D
  const generatePaths = () => {
    let strokePath = "";
    const roles = DATASET.roles;

    for (let i = 0; i < roles.length; i++) {
      const curr = roles[i];
      const x1 = xScale(curr.start);
      const x2 = xScale(curr.end || currentYear);
      const y1 = yScale(curr.leadPct);

      if (i === 0) {
        strokePath += `M ${x1} ${y1}`;
      }

      if (i < roles.length - 1) {
        const next = roles[i + 1];
        const y2 = yScale(next.leadPct);
        const xb = xScale(curr.end); // Boundary line

        const w1 = x2 - x1;
        const w2 = xScale(next.end || currentYear) - xScale(next.start);

        const d1 = Math.min(w1 * 0.28, 14);
        const d2 = Math.min(w2 * 0.28, 14);

        strokePath += ` L ${xb - d1} ${y1}`;
        strokePath += ` C ${xb} ${y1}, ${xb} ${y2}, ${xb + d2} ${y2}`;
      } else {
        strokePath += ` L ${x2} ${y1}`;
      }
    }

    // Close path for fill (clipped separately above and below center 50%)
    const fillPath = `${strokePath} L ${xScale(currentYear)} ${y50} L ${xScale(xMin)} ${y50} Z`;

    return { strokePath, fillPath };
  };

  const { strokePath, fillPath } = generatePaths();

  const activeRole = DATASET.roles[activeIdx];

  return (
    <div className="career-arc-wrapper glass-panel animate-slide-up" style={{ animationDelay: '0.15s' }}>
      <div className="career-arc-header">
        <div>
          <h3 className="career-arc-title">Career Arc</h3>
          <p className="career-arc-subtitle">
            Balancing hands-on execution, people management, and architectural leadership across 23+ years and 3 countries.
          </p>
          <div className="career-arc-highlights">
            <span className="highlight-tag">23+ Years Experience</span>
            <span className="highlight-separator">•</span>
            <span className="highlight-tag">3 Countries</span>
            <span className="highlight-separator">•</span>
            <span className="highlight-tag">Hands-on Technology Depth & Leadership Breadth</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="career-arc-legend">
          <div className="legend-item">
            <span className="legend-dot warm"></span>
            <span>Leadership / Mgmt</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot cool"></span>
            <span>Individual Contributor</span>
          </div>
          <div className="legend-item">
            <span className="legend-ring"></span>
            <span>Architectural & Advisory</span>
          </div>
        </div>
      </div>

      {/* SVG Plot */}
      <div className="career-arc-chart-container">
        <svg viewBox={`0 0 ${width} ${height}`} className="career-arc-svg" width="100%" height="100%">
          <defs>
            {/* Clamping paths for above and below 50% line */}
            <clipPath id="clip-top-half">
              <rect x="0" y="0" width={width} height={y50} />
            </clipPath>
            <clipPath id="clip-bottom-half">
              <rect x="0" y={y50} width={width} height={height - y50} />
            </clipPath>

            {/* Gradient for fill above 50% centerline */}
            <linearGradient id="warm-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-warm)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent-warm)" stopOpacity="0.0" />
            </linearGradient>

            {/* Gradient for fill below 50% centerline */}
            <linearGradient id="cool-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-cool)" stopOpacity="0.0" />
              <stop offset="100%" stopColor="var(--accent-cool)" stopOpacity="0.25" />
            </linearGradient>

            {/* Main Stroke Gradient */}
            <linearGradient id="stroke-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-warm)" />
              <stop offset="45%" stopColor="var(--accent-warm)" />
              <stop offset="55%" stopColor="var(--accent-cool)" />
              <stop offset="100%" stopColor="var(--accent-cool)" />
            </linearGradient>
          </defs>

          {/* Background Country Bands */}
          {DATASET.countries.map((country, idx) => {
            const x1 = xScale(country.start);
            const x2 = xScale(country.end || currentYear);
            const w = x2 - x1;
            const isHoveredCountry = activeRole && activeRole.country === country.label;

            return (
              <g key={idx}>
                {/* Visual Band */}
                <rect 
                  x={x1} 
                  y={paddingTop} 
                  width={w} 
                  height={plotHeight} 
                  className={`country-band ${isHoveredCountry ? 'active' : ''}`}
                />
                {/* Vertical Divider */}
                {country.end && (
                  <line 
                    x1={x2} 
                    y1={paddingTop} 
                    x2={x2} 
                    y2={paddingTop + plotHeight} 
                    className="country-band-divider"
                  />
                )}
                {/* Country label */}
                <text 
                  x={x1 + w / 2} 
                  y={paddingTop - 15} 
                  className={`country-label ${isHoveredCountry ? 'active' : ''}`}
                  textAnchor="middle"
                >
                  {country.label.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* Y-Axis Horizontal Guidelines */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const y = yScale(tick);
            const isCenter = tick === 50;
            return (
              <g key={tick}>
                <line 
                  x1={paddingLeft} 
                  y1={y} 
                  x2={width - paddingRight} 
                  y2={y} 
                  className={isCenter ? "y-grid-line centerline" : "y-grid-line"}
                />
                {/* Y-Axis Labels */}
                <text 
                  x={paddingLeft - 12} 
                  y={y + 4} 
                  className="y-axis-label"
                  textAnchor="end"
                >
                  {tick === 100 ? "100% Leader" : tick === 50 ? "50/50 Hybrid" : tick === 0 ? "100% IC" : `${tick}/${100 - tick}`}
                </text>
              </g>
            );
          })}

          {/* X-Axis Year Labels */}
          {[2004, 2007, 2010, 2013, 2016, 2019, 2022, 2025].map((year) => {
            const x = xScale(year);
            return (
              <g key={year}>
                <line 
                  x1={x} 
                  y1={paddingTop + plotHeight} 
                  x2={x} 
                  y2={paddingTop + plotHeight + 6} 
                  className="x-axis-tick"
                />
                <text 
                  x={x} 
                  y={paddingTop + plotHeight + 22} 
                  className="x-axis-label"
                  textAnchor="middle"
                >
                  {year}
                </text>
              </g>
            );
          })}

          {/* 2. Closed Fill path for Warm/Cool gradient with Clamping */}
          <path d={fillPath} fill="url(#warm-gradient)" clipPath="url(#clip-top-half)" className="fill-area-top" />
          <path d={fillPath} fill="url(#cool-gradient)" clipPath="url(#clip-bottom-half)" className="fill-area-bottom" />

          {/* 3. Main Plateaus & Transition Curves line */}
          <path d={strokePath} fill="none" stroke="url(#stroke-gradient)" strokeWidth="3" className="main-curve-stroke" />

          {/* 4. Role Interactive Midpoint Markers */}
          {DATASET.roles.map((role, idx) => {
            const x1 = xScale(role.start);
            const x2 = xScale(role.end || currentYear);
            const xMid = (x1 + x2) / 2;
            const y = yScale(role.leadPct);
            const isActive = activeIdx === idx;

            const isWarm = role.leadPct >= 50;
            const markerColor = isWarm ? 'var(--accent-warm)' : 'var(--accent-cool)';

            if (role.style === 'ring') {
              return (
                <circle 
                  key={idx}
                  cx={xMid} 
                  cy={y} 
                  r={isActive ? 8 : 5.5} 
                  className={`role-marker ring ${isActive ? 'active' : ''}`}
                  stroke={markerColor}
                  strokeWidth="2.5"
                />
              );
            } else {
              return (
                <circle 
                  key={idx}
                  cx={xMid} 
                  cy={y} 
                  r={isActive ? 8 : 6} 
                  className={`role-marker solid ${isActive ? 'active' : ''}`}
                  fill={markerColor}
                />
              );
            }
          })}

          {/* 5. Invisible full-width touch hit zones for ultra-easy interactivity */}
          {DATASET.roles.map((role, idx) => {
            const x1 = xScale(role.start);
            const x2 = xScale(role.end || currentYear);
            const w = x2 - x1;

            return (
              <rect
                key={idx}
                id={`hit-zone-${idx}`}
                x={x1}
                y={paddingTop}
                width={w}
                height={plotHeight}
                fill="transparent"
                className="chart-hit-zone"
                tabIndex={0}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              />
            );
          })}
        </svg>
      </div>

      {/* Floating Detail Tooltip Card */}
      {activeRole && (
        <div className="career-arc-detail-card animate-fade-in">
          <div className="detail-card-header">
            <div className="detail-role-title">
              <Briefcase size={16} className="card-icon" />
              <span>{activeRole.title}</span>
            </div>
            <div className="detail-location-badge">
              <MapPin size={12} style={{ marginRight: '3px' }} />
              {activeRole.country}
            </div>
          </div>

          <div className="detail-timeframe">
            <span>📅 {activeRole.period}</span>
          </div>

          {/* Two-tone split progress bar */}
          <div className="ratio-container">
            <div className="ratio-labels">
              <span className="ratio-label-ic">
                {100 - activeRole.leadPct}% Individual Contributor
              </span>
              <span className="ratio-label-lead">
                {activeRole.leadPct}% Leadership / Mgmt
              </span>
            </div>
            
            <div className="ratio-track">
              <div 
                className="ratio-bar-ic" 
                style={{ width: `${100 - activeRole.leadPct}%` }}
                title="Hands-on/Tech Execution"
              ></div>
              <div 
                className="ratio-bar-lead" 
                style={{ width: `${activeRole.leadPct}%` }}
                title="Management & Leadership Influence"
              ></div>
            </div>
          </div>

          {/* Contextual career progression note */}
          {(() => {
            const note = getProgressionNote(activeRole);
            return (
              <div className="detail-advisory-hint animate-fade-in" key={activeRole.title}>
                {note.icon}
                <span>{note.text}</span>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
