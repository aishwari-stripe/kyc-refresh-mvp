import React from 'react';
import { RiskProfile, EntityType } from './kyc/KYCRefreshModal';

export type Phase = 'mvp' | 'project-air';

interface TopNavBarProps {
  riskProfile: RiskProfile;
  entityType: EntityType;
  selectedPhase: Phase;
  onRiskProfileChange: (risk: RiskProfile) => void;
  onEntityTypeChange: (entity: EntityType) => void;
  onPhaseChange: (phase: Phase) => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({
  riskProfile,
  entityType,
  selectedPhase,
  onRiskProfileChange,
  onEntityTypeChange,
  onPhaseChange,
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E4E7EC',
      padding: '12px 20px',
      zIndex: 10000, // Ensure it's above everything including modals
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(26, 31, 46, 0.08)',
      backdropFilter: 'blur(8px)', // Subtle glass effect to show it's above other content
      WebkitBackdropFilter: 'blur(8px)' // Safari support
    }}>
      {/* Left Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '32px'
      }}>
        {/* Logo/Title */}
        <div style={{
          font: '600 16px/20px var(--font-family-system)',
          color: '#1A1F2E',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ⚙️ Configuration
          <span style={{
            fontSize: '10px',
            color: '#6C7689',
            backgroundColor: '#F4F3FF',
            padding: '2px 6px',
            borderRadius: '8px',
            border: '1px solid #E4E7EC'
          }}>
            Conceptual view
          </span>
        </div>
        
        {/* Risk Profile Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <label style={{
            font: '500 14px/16px var(--font-family-system)',
            color: '#4F566B',
            whiteSpace: 'nowrap'
          }}>
            Risk profile:
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['low', 'standard', 'high'] as RiskProfile[]).map((risk) => (
              <button
                key={risk}
                onClick={() => onRiskProfileChange(risk)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: riskProfile === risk ? '2px solid #635BFF' : '1px solid #E4E7EC',
                  backgroundColor: riskProfile === risk ? '#F4F3FF' : '#FFFFFF',
                  color: riskProfile === risk ? '#635BFF' : '#4F566B',
                  font: '500 12px/16px var(--font-family-system)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize',
                  minWidth: '60px'
                }}
              >
                {risk}
              </button>
            ))}
          </div>
        </div>
        
        {/* Entity Type Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <label style={{
            font: '500 14px/16px var(--font-family-system)',
            color: '#4F566B',
            whiteSpace: 'nowrap'
          }}>
            Entity type:
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['individual', 'company'] as EntityType[]).map((entity) => (
              <button
                key={entity}
                onClick={() => onEntityTypeChange(entity)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: entityType === entity ? '2px solid #635BFF' : '1px solid #E4E7EC',
                  backgroundColor: entityType === entity ? '#F4F3FF' : '#FFFFFF',
                  color: entityType === entity ? '#635BFF' : '#4F566B',
                  font: '500 12px/16px var(--font-family-system)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize',
                  minWidth: '80px'
                }}
              >
                {entity}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Phase Dropdown */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <select
          value={selectedPhase}
          onChange={(e) => onPhaseChange(e.target.value as Phase)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: '1px solid #E4E7EC',
            backgroundColor: '#FFFFFF',
            color: '#4F566B',
            font: '500 12px/16px var(--font-family-system)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minWidth: '160px',
            outline: 'none'
          }}
        >
          <option value="mvp">Phase 1: MVP</option>
          <option value="project-air">Vision: Project AIR</option>
        </select>
      </div>
    </div>
  );
};

export default TopNavBar; 