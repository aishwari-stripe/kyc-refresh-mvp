import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import KYCRefreshModal, { RiskProfile, EntityType, UserData } from './components/kyc/KYCRefreshModal';
import TopNavBar, { Phase } from './components/TopNavBar';
import ProjectAirView from './components/ProjectAirView';
import { getAssetPath } from './utils/assets';
import './components/kyc/KYCRefreshModal.css';

// Email content types
interface BaseEmailContent {
  type: string;
  subject: string;
  title: string;
  ctaText: string;
}

interface IndividualVerificationEmail extends BaseEmailContent {
  type: 'individual-verification';
  greeting: string;
  bodyText: string;
  representativeInfo: {
    name: string;
    address: string;
  };
  conditionalSections: {
    correctInfo: string;
    changedInfo: string;
  };
  signOff: string;
}

interface StandardVerificationEmail extends BaseEmailContent {
  type: 'standard-verification';
  greeting: string;
  bodyText: string;
  representativeInfo: {
    name: string;
    address: string;
  };
  conditionalSections: {
    correctInfo: string;
    changedInfo: string;
  };
  footerText: string;
  signOff: string;
}

interface CompanyVerificationEmail extends BaseEmailContent {
  type: 'company-verification';
  greeting: string;
  bodyText: string;
  ctaText: string;
  signOff: string;
}

interface SectionBasedEmail extends BaseEmailContent {
  type: 'regulatory' | 'routine';
  sections: Array<{
    title: string;
    description: string;
  }>;
  deadline?: string;
}

type EmailContent = IndividualVerificationEmail | StandardVerificationEmail | CompanyVerificationEmail | SectionBasedEmail;

