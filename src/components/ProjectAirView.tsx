import React from 'react';
import { getAssetPath } from '../utils/assets';

const ProjectAirView: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
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

      {/* Right Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header (Search Bar) */}
        <div style={{
          backgroundColor: '#F5F6F8',
          padding: '12px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E5E7EB'
        }}>
          {/* Search Bar */}
          <div style={{
            position: 'relative',
            width: '400px'
          }}>
            <div style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF',
              fontSize: '16px'
            }}>
              🔍
            </div>
            <input
              type="text"
              placeholder=""
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                font: '400 14px/20px var(--font-family-system)',
                outline: 'none'
              }}
            />
          </div>

          {/* Right Icons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <img 
              src={getAssetPath('/help.svg')} 
              alt="Help" 
              style={{ 
                width: '20px', 
                height: '20px',
                cursor: 'pointer',
                opacity: 0.7
              }} 
            />
            <img 
              src={getAssetPath('/notifications.svg')} 
              alt="Notifications" 
              style={{ 
                width: '20px', 
                height: '20px',
                cursor: 'pointer',
                opacity: 0.7
              }} 
            />
            <img 
              src={getAssetPath('/settings.svg')} 
              alt="Settings" 
              style={{ 
                width: '20px', 
                height: '20px',
                cursor: 'pointer',
                opacity: 0.7
              }} 
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{
          flex: 1,
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
        {/* Top Row - 3 Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '24px',
          height: '320px'
        }}>
          {/* First Grey Placeholder Card */}
          <div style={{
            backgroundColor: '#F5F6F8',
            borderRadius: '12px'
          }} />

          {/* Second Grey Placeholder Card */}
          <div style={{
            backgroundColor: '#F5F6F8',
            borderRadius: '12px'
          }} />

          {/* Active Gradient Card */}
          <div style={{
            background: 'linear-gradient(135deg, #FFE4E1 0%, #F8BBD9 50%, #E1C3FC 100%)',
            borderRadius: '12px',
            padding: '32px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
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
              font: '500 12px/16px var(--font-family-system)'
            }}>
              + New
            </div>

            {/* Main Content */}
            <div style={{ marginTop: '16px' }}>
              <h1 style={{
                font: '700 24px/32px var(--font-family-system)',
                color: '#1A1F2E',
                margin: '0 0 24px 0'
              }}>
                Start your 2025 account check-in
              </h1>

              {/* Form Fields */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '24px'
              }}>
                <div style={{
                  height: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '4px',
                  width: '100%'
                }} />
                <div style={{
                  height: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '4px',
                  width: '85%'
                }} />
                <div style={{
                  height: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '4px',
                  width: '70%'
                }} />
                <div style={{
                  height: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '4px',
                  width: '60%'
                }} />
              </div>
            </div>

            {/* Start Button */}
            <button style={{
              backgroundColor: '#1A1F2E',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              font: '600 14px/20px var(--font-family-system)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              alignSelf: 'flex-start'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#2A2F3E';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#1A1F2E';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              Start
            </button>
          </div>
        </div>

        {/* Bottom Row - Large Grey Placeholder Card */}
        <div style={{
          backgroundColor: '#F5F6F8',
          borderRadius: '12px',
          height: '280px'
        }} />
        </div>
      </div>
    </div>
  );
};

export default ProjectAirView;
