import React from 'react';
import { UserData } from '../KYCRefreshModal';

interface ContextStepProps {
  userData?: UserData;
}

const ContextStep: React.FC<ContextStepProps> = ({
  userData,
}) => {
  return (
    <div className="kyc-step context-step">
      <h2 style={{
        font: '600 24px/32px var(--font-family-system)',
        color: '#1A1F2E',
        margin: '0 0 24px 0'
      }}>
        Let's keep your information current
      </h2>
      
      <div className="step-content">
        <p className="context-explanation">
          We know that businesses are always evolving—teams grow, locations change, and services expand. To best support your next chapter, it's important to ensure the information we have on file is current.
        </p>
        
        <hr style={{
          border: 'none',
          height: '1px',
          backgroundColor: '#E4E7EC',
          margin: '24px 0'
        }} />
        
        <p className="context-explanation">
          This quick review is an important step that helps you:
        </p>
        
        <ol className="context-list" style={{
          paddingLeft: '20px',
          margin: '16px 0',
          color: '#1A1F2E',
          font: '400 16px/24px var(--font-family-system)'
        }}>
          <li style={{ marginBottom: '8px' }}>Protect your account and your business from fraud.</li>
          <li style={{ marginBottom: '8px' }}>Ensure your service continues seamlessly and without interruption.</li>
          <li style={{ marginBottom: '8px' }}>Meet today's standards for financial security.</li>
        </ol>
        
        <p className="context-explanation">
          You'll find the process is straightforward and secure. It should only take a few minutes of your time, and all information you provide is fully encrypted.
        </p>
      </div>
    </div>
  );
};

export default ContextStep; 