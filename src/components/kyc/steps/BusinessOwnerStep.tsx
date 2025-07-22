import React, { useState } from 'react';

interface BusinessOwnerInfo {
  ownerName: string;
  ownerTitle: string;
  ownerEmail: string;
}

interface BusinessOwnerStepProps {
  userData?: {
    businessOwner?: BusinessOwnerInfo;
    metadata?: {
      lastUpdatedDate: string;
    };
  };
}

const BusinessOwnerStep: React.FC<BusinessOwnerStepProps> = ({ userData }) => {
  const [formData, setFormData] = useState<BusinessOwnerInfo>({
    ownerName: userData?.businessOwner?.ownerName || '',
    ownerTitle: userData?.businessOwner?.ownerTitle || '',
    ownerEmail: userData?.businessOwner?.ownerEmail || '',
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');
  const [verifyingField, setVerifyingField] = useState<string | null>(null);
  const [successField, setSuccessField] = useState<string | null>(null);

  const handleEdit = (fieldName: string, currentValue: string) => {
    setEditingField(fieldName);
    setTempValue(currentValue);
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleSave = async (fieldName: string) => {
    setEditingField(null);
    setVerifyingField(fieldName);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: tempValue
    }));
    
    setVerifyingField(null);
    setSuccessField(fieldName);
    
    // Clear success message after 2 seconds
    setTimeout(() => {
      setSuccessField(null);
    }, 2000);
  };



  const renderField = (
    fieldName: keyof BusinessOwnerInfo,
    label: string,
    value: string
  ) => {
    const isEditing = editingField === fieldName;
    const isVerifying = verifyingField === fieldName;
    const isSuccess = successField === fieldName;

    return (
      <div style={{
        backgroundColor: '#F9FAFB',
        border: '1px solid #E4E7EC',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        position: 'relative'
      }}>
        <div style={{
          font: '600 14px/20px var(--font-family-system)',
          color: '#1A1F2E',
          marginBottom: '2px'
        }}>
          {label}
        </div>

        {isEditing ? (
          <div style={{ padding: '4px' }}>
            <input
              type={fieldName === 'ownerEmail' ? 'email' : 'text'}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              style={{
                width: 'calc(100% - 16px)',
                padding: '8px 12px',
                border: '1px solid #D2D6DC',
                borderRadius: '4px',
                font: '400 14px/20px var(--font-family-system)',
                boxSizing: 'border-box',
                margin: '0 8px'
              }}
            />
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', paddingLeft: '8px' }}>
              <button
                onClick={() => handleSave(fieldName)}
                style={{
                  backgroundColor: '#635BFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  font: '500 14px/20px var(--font-family-system)',
                  cursor: 'pointer'
                }}
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                style={{
                  backgroundColor: 'transparent',
                  color: '#6C7689',
                  border: '1px solid #D2D6DC',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  font: '500 14px/20px var(--font-family-system)',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : isVerifying ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid #E4E7EC',
              borderTop: '2px solid #635BFF',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <span style={{
              font: '400 14px/20px var(--font-family-system)',
              color: '#6C7689'
            }}>
              Verifying changes...
            </span>
          </div>
        ) : isSuccess ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.5 4.5L6 12L2.5 8.5"
                stroke="#18954D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{
              font: '400 14px/20px var(--font-family-system)',
              color: '#18954D'
            }}>
              Changes verified successfully
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '20px' }}>
            <div style={{
              font: '400 14px/20px var(--font-family-system)',
              color: '#1A1F2E',
              whiteSpace: 'pre-line'
            }}>
              {value || 'Not provided'}
            </div>
            <button
              onClick={() => handleEdit(fieldName, value)}
              style={{
                backgroundColor: 'transparent',
                color: '#635BFF',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                font: '500 14px/20px var(--font-family-system)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>

      <div style={{
        backgroundColor: '#E9F5FF',
        border: '1px solid #BFDFFF',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: '2px', flexShrink: 0 }}>
          <circle cx="8" cy="8" r="8" fill="#1A7BFF"/>
          <path d="M8 3.5V8.5M8 11.5H8.01" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <div style={{
          font: '400 14px/20px var(--font-family-system)',
          color: '#0057CC'
        }}>
          Verifying who owns and controls the business is a key regulatory step that protects your account from fraud.
        </div>
      </div>

      {renderField('ownerName', 'Beneficial owners', formData.ownerName)}
    </div>
  );
};

export default BusinessOwnerStep; 