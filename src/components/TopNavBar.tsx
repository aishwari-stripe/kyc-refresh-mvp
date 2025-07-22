import React from 'react';
import { RiskProfile, EntityType } from './kyc/KYCRefreshModal';

interface TopNavBarProps {
  riskProfile: RiskProfile;
  entityType: EntityType;
  onRiskProfileChange: (risk: RiskProfile) => void;
  onEntityTypeChange: (entity: EntityType) => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({
  riskProfile,
  entityType,
  onRiskProfileChange,
  onEntityTypeChange,
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
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      gap: '32px',
      boxShadow: '0 2px 8px rgba(26, 31, 46, 0.08)'
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
          Risk Profile:
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
          Entity Type:
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
  );
};

export default TopNavBar; 