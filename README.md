# KYC Refresh MVP

A dynamic multi-step KYC (Know Your Customer) refresh experience built with React and TypeScript. The component adapts its flow based on the user's risk profile and entity type.

## 🚀 Features

- **Dynamic Step Logic**: Flow adapts based on risk profile and entity type
- **Two-Column Layout**: Progress tracker on the left, content on the right
- **Responsive Design**: Works on desktop and mobile devices
- **Form Validation**: Client-side validation with error handling
- **File Upload**: Drag & drop document upload functionality
- **TypeScript**: Full type safety and IntelliSense support

## 📋 Dynamic Logic Table

| Risk Profile | Entity Type | Required Steps |
|-------------|-------------|----------------|
| low | individual | 1. Context, 2. Confirm Representative Info |
| standard | individual | 1. Context, 2. Confirm Representative Info |
| high | individual | 1. Context, 2. Confirm Representative Info, 3. Document Upload |
| low | company | 1. Context, 2. Confirm Representative Info, 3. Confirm Business Info |
| standard | company | 1. Context, 2. Confirm Representative Info, 3. Confirm Business Info |
| high | company | 1. Context, 2. Confirm Representative Info, 3. Confirm Business Info, 4. Document Upload |

## 🏗️ Project Structure

```
src/
├── components/
│   └── kyc/
│       ├── KYCRefreshModal.tsx      # Main modal component
│       ├── KYCRefreshModal.css      # Styling for all components
│       ├── TaskProgressBar.tsx      # Progress indicator
│       └── steps/
│           ├── ContextStep.tsx      # Introduction step
│           ├── RepresentativeStep.tsx # Personal info form
│           ├── BusinessStep.tsx     # Business info form (companies only)
│           └── DocumentUploadStep.tsx # File upload (high risk only)
├── App.tsx                          # Demo application
└── main.tsx                         # Entry point
```

## 🛠️ Setup and Installation

1. **Clone the repository** (if applicable) or ensure you're in the project directory.

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 📖 Usage

### Basic Usage

```tsx
import React, { useState } from 'react';
import KYCRefreshModal from './components/kyc/KYCRefreshModal';
import './components/kyc/KYCRefreshModal.css';

function MyApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComplete = () => {
    console.log('KYC process completed!');
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Start KYC Process
      </button>
      
      <KYCRefreshModal
        riskProfile="high"
        entityType="company"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleComplete}
      />
    </div>
  );
}
```

### Props Interface

```tsx
interface KYCRefreshModalProps {
  riskProfile: 'low' | 'standard' | 'high';
  entityType: 'individual' | 'company';
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}
```

## 🎨 Component Overview

### KYCRefreshModal
The main container component that orchestrates the entire flow. It manages the current step state and dynamically determines which steps to show based on the provided props.

### TaskProgressBar
A visual progress indicator that shows:
- All steps in the current flow
- Current active step
- Completed steps with checkmarks
- Pending steps

### Step Components

1. **ContextStep**: Provides context about why KYC is needed
2. **RepresentativeStep**: Collects personal information (name, DOB, contact details, address)
3. **BusinessStep**: Collects business information (only for companies)
   - Business name and type
   - Industry selection
   - Website URL
   - Product/service description
4. **DocumentUploadStep**: File upload interface (only for high-risk profiles)
   - Drag & drop functionality
   - File validation
   - Upload progress simulation

## 🎯 Demo Features

The included demo application allows you to:
- Select different risk profiles (low, standard, high)
- Choose entity types (individual, company)
- See the expected steps update dynamically
- Test the complete flow with all variations

## 📱 Responsive Design

The modal automatically adapts to different screen sizes:
- **Desktop**: Side-by-side layout with progress bar on the left
- **Mobile**: Stacked layout with horizontal progress bar on top

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

### Customization

You can easily customize the styling by modifying `KYCRefreshModal.css`. The CSS uses custom properties and follows a modular approach for easy maintenance.

## 🚀 Next Steps

Potential enhancements:
- Backend integration for form submission
- Real file upload functionality
- Additional validation rules
- Progress persistence
- Custom themes
- Internationalization support

## 📄 License

This project is for demonstration purposes. 