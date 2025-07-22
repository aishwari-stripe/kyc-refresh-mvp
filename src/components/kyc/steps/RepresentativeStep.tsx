import React, { useState } from 'react';

interface RepresentativeInfo {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
}

interface RepresentativeStepProps {
  userData?: {
    representative?: RepresentativeInfo;
    metadata?: {
      lastUpdatedDate: string;
    };
  };
}

const RepresentativeStep: React.FC<RepresentativeStepProps> = ({ userData }) => {
  const [formData, setFormData] = useState<RepresentativeInfo>({
    firstName: userData?.representative?.firstName || '',
    lastName: userData?.representative?.lastName || '',
    phone: userData?.representative?.phone || '',
    address: userData?.representative?.address || '',
    city: userData?.representative?.city || '',
    state: userData?.representative?.state || '',
    zipCode: userData?.representative?.zipCode || '',
    email: userData?.representative?.email || '',
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
    fieldName: keyof RepresentativeInfo,
    label: string,
    value: string,
    isAddress: boolean = false
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
            {isAddress ? (
              <textarea
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                style={{
                  width: 'calc(100% - 16px)',
                  padding: '8px 12px',
                  border: '1px solid #D2D6DC',
                  borderRadius: '4px',
                  font: '400 14px/20px var(--font-family-system)',
                  resize: 'vertical',
                  minHeight: '60px',
                  boxSizing: 'border-box',
                  margin: '0 8px'
                }}
              />
            ) : (
              <input
                type="text"
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
            )}
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
              color: '#1A1F2E'
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

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();
  const fullAddress = [formData.address, formData.city, formData.state, formData.zipCode]
    .filter(Boolean)
    .join(', ');

  return (
    <div>

      {renderField('firstName', 'Representative name', fullName)}
      {renderField('phone', 'Representative phone', formData.phone)}
      {renderField('address', 'Representative address', fullAddress, true)}
    </div>
  );
};

export default RepresentativeStep; 