// MVP App Component (the current functionality)
const MVPApp: React.FC<{ onPhaseChange: (phase: Phase) => void; selectedPhase: Phase }> = ({ onPhaseChange, selectedPhase }) => {
  const [currentView, setCurrentView] = useState<'email' | 'dashboard'>('email');
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('low');
  const [entityType, setEntityType] = useState<EntityType>('company');

  // Sample user data to demonstrate pre-filled forms
  const userData: UserData = {
    representative: {
      firstName: 'Peter',
      lastName: 'Parker',
      phone: '(555) 123-4567',
      address: '123 Alameda St',
      city: 'San Jose',
      state: 'CA',
      zipCode: '95126',
      email: 'peter.parker@example.com',
    },
    business: {
      businessType: 'corporation',
      industry: 'technology',
      websiteUrl: 'https://www.example.com',
      productDescription: 'A comprehensive e-commerce platform that helps businesses manage their online stores, process payments, and track inventory.',
    },
    businessOwner: {
      ownerName: '• Sarah Johnson (Chief Executive Officer)\n• Michael Chen (Chief Technology Officer)\n• Emily Rodriguez (Chief Financial Officer)\n• David Kim (Chief Operating Officer)',
      ownerTitle: '',
      ownerEmail: '',
    },
    metadata: {
      lastUpdatedDate: '2022-04-01'
    }
  };

  const handleOpenModal = () => {
    setCurrentView('dashboard');
  };

  const handleBackToEmail = () => {
    setCurrentView('email');
  };



  // Determine email content based on configuration
  const getEmailContent = (): EmailContent => {
    // Special case for low risk + individual
    if (riskProfile === 'low' && entityType === 'individual') {
      return {
        type: 'individual-verification',
        subject: 'Let\'s ensure your account details are up to date',
        title: 'Let\'s ensure your account details are up to date',
        greeting: 'Hi Peter,',
        bodyText: 'To keep your business running smoothly, we periodically review your account\'s representative information. Please take a moment to look over the details we have on file.',
        representativeInfo: {
          name: 'Peter Parker',
          address: '123 Alameda St, San Jose\nSan Jose 95126'
        },
        conditionalSections: {
          correctInfo: 'You\'re all set! No action is needed from you. We will automatically consider your information confirmed on [date].',
          changedInfo: 'You\'ll need to update in your Stripe Settings. This ensures your account stays in good standing.'
        },
        ctaText: 'Update my information',
        signOff: 'Thank you for helping us keep your account secure.\n\nThe Stripe Team'
      };
    }

    // Company verification for all risk levels + company
    if (entityType === 'company') {
      return {
        type: 'company-verification',
        subject: 'Please verify your company\'s account information',
        title: 'Please verify your company\'s account information',
        greeting: 'Hi Peter,',
        bodyText: 'To ensure seamless operations and maintain compliance for [Company Name], we periodically require the verification of key account information.\n\nThis standard review ensures that all details, such as your registered business address, company representatives, and beneficial ownership structure, are current. Keeping this information accurate is essential for your account\'s security and helps prevent any potential service interruptions.\n\nFor your company\'s security, you will be asked to log in to your secure dashboard to review and confirm these details. The information has been pre-filled for your convenience, making the process a quick confirmation.',
        ctaText: 'Review account information',
        signOff: 'Thank you for helping us maintain the integrity of your company\'s account.\n\nSincerely,\n\nThe Stripe team'
      };
    }

    // Standard verification for standard/high risk + individual
    if ((riskProfile === 'standard' || riskProfile === 'high') && entityType === 'individual') {
      return {
        type: 'standard-verification',
        subject: 'A quick check-in on your account details',
        title: 'A quick check-in on your account details',
        greeting: 'Hi Peter,',
        bodyText: 'To keep your business running smoothly, we periodically review your account\'s representative information. Please take a moment to look over the details we have on file.',
        representativeInfo: {
          name: 'Peter Parker',
          address: '123 Alameda St, San Jose\nSan Jose 95126'
        },
        conditionalSections: {
          correctInfo: 'You\'re all set! No action is needed from you. We will automatically consider your information confirmed on [date].',
          changedInfo: 'You\'ll need to update in your Stripe Settings. This ensures your account stays in good standing.'
        },
        ctaText: 'Review & confirm my information',
        footerText: 'Completing this verification is essential to ensure your account remains in good standing and there are no interruptions to your service.',
        signOff: 'Thank you for helping us support your business.\n\nThe Stripe team'
      };
    }

    // Fallback to routine format for any other cases
    return {
      type: 'routine',
      subject: 'Action Required: We need to re-verify your information',
      title: 'We need to re-verify your information',
      sections: [
        {
          title: 'Review KYC details',
          description: 'We\'ll ask you to confirm your current business and representative information.'
        },
        {
          title: 'New information required for compliance',
          description: 'Some additional details may be needed to meet updated regulatory requirements.'
        },
        {
          title: 'Manage communication preferences',
          description: 'Update how and when you\'d like to receive important account notifications.'
        }
      ],
      ctaText: 'Get started'
    };
  };

    const emailContent = getEmailContent();

  // Dashboard view with modal
  if (currentView === 'dashboard') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.3) 0%, rgba(20, 20, 20, 0.3) 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", "Roboto", "Ubuntu", sans-serif',
        position: 'relative'
      }}>
        {/* Top Navigation Bar - Always visible */}
        <TopNavBar
          riskProfile={riskProfile}
          entityType={entityType}
          selectedPhase={selectedPhase}
          onRiskProfileChange={setRiskProfile}
          onEntityTypeChange={setEntityType}
          onPhaseChange={onPhaseChange}
        />
        
        {/* Modal */}
        <KYCRefreshModal
          riskProfile={riskProfile}
          entityType={entityType}
          isOpen={true}
          onClose={handleBackToEmail}
          userData={userData}
        />
      </div>
    );
  }

  // Email view
    return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", "Roboto", "Ubuntu", sans-serif',
      color: '#1A1F2E',
      backgroundColor: '#F9FAFB',
      minHeight: '100vh',
      position: 'relative'
    }}>
              {/* Top Navigation Bar */}
        <TopNavBar
          riskProfile={riskProfile}
          entityType={entityType}
          selectedPhase={selectedPhase}
          onRiskProfileChange={setRiskProfile}
          onEntityTypeChange={setEntityType}
          onPhaseChange={onPhaseChange}
        />

      {/* Email Preview as Main Content */}
      <div style={{ 
        maxWidth: '720px',
        margin: '0 auto',
        padding: '120px 20px 40px 20px' // Added top padding for nav bar
      }}>
        {/* Email Content */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(26, 31, 46, 0.12)',
          overflow: 'hidden'
        }}>
          {/* Subject Line Preview */}
          <div style={{
            backgroundColor: '#F9FAFB',
            padding: '12px 16px',
            borderBottom: '1px solid #E4E7EC'
          }}>
            <div style={{
              font: '500 12px/16px var(--font-family-system)',
              color: '#4F566B',
              marginBottom: '4px'
            }}>
              Subject:
            </div>
            <div style={{
              font: '400 14px/20px var(--font-family-system)',
              color: '#1A1F2E'
            }}>
              {emailContent.subject}
            </div>
          </div>

                     {/* Stripe Header with Logo */}
           <div style={{
             backgroundColor: '#FFFFFF',
             padding: '40px 40px 20px 40px',
             textAlign: 'left'
           }}>
             <img 
               src={getAssetPath('/stripe-logo.png')} 
               alt="Stripe" 
               style={{ 
                 height: '25px',
                 marginBottom: '30px',
                 maxWidth: '120px'
               }}
               onError={(e) => {
                 // Fallback to SVG if image fails to load
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.nextElementSibling?.setAttribute('style', 'display: inline-block; margin-bottom: 30px;');
               }}
             />
             {/* Fallback SVG (hidden by default) */}
             <svg width="60" height="25" viewBox="0 0 60 25" style={{ display: 'none', marginBottom: '30px' }}>
               <path fill="#635BFF" d="M59.5 12.3c0-7.4-3.4-12.3-9-12.3-5.6 0-9.5 4.9-9.5 12.1 0 8 3.7 12.2 10.6 12.2 3 0 5.3-.7 7.1-1.6V18c-1.9 1-4 1.5-6.4 1.5-2.9 0-5.1-1.1-5.5-4.5h12.2c.1-.4.5-1.7.5-2.7zm-12.6-2.4c.1-2.8 1.6-4.6 4-4.6 2.3 0 3.8 1.8 3.8 4.6h-7.8zM35 8.8c-1.4 0-2.6.5-3.5 1.3l-.2-1h-4.6v15.6h5.2v-5.3c.9.7 2.1 1.1 3.4 1.1 4.1 0 7.2-3.4 7.2-8.7 0-5.2-3-8-7.5-8zm-1.1 12.5c-1.3 0-2.1-.6-2.6-1.3v-6.4c.5-.8 1.3-1.3 2.6-1.3 2 0 3.3 1.8 3.3 4.5s-1.3 4.5-3.3 4.5zM23.9 8.8c-1.9 0-3.2.9-3.8 1.1l-.2-.8h-4.7V24h5.2v-5.5c.6.3 1.6.7 3 .7 4.4 0 7.1-3.6 7.1-8.8 0-4.6-2.4-7.6-6.6-7.6zm-1.6 12.6c-1.1 0-1.7-.3-2.3-.7V12.9c.5-.5 1.3-.9 2.3-.9 1.8 0 2.9 1.6 2.9 4.2 0 2.8-1.1 4.2-2.9 4.2zM9.9 24V9.1H5.8L5.6 8C5.1 6.8 4.4 5.4 3.4 4.2 2.4 3.1 1.2 2.5 0 2.5v1.9c.7 0 1.2.2 1.7.6.4.4.7.9.9 1.5l.1.4v17.1h6.2zM59.5 12.3h-1"/></svg>
            
            {/* Beautiful Gradient Background */}
            <div style={{
              backgroundImage: `url(${getAssetPath('/gradient-email.png')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '8px',
              height: '160px',
              marginBottom: '40px'
            }}>
            </div>

            {/* Main Heading */}
            <div style={{ padding: '0px 0px', marginBottom: '40px' }}>
              <h1 style={{
                font: '700 32px/40px var(--font-family-system)',
                color: '#1A1F2E',
                textAlign: 'left',
                margin: '0px',
                padding: '0px'
              }}>
                {emailContent.title}
              </h1>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ padding: '0 40px 40px 40px' }}>
            {emailContent.type === 'individual-verification' ? (
              <>
                {/* Individual verification content */}
                <p style={{
                  font: '400 16px/24px var(--font-family-system)',
                  color: '#1A1F2E',
                  margin: '0 0 24px 0',
                  textAlign: 'left'
                }}>
                  {(emailContent as IndividualVerificationEmail).greeting}
                </p>

                <div style={{
                  font: '400 16px/24px var(--font-family-system)',
                  color: '#1A1F2E',
                  margin: '0 0 32px 0',
                  lineHeight: '1.6',
                  textAlign: 'left'
                }}>
                  {(emailContent as IndividualVerificationEmail).bodyText.split('\n\n').map((paragraph, index) => (
                    <p key={index} style={{ margin: '0 0 16px 0', textAlign: 'left' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Representative Information */}
                <div style={{
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #E4E7EC',
                  borderRadius: '8px',
                  padding: '24px',
                  margin: '32px 0'
                }}>
                  <h3 style={{
                    font: '600 18px/26px var(--font-family-system)',
                    color: '#1A1F2E',
                    margin: '0 0 16px 0'
                  }}>
                    Here's what we have on file
                  </h3>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{
                      font: '500 14px/20px var(--font-family-system)',
                      color: '#4F566B',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      Account representative
                    </span>
                    <span style={{
                      font: '400 14px/20px var(--font-family-system)',
                      color: '#1A1F2E'
                    }}>
                      {(emailContent as IndividualVerificationEmail).representativeInfo.name}
                    </span>
                  </div>

                  <div style={{ marginBottom: '0' }}>
                    <span style={{
                      font: '500 14px/20px var(--font-family-system)',
                      color: '#4F566B',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      Address
                    </span>
                    <span style={{
                      font: '400 14px/20px var(--font-family-system)',
                      color: '#1A1F2E',
                      whiteSpace: 'pre-line'
                    }}>
                      {(emailContent as IndividualVerificationEmail).representativeInfo.address}
                    </span>
                  </div>
                </div>

                {/* Conditional Sections */}
                <div style={{
                  margin: '32px 0'
                }}>
                  <h4 style={{
                    font: '600 16px/24px var(--font-family-system)',
                    color: '#1A1F2E',
                    margin: '0 0 8px 0'
                  }}>
                    If this information is correct
                  </h4>
                  <p style={{
                    font: '400 16px/24px var(--font-family-system)',
                    color: '#1A1F2E',
                    margin: '0 0 24px 0'
                  }}>
                    {(emailContent as IndividualVerificationEmail).conditionalSections.correctInfo}
                  </p>

                  <h4 style={{
                    font: '600 16px/24px var(--font-family-system)',
                    color: '#1A1F2E',
                    margin: '0 0 8px 0'
                  }}>
                    If this information has changed
                  </h4>
                  <p style={{
                    font: '400 16px/24px var(--font-family-system)',
                    color: '#1A1F2E',
                    margin: '0'
                  }}>
                    {(emailContent as IndividualVerificationEmail).conditionalSections.changedInfo}
                  </p>
                </div>
              </>
            ) : emailContent.type === 'standard-verification' ? (
              <>
                {/* Standard verification content */}
                <p style={{
                  font: '400 16px/24px var(--font-family-system)',
                  color: '#1A1F2E',
                  margin: '0 0 24px 0',
                  textAlign: 'left'
                }}>
                  {(emailContent as StandardVerificationEmail).greeting}
                </p>

                <div style={{
                  font: '400 16px/24px var(--font-family-system)',
                  color: '#1A1F2E',
                  margin: '0 0 32px 0',
                  lineHeight: '1.6',
                  textAlign: 'left'
                }}>
                  {(emailContent as StandardVerificationEmail).bodyText.split('\n\n').map((paragraph, index) => (
                    <p key={index} style={{ margin: '0 0 16px 0', textAlign: 'left' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Representative Information */}
                <div style={{
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #E4E7EC',
                  borderRadius: '8px',
                  padding: '24px',
                  margin: '32px 0'
                }}>
                  <h3 style={{
                    font: '600 18px/26px var(--font-family-system)',
                    color: '#1A1F2E',
                    margin: '0 0 16px 0'
                  }}>
                    Here's what we have on file
                  </h3>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{
                      font: '500 14px/20px var(--font-family-system)',
                      color: '#4F566B',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      Account representative
                    </span>
                    <span style={{
                      font: '400 14px/20px var(--font-family-system)',
                      color: '#1A1F2E'
                    }}>
                      {(emailContent as StandardVerificationEmail).representativeInfo.name}
                    </span>
                  </div>

                  <div style={{ marginBottom: '0' }}>
                    <span style={{
                      font: '500 14px/20px var(--font-family-system)',
                      color: '#4F566B',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      Address
                    </span>
                    <span style={{
                      font: '400 14px/20px var(--font-family-system)',
                      color: '#1A1F2E',
                      whiteSpace: 'pre-line'
                    }}>
                      {(emailContent as StandardVerificationEmail).representativeInfo.address}
                    </span>
                  </div>
                </div>

                {/* Conditional Sections */}
                <div style={{
                  margin: '32px 0'
                }}>
                  <h4 style={{
                    font: '600 16px/24px var(--font-family-system)',
                    color: '#1A1F2E',
                    margin: '0 0 8px 0'
                  }}>
                    If this information is correct
                  </h4>
                  <p style={{
                    font: '400 16px/24px var(--font-family-system)',
                    color: '#1A1F2E',
                    margin: '0 0 24px 0'
                  }}>
                    {(emailContent as StandardVerificationEmail).conditionalSections.correctInfo}
                  </p>

                  <h4 style={{
                    font: '600 16px/24px var(--font-family-system)',
                    color: '#1A1F2E',
                    margin: '0 0 8px 0'
                  }}>
                    If this information has changed
                  </h4>
                  <p style={{
                    font: '400 16px/24px var(--font-family-system)',
                    color: '#1A1F2E',
                    margin: '0'
                  }}>
                    {(emailContent as StandardVerificationEmail).conditionalSections.changedInfo}
                  </p>
                </div>
              </>
            ) : emailContent.type === 'company-verification' ? (
              <>
                {/* Company verification content */}
                <p style={{
                  font: '400 16px/24px var(--font-family-system)',
                  color: '#1A1F2E',
                  margin: '0 0 24px 0',
                  textAlign: 'left'
                }}>
                  {(emailContent as CompanyVerificationEmail).greeting}
                </p>

                <div style={{
                  font: '400 16px/24px var(--font-family-system)',
                  color: '#1A1F2E',
                  margin: '0 0 32px 0',
                  lineHeight: '1.6',
                  textAlign: 'left'
                }}>
                  {(emailContent as CompanyVerificationEmail).bodyText.split('\n\n').map((paragraph, index) => (
                    <p key={index} style={{ margin: '0 0 16px 0', textAlign: 'left' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Section Items */}
                {(emailContent as SectionBasedEmail).sections?.map((section, index) => (
                  <div key={index} style={{
                    borderBottom: '1px solid #E4E7EC',
                    paddingBottom: '24px',
                    marginBottom: '24px'
                  }}>
                    <h3 style={{
                      font: '600 18px/26px var(--font-family-system)',
                      color: '#1A1F2E',
                      margin: '0 0 8px 0'
                    }}>
                      {section.title}
                    </h3>
                    <p style={{
                      font: '400 16px/24px var(--font-family-system)',
                      color: '#6C7689',
                      margin: '0'
                    }}>
                      {section.description}
                    </p>
                  </div>
                ))}

                {/* Deadline (for regulatory) */}
                {(emailContent as SectionBasedEmail).deadline && (
                  <div style={{
                    backgroundColor: '#FFF3E0',
                    border: '1px solid #FDDBA4',
                    borderRadius: '8px',
                    padding: '20px',
                    margin: '30px 0',
                    textAlign: 'center'
                  }}>
                    <strong style={{ color: '#B54708', font: '600 16px/24px var(--font-family-system)' }}>
                      ⏰ {(emailContent as SectionBasedEmail).deadline}
                    </strong>
                    <div style={{ 
                      font: '400 14px/20px var(--font-family-system)',
                      color: '#4F566B',
                      marginTop: '4px'
                    }}>
                      Failure to update may result in temporary service restrictions
                    </div>
                  </div>
                )}
              </>
            )}

            {/* CTA Button */}
            <div style={{ textAlign: 'left', marginTop: '40px', position: 'relative' }}>
              <button 
                onClick={riskProfile === 'low' && entityType === 'individual' ? undefined : handleOpenModal}
                disabled={riskProfile === 'low' && entityType === 'individual'}
                style={{
                  backgroundColor: '#635BFF',
                  color: 'white',
                  padding: '14px 28px',
                  border: 'none',
                  borderRadius: '6px',
                  font: '600 16px/24px var(--font-family-system)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  if (!(riskProfile === 'low' && entityType === 'individual')) {
                    e.currentTarget.style.backgroundColor = '#5449E6';
                  }
                  // Show tooltip for disabled state
                  if (riskProfile === 'low' && entityType === 'individual') {
                    const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                    if (tooltip) {
                      tooltip.style.display = 'block';
                    }
                  }
                }}
                onMouseOut={(e) => {
                  if (!(riskProfile === 'low' && entityType === 'individual')) {
                    e.currentTarget.style.backgroundColor = '#635BFF';
                  }
                  // Hide tooltip
                  if (riskProfile === 'low' && entityType === 'individual') {
                    const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                    if (tooltip) {
                      tooltip.style.display = 'none';
                    }
                  }
                }}
              >
                {emailContent.ctaText}
              </button>
              
              {/* Custom Tooltip */}
              {riskProfile === 'low' && entityType === 'individual' && (
                <div style={{
                  display: 'none',
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#1A1F2E',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  font: '400 14px/20px var(--font-family-system)',
                  whiteSpace: 'nowrap',
                  marginBottom: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  zIndex: 1000,
                  pointerEvents: 'none'
                }}>
                  Users can update their information in Stripe Settings, not shown in this demo
                  {/* Tooltip arrow */}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '6px solid #1A1F2E'
                  }} />
                </div>
              )}
            </div>

            {/* Footer text for standard verification */}
            {emailContent.type === 'standard-verification' && (
              <div style={{
                font: '400 16px/24px var(--font-family-system)',
                color: '#1A1F2E',
                margin: '32px 0',
                lineHeight: '1.6'
              }}>
                <p style={{ margin: '0 0 16px 0' }}>
                  {(emailContent as StandardVerificationEmail).footerText}
                </p>
              </div>
            )}

            {/* Sign-off for individual verification */}
            {emailContent.type === 'individual-verification' && (
              <div style={{
                font: '400 16px/24px var(--font-family-system)',
                color: '#1A1F2E',
                margin: '32px 0 0 0',
                lineHeight: '1.6'
              }}>
                {(emailContent as IndividualVerificationEmail).signOff.split('\n\n').map((paragraph, index) => (
                  <p key={index} style={{ margin: '0 0 16px 0' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Sign-off for standard verification */}
            {emailContent.type === 'standard-verification' && (
              <div style={{
                font: '400 16px/24px var(--font-family-system)',
                color: '#1A1F2E',
                margin: '16px 0 0 0',
                lineHeight: '1.6'
              }}>
                {(emailContent as StandardVerificationEmail).signOff.split('\n\n').map((paragraph, index) => (
                  <p key={index} style={{ margin: '0 0 16px 0' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Sign-off for company verification */}
            {emailContent.type === 'company-verification' && (
              <div style={{
                font: '400 16px/24px var(--font-family-system)',
                color: '#1A1F2E',
                margin: '16px 0 0 0',
                lineHeight: '1.6'
              }}>
                {(emailContent as CompanyVerificationEmail).signOff.split('\n\n').map((paragraph, index) => (
                  <p key={index} style={{ margin: '0 0 16px 0' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
                 </div>

        {/* Email Footer */}
        <div style={{
          backgroundColor: '#F9FAFB',
          padding: '20px',
          textAlign: 'center',
          color: '#4F566B',
          font: '400 14px/20px var(--font-family-system)',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
          border: '1px solid #E4E7EC',
          borderTop: 'none'
        }}>
          <p style={{ margin: '0' }}>
            This email was sent to help maintain your account compliance.<br/>
            If you have questions, contact us at <a href="mailto:support@stripe.com" style={{ color: '#635BFF' }}>support@stripe.com</a>
          </p>
        </div>
             </div>
    </div>
  );
};

// Router Component to handle navigation
const RouterComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getCurrentPhase = (): Phase => {
    if (location.pathname === '/project-air') return 'project-air';
    return 'mvp';
  };

  const handlePhaseChange = (phase: Phase) => {
    navigate(phase === 'mvp' ? '/mvp' : '/project-air');
  };

  return (
    <>
      <Routes>
        <Route path="/mvp" element={<MVPAppWithNav phase={getCurrentPhase()} onPhaseChange={handlePhaseChange} />} />
        <Route path="/project-air" element={<ProjectAirViewWithNav phase={getCurrentPhase()} onPhaseChange={handlePhaseChange} />} />
        <Route path="/" element={<MVPAppWithNav phase={getCurrentPhase()} onPhaseChange={handlePhaseChange} />} />
      </Routes>
    </>
  );
};

// MVP view with navigation
const MVPAppWithNav: React.FC<{ phase: Phase; onPhaseChange: (phase: Phase) => void }> = ({ phase, onPhaseChange }) => {
  return <MVPApp onPhaseChange={onPhaseChange} selectedPhase={phase} />;
};

// Project AIR view with navigation
const ProjectAirViewWithNav: React.FC<{ phase: Phase; onPhaseChange: (phase: Phase) => void }> = ({ phase, onPhaseChange }) => {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", "Roboto", "Ubuntu", sans-serif',
      minHeight: '100vh',
      backgroundColor: '#F9FAFB'
    }}>
      <TopNavBar
        riskProfile="low"
        entityType="company"
        selectedPhase={phase}
        onRiskProfileChange={() => {}}
        onEntityTypeChange={() => {}}
        onPhaseChange={onPhaseChange}
      />
      <ProjectAirView />
    </div>
  );
};

// Main App with Router
function App() {
  // Use correct basename for GitHub Pages
  const isGitHubPages = typeof window !== 'undefined' && 
    window.location.hostname.includes('github.io');
  const basename = isGitHubPages ? '/kyc-refresh-mvp' : '';
  
  return (
    <Router basename={basename}>
      <RouterComponent />
    </Router>
  );
}

export default App; 