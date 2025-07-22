// Utility function to get the correct asset path for both local development and GitHub Pages
export const getAssetPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Check if we're on GitHub Pages by looking at the hostname
  const isGitHubPages = typeof window !== 'undefined' && 
    window.location.hostname.includes('github.io');
  
  // For GitHub Pages, use the base path
  if (isGitHubPages) {
    return `/kyc-refresh-mvp/${cleanPath}`;
  }
  
  // For development, use root path
  return `/${cleanPath}`;
}; 