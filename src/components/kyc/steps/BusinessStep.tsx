import React, { useState } from 'react';

interface BusinessInfo {
  businessType: string;
  industry: string;
  websiteUrl: string;
  productDescription: string;
}

interface BusinessStepProps {
  userData?: {
    business?: BusinessInfo;
    metadata?: {
      lastUpdatedDate: string;
    };
  };
}

const BusinessStep: React.FC<BusinessStepProps> = ({ userData }) => {
  const [formData, setFormData] = useState<BusinessInfo>({
    businessType: userData?.business?.businessType || '',
    industry: userData?.business?.industry || '',
    websiteUrl: userData?.business?.websiteUrl || '',
    productDescription: userData?.business?.productDescription || '',
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

  const formatBusinessType = (type: string): string => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatIndustry = (industry: string): string => {
    return industry.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };



  const renderField = (
    fieldName: keyof BusinessInfo,
    label: string,
    value: string,
    isTextarea: boolean = false
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
            {isTextarea ? (
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
                  minHeight: '80px',
                  boxSizing: 'border-box',
                  margin: '0 8px'
                }}
              />
            ) : fieldName === 'businessType' ? (
              <select
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
              >
                <option value="">Select business type</option>
                <option value="sole_proprietorship">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="llc">LLC</option>
                <option value="corporation">Corporation</option>
                <option value="s_corporation">S Corporation</option>
                <option value="non_profit">Non Profit</option>
              </select>
            ) : fieldName === 'industry' ? (
              <select
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
              >
                <option value="">Select industry</option>
                <option value="technology">Technology</option>
                <option value="retail">Retail</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="real_estate">Real Estate</option>
                <option value="food_beverage">Food & Beverage</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
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

  return (
    <div>

                  {renderField('businessType', 'Business type', formatBusinessType(formData.businessType))}
      {renderField('industry', 'Industry', formatIndustry(formData.industry))}
      {renderField('websiteUrl', 'Website URL', formData.websiteUrl)}
                  {renderField('productDescription', 'Product description', formData.productDescription, true)}
    </div>
  );
};

export default BusinessStep; 