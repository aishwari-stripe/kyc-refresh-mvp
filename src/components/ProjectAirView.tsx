import React from 'react';

const ProjectAirView: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F8F9FA',
      fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", "Roboto", "Ubuntu", sans-serif',
      paddingTop: '52px', // Account for top nav
      display: 'flex'
    }}>
      {/* Left Sidebar */}
      <div style={{
        width: '250px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E4E7EC',
        padding: '20px 0',
        minHeight: 'calc(100vh - 52px)'
      }}>
        {/* Logo/Title */}
        <div style={{
          padding: '0 20px 20px 20px',
          borderBottom: '1px solid #F1F3F4',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#E8F5E8',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px'
            }}>
              🌵
            </div>
            <span style={{
              font: '600 16px/20px var(--font-family-system)',
              color: '#1A1F2E'
            }}>
              Cactus Practice
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ padding: '0 12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            borderRadius: '6px',
            backgroundColor: '#F4F3FF',
            border: '1px solid #E4E7EC',
            color: '#1A1F2E'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#635BFF',
              borderRadius: '50%'
            }} />
            <span style={{
              font: '500 14px/20px var(--font-family-system)'
            }}>
              Home
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        padding: '40px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%'
        }}>
          {/* Main Card */}
          <div style={{
            background: 'linear-gradient(135deg, #FFE4E1 0%, #F8BBD9 50%, #E1C3FC 100%)',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            position: 'relative'
          }}>
            {/* New Badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: '#FFFFFF',
              color: '#635BFF',
              padding: '4px 8px',
              borderRadius: '12px',
              font: '500 12px/16px var(--font-family-system)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              + New
            </div>

            {/* Main Content */}
            <div style={{ marginTop: '16px' }}>
              <h1 style={{
                font: '700 32px/40px var(--font-family-system)',
                color: '#1A1F2E',
                margin: '0 0 32px 0',
                maxWidth: '400px'
              }}>
                Start your 2025 account check-in
              </h1>

              {/* Form Fields */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '32px'
              }}>
                <div style={{
                  height: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '6px',
                  width: '100%'
                }} />
                <div style={{
                  height: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '6px',
                  width: '85%'
                }} />
                <div style={{
                  height: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '6px',
                  width: '70%'
                }} />
                <div style={{
                  height: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '6px',
                  width: '60%'
                }} />
              </div>

              {/* Start Button */}
              <button style={{
                backgroundColor: '#1A1F2E',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                font: '600 16px/24px var(--font-family-system)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(26, 31, 46, 0.2)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#2A2F3E';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(26, 31, 46, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#1A1F2E';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(26, 31, 46, 0.2)';
              }}>
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAirView;
