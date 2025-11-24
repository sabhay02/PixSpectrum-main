// ContributorPresenter.jsx
import React, { useEffect, useState } from 'react';
import { Linkedin } from 'lucide-react';

// LinkedIn icon using lucide-react
const LinkedInIcon = () => (
    <Linkedin 
        size={20}
        style={{ 
            color: '#ffffff',
            display: 'block'
        }}  
    />
);

const GitHubIcon = () => (
    <img src="https://pngimg.com/uploads/github/github_PNG80.png" alt="GitHub" style={{ 
        width: '20px', 
        height: '20px', 
        filter: 'brightness(0) invert(1)' // Makes the icon white for dark background
    }}  />
);

const ContributorPresenter = ({ contributor }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Update `isMobile` state on window resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: isMobile ? '20px' : '24px',
            textAlign: 'center',
            width: isMobile ? '100%' : 'auto',
            minWidth: isMobile ? 'auto' : '220px',
            maxWidth: '280px',
            margin: isMobile ? '0 auto' : '0',
            boxSizing: 'border-box',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'default',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)';
        }}
        >
            <img src={contributor.imagePath} alt={contributor.name} style={{
                width: isMobile ? '100px' : '120px',
                height: isMobile ? '100px' : '120px', 
                borderRadius: '50%',
                objectFit: 'cover',
                margin: '0 auto 16px',
                display: 'block',
                border: '3px solid #f1f5f9',
            }} />
            <h3 style={{
                fontSize: isMobile ? '1.1em' : '1.25em',
                color: '#1e293b',
                fontWeight: '600',
                margin: '0 0 6px 0',
                letterSpacing: '-0.01em',
            }}>
                {contributor.name}
            </h3>
            <p style={{ 
                margin: '0 0 8px 0', 
                color: '#64748b',
                fontSize: '0.9em',
            }}>
                {contributor.rollNum}
            </p> 
            <p style={{ 
                margin: '0 0 20px 0', 
                color: '#6366f1',
                fontSize: '0.95em',
                fontWeight: '500',
            }}>
                {contributor.role}
            </p>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
            }}>
                <a href={contributor.linkedInUrl} target="_blank" rel="noopener noreferrer" style={{
                    padding: '10px',
                    backgroundColor: '#0077b5',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s ease, transform 0.2s ease',
                    width: '40px',
                    height: '40px',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#005885';
                    e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#0077b5';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
                >
                    <LinkedInIcon />
                </a>
                <a href={contributor.githubUrl} target="_blank" rel="noopener noreferrer" style={{
                    padding: '10px',
                    backgroundColor: '#24292e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s ease, transform 0.2s ease',
                    width: '40px',
                    height: '40px',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1a1e22';
                    e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#24292e';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
                >
                    <GitHubIcon />
                </a>
            </div>
        </div>
    );
};

export default ContributorPresenter;