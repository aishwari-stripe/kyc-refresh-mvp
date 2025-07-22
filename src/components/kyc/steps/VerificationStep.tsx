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
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "We're processing your information",
    "We're verifying your details",
    "We're retrieving the results"
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
        const next = prev + 1;
        if (next >= messages.length) {
          clearInterval(messageInterval);
          // Auto-advance to success step after all messages
          setTimeout(() => {
            onComplete?.();
          }, 500);
          return prev;
        }
        return next;
      });
    }, 800); // Change message every 800ms

    return () => clearInterval(messageInterval);
  }, [onComplete]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 0'
    }}>
      {/* Large Spinner */}
      <div style={{
        width: '60px',
        height: '60px',
        border: '4px solid #FEF3E2',
        borderTop: '4px solid #F59E0B',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '32px'
      }} />

      {/* Message */}
      <h2 style={{
        font: '600 24px/32px var(--font-family-system)',
        color: '#1A1F2E',
        margin: '0 0 16px 0'
      }}>
        {messages[currentMessage]}
      </h2>

      <p style={{
        font: '400 16px/24px var(--font-family-system)',
        color: '#6C7689',
        margin: '0',
        maxWidth: '400px'
      }}>
        Please wait while we securely review and confirm your information. This process ensures your account remains compliant and protected.
      </p>
    </div>
  );
};

export default VerificationStep; 