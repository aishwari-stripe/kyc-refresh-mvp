import React, { useState, useEffect } from 'react';
import { UserData } from '../KYCRefreshModal';

interface VerificationStepProps {
  userData?: UserData;
  onComplete?: () => void;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
  userData: _userData,
  onComplete,
}) => {
  const [currentStage, setCurrentStage] = useState(0);

  const messages = [
    "Processing your details",
    "Verifying your information"
  ];

  useEffect(() => {
    // Stage 1: 0-1.5s
    const stage1Timer = setTimeout(() => {
      setCurrentStage(1);
    }, 1500);

    // Complete after 3s total
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 3000);

    return () => {
      clearTimeout(stage1Timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Stage 1: Form processing skeletons (4 bars)
  const renderStage1Skeletons = () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      {[75, 60, 85, 70].map((width, index) => (
        <div
          key={index}
          style={{
            width: `${width}%`,
            height: [16, 20, 18, 22][index] + 'px',
            backgroundColor: '#E5E7EB',
            background: 'linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%)',
            backgroundSize: '200px 100%',
            borderRadius: '4px',
            marginBottom: '12px',
            position: 'relative',
            overflow: 'hidden',
            opacity: 0,
            animation: `fadeInSkeleton 0.3s ease-out ${index * 0.15}s forwards, shimmer 2s infinite linear`
          }}
        />
      ))}
    </div>
  );

  // Stage 2: Verification result skeletons (3 boxes)
  const renderStage2Skeletons = () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      {[90, 65, 80].map((width, index) => (
        <div
          key={index}
          style={{
            width: `${width}%`,
            height: [24, 20, 18][index] + 'px',
            backgroundColor: '#E5E7EB',
            background: 'linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%)',
            backgroundSize: '200px 100%',
            borderRadius: '4px',
            marginBottom: '12px',
            position: 'relative',
            overflow: 'hidden',
            opacity: 0,
            animation: `fadeInSkeleton 0.3s ease-out ${index * 0.1}s forwards, shimmer 2s infinite linear`
          }}
        />
      ))}
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 0'
    }}>
      {/* Message */}
      <h2 style={{
        font: '600 24px/32px var(--font-family-system)',
        color: '#1A1F2E',
        margin: '0 0 32px 0',
        transition: 'all 0.3s ease-out',
        textAlign: 'center'
      }}>
        {messages[currentStage]}
      </h2>

      {/* Skeleton Loading Area */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '120px'
      }}>
        {currentStage === 0 ? renderStage1Skeletons() : renderStage2Skeletons()}
      </div>

      <p style={{
        font: '400 16px/24px var(--font-family-system)',
        color: '#6C7689',
        margin: '32px 0 0 0',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        Please wait while we securely review and confirm your information. This process ensures your account remains compliant and protected.
      </p>
    </div>
  );
};

export default VerificationStep; 