import React from 'react';
import { UserData } from '../KYCRefreshModal';

interface SuccessStepProps {
  userData?: UserData;
}

const SuccessStep: React.FC<SuccessStepProps> = ({
  userData: _userData,
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 0'
    }}>
      {/* Large Checkmark */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#10B981',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '32px',
        boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
            fill="white"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Success Message */}
      <h2 style={{
        font: '600 24px/32px var(--font-family-system)',
        color: '#1A1F2E',
        margin: '0 0 16px 0'
      }}>
        Your information is up to date
      </h2>

      <p style={{
        font: '400 16px/24px var(--font-family-system)',
        color: '#6C7689',
        margin: '0',
        maxWidth: '400px',
        lineHeight: '1.6'
      }}>
        Thank you for taking the time to confirm your details. This helps us continue providing you with secure, reliable service and ensures we can best support your business as it grows.
      </p>
    </div>
  );
};

export default SuccessStep; 