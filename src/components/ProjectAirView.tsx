import React from 'react';

const ProjectAirView: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", "Roboto", "Ubuntu", sans-serif',
      paddingTop: '80px', // Account for top nav
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Minimal indicator for Project AIR - can be removed later */}
      <div style={{
        textAlign: 'center',
        color: '#6C7689',
        font: '400 16px/24px var(--font-family-system)'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          ✈️
        </div>
        <h2 style={{
          font: '600 24px/32px var(--font-family-system)',
          color: '#1A1F2E',
          margin: '0 0 8px 0'
        }}>
          Project AIR
        </h2>
        <p style={{
          margin: '0',
          opacity: 0.7
        }}>
          Coming soon...
        </p>
      </div>
    </div>
  );
};

export default ProjectAirView;
