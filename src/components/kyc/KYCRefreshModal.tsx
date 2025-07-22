import React, { useState, useMemo } from 'react';
import ContextStep from './steps/ContextStep';
import RepresentativeStep from './steps/RepresentativeStep';
import BusinessStep from './steps/BusinessStep';
import BusinessOwnerStep from './steps/BusinessOwnerStep';
import VerificationStep from './steps/VerificationStep';
import SuccessStep from './steps/SuccessStep';
import { getAssetPath } from '../../utils/assets';

import './KYCRefreshModal.css';

export interface UserData {
  representative: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    email: string;
  };
  business: {
    businessType: string;
    industry: string;
    websiteUrl: string;
    productDescription: string;
  };
  businessOwner: {
    ownerName: string;
    ownerTitle: string;
    ownerEmail: string;
  };
  metadata: {
    lastUpdatedDate: string;
  };
}

export type RiskProfile = 'low' | 'standard' | 'high';
export type EntityType = 'individual' | 'company';

interface StepConfig {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  includeInProgress?: boolean;
}

interface KYCRefreshModalProps {
  isOpen: boolean;
  onClose: () => void;
  riskProfile: RiskProfile;
  entityType: EntityType;
  userData?: UserData;
}

const KYCRefreshModal: React.FC<KYCRefreshModalProps> = ({
  isOpen,
  onClose,
  riskProfile: _riskProfile,
  entityType,
  userData,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Define steps based on entity type
  const steps: StepConfig[] = useMemo(() => {
    const baseSteps: StepConfig[] = [
      {
        id: 'context',
        title: 'Introduction',
        component: ContextStep,
        includeInProgress: false,
      },
      {
        id: 'representative',
        title: 'Personal Information',
        component: RepresentativeStep,
        includeInProgress: true,
      },
      {
        id: 'business',
        title: 'Business Information',
        component: BusinessStep,
        includeInProgress: true,
      },
    ];

    // Add Business Owner step only for companies
    if (entityType === 'company') {
      baseSteps.push({
        id: 'businessOwner',
        title: 'Business Owner',
        component: BusinessOwnerStep,
        includeInProgress: true,
      });
    }

    // Add verification step (not included in progress)
    baseSteps.push({
      id: 'verification',
      title: 'Verification',
      component: VerificationStep,
      includeInProgress: false,
    });

    // Add success step (included in progress)
    baseSteps.push({
      id: 'success',
      title: 'Complete',
      component: SuccessStep,
      includeInProgress: true,
    });

    return baseSteps;
  }, [entityType]);

  // Get steps that should be included in progress bar
  const progressSteps = useMemo(() => {
    return steps.filter(step => step.includeInProgress);
  }, [steps]);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleVerificationComplete = () => {
    handleNextStep();
  };

  const getCurrentStepGradient = () => {
    const step = steps[currentStep];
    switch (step.id) {
      case 'context':
        return `url(${getAssetPath('/gradient-illustration.png')})`;
      case 'representative':
        return 'linear-gradient(135deg, #635BFF 0%, #4F46E5 50%, #3B82F6 100%)';
      case 'business':
        return 'linear-gradient(135deg, #3B82F6 0%, #10B981 50%, #059669 100%)';
      case 'businessOwner':
        return 'linear-gradient(135deg, #10B981 0%, #14B8A6 50%, #0D9488 100%)';
      case 'verification':
        return 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #FDE047 100%)';
      case 'success':
        return `url(${getAssetPath('/success-illustration.png')})`;
      default:
        return 'linear-gradient(135deg, #635BFF 0%, #4F46E5 100%)';
    }
  };

  const getButtonText = () => {
    const step = steps[currentStep];
    if (step.id === 'context') return 'Get Started';
    if (step.id === 'success') return 'Continue to Dashboard';
    if (step.id === 'verification') return null; // No button for verification
    return 'Continue';
  };

  const getCurrentProgressStep = () => {
    // Find current step index in progress steps
    const currentStepConfig = steps[currentStep];
    if (!currentStepConfig.includeInProgress) {
      // If current step is not in progress, find the last progress step before it
      const progressIndex = progressSteps.findIndex(progressStep => {
        const stepIndex = steps.findIndex(s => s.id === progressStep.id);
        return stepIndex > currentStep;
      });
      return progressIndex === -1 ? progressSteps.length - 1 : Math.max(0, progressIndex - 1);
    }
    
    const progressIndex = progressSteps.findIndex(progressStep => progressStep.id === currentStepConfig.id);
    return progressIndex;
  };

  const shouldShowProgressBar = () => {
    const step = steps[currentStep];
    return step.id !== 'context' && step.id !== 'verification';
  };

  const shouldShowNavigation = () => {
    const step = steps[currentStep];
    return step.id !== 'verification';
  };

  if (!isOpen) return null;

  const CurrentStepComponent = steps[currentStep]?.component;
  const currentStepTitle = steps[currentStep]?.title;
  const isContextStep = steps[currentStep]?.id === 'context';
  const isVerificationStep = steps[currentStep]?.id === 'verification';
  const buttonText = getButtonText();

  return (
    <div className="kyc-modal-overlay">
      <div className="kyc-modal">
        {/* Close button in top-right corner */}
        <button 
          onClick={onClose} 
          className="close-button"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 20,
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            color: '#6C7689',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>

        <div className="kyc-modal-content">
          {/* Left Panel */}
          <div style={{ 
            width: '50%', 
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}>
            <div>
              {/* Progress bar for applicable steps */}
              {shouldShowProgressBar() && (
                <div style={{ marginBottom: '32px' }}>
                  <div style={{
                    font: '500 14px/20px var(--font-family-system)',
                    color: '#6C7689',
                    marginBottom: '8px'
                  }}>
                    Step {getCurrentProgressStep() + 1} of {progressSteps.length}
                  </div>
                  <div style={{
                    width: '100%',
                    height: '4px',
                    backgroundColor: '#E4E7EC',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${((getCurrentProgressStep() + 1) / progressSteps.length) * 100}%`,
                      height: '100%',
                      backgroundColor: '#635BFF',
                      borderRadius: '2px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              )}

              {/* Step title for non-context steps */}
              {!isContextStep && !isVerificationStep && steps[currentStep]?.id !== 'success' && (
                <h2 style={{
                  font: '600 24px/32px var(--font-family-system)',
                  color: '#1A1F2E',
                  margin: '0 0 24px 0'
                }}>
                  {currentStepTitle}
                </h2>
              )}
              
              {/* Step content */}
              {CurrentStepComponent && (
                <CurrentStepComponent 
                  userData={userData} 
                  onComplete={isVerificationStep ? handleVerificationComplete : undefined}
                />
              )}
            </div>
            
            {/* Navigation buttons */}
            {shouldShowNavigation() && (
              <div style={{ marginTop: '32px' }}>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                  {currentStep > 0 && !isVerificationStep && (
                    <button 
                      onClick={handlePreviousStep}
                      style={{
                        padding: '12px 24px',
                        border: '1px solid #E4E7EC',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        color: '#4F566B',
                        font: '500 14px/20px var(--font-family-system)',
                        cursor: 'pointer'
                      }}
                    >
                      Back
                    </button>
                  )}
                  
                  {buttonText && (
                    <button 
                      onClick={handleNextStep}
                      style={{
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '6px',
                        backgroundColor: '#635BFF',
                        color: '#FFFFFF',
                        font: '500 14px/20px var(--font-family-system)',
                        cursor: 'pointer'
                      }}
                    >
                      {buttonText}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Right panel with step-specific gradient */}
          <div style={{ 
            width: '50%',
            background: getCurrentStepGradient(),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: steps[currentStep]?.id === 'success' ? '#10B981' : 'transparent'
          }} />
        </div>
      </div>
    </div>
  );
};

export default KYCRefreshModal; 