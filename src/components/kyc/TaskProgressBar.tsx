import React from 'react';

interface TaskProgressBarProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

const TaskProgressBar: React.FC<TaskProgressBarProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  const handleStepClick = (stepIndex: number) => {
    if (onStepClick) {
      onStepClick(stepIndex);
    }
  };

  return (
    <div style={{
      padding: '40px 32px',
      backgroundColor: '#FAFAFA',
      height: '100%',
      borderRight: '1px solid #E0E0E0'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              onClick={() => handleStepClick(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                position: 'relative'
              }}
            >
              {/* Step indicator */}
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isCompleted ? '#635BFF' : isCurrent ? '#635BFF' : '#FFFFFF',
                border: `2px solid ${isCompleted ? '#635BFF' : isCurrent ? '#635BFF' : '#E0E0E0'}`,
                transition: 'all 0.2s ease-in-out',
                boxShadow: isCompleted || isCurrent ? '0 1px 4px rgba(99, 91, 255, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.1)',
                flexShrink: 0
              }}>
                {isCompleted ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="1"
                    />
                  </svg>
                ) : (
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: isCurrent ? '#FFFFFF' : '#BDBDBD'
                  }} />
                )}
              </div>

              {/* Step label */}
              <div style={{
                font: '400 14px/20px var(--font-family-system)',
                color: isCompleted ? '#212121' : isCurrent ? '#212121' : '#757575',
                fontWeight: isCurrent ? '500' : '400',
                transition: 'all 0.2s ease-in-out'
              }}>
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskProgressBar; 