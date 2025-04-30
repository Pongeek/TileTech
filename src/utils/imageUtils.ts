/**
 * Utility functions for image handling
 */

/**
 * Creates an SVG data URL for a color block to use as fallback when images are missing
 * @param color - Hex color code (e.g., '#C66')
 * @param width - Width of the SVG
 * @param height - Height of the SVG
 * @param text - Optional text to display in the SVG
 * @returns SVG data URL
 */
export const createColorBlock = (
  color: string, 
  width: number = 800, 
  height: number = 600,
  text?: string
): string => {
  // Create the raw SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${color}"/>
    ${text ? `<text x="${width/2}" y="${height/2}" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle" fill="#FFFFFF" direction="rtl">${text}</text>` : ''}
  </svg>`;
  
  // Convert SVG to a data URL (handle manually to avoid encoding issues with Hebrew text)
  const base64 = typeof window !== 'undefined' ? 
    window.btoa(unescape(encodeURIComponent(svg))) : 
    Buffer.from(svg).toString('base64');
  
  return `data:image/svg+xml;base64,${base64}`;
};

/**
 * Theme color mappings
 */
export const themeColors = {
  primary: '#C66',
  secondary: '#964B00',
  accent: '#9CAF88',
  neutral: '#E5E5E0'
};

/**
 * Service names for labeling fallback images
 */
export const serviceNames = {
  1: {
    he: 'ריצוף בתים',
    en: 'Home Tiling'
  },
  2: {
    he: 'שיפוץ מטבחים וחדרי אמבטיה',
    en: 'Kitchen & Bathroom'
  },
  3: {
    he: 'עבודות פסיפס',
    en: 'Mosaic Work'
  }
};

/**
 * Default fallback images by service type and state
 */
export const fallbackImages = {
  main: {
    1: createColorBlock(themeColors.primary, 800, 600, serviceNames[1].he),
    2: createColorBlock(themeColors.secondary, 800, 600, serviceNames[2].he),
    3: createColorBlock(themeColors.accent, 800, 600, serviceNames[3].he)
  },
  before: {
    1: createColorBlock('#888', 800, 600, 'לפני - ' + serviceNames[1].he),
    2: createColorBlock('#888', 800, 600, 'לפני - ' + serviceNames[2].he),
    3: createColorBlock('#888', 800, 600, 'לפני - ' + serviceNames[3].he)
  },
  after: {
    1: createColorBlock(themeColors.primary, 800, 600, 'אחרי - ' + serviceNames[1].he),
    2: createColorBlock(themeColors.secondary, 800, 600, 'אחרי - ' + serviceNames[2].he),
    3: createColorBlock(themeColors.accent, 800, 600, 'אחרי - ' + serviceNames[3].he)
  }
};

/**
 * Checks if a URL points to a file that exists
 * @param url - The URL to check
 * @returns True if the file exists
 */
export const fileExists = async (url: string): Promise<boolean> => {
  // Skip checks for data URLs and absolute URLs
  if (url.startsWith('data:') || url.startsWith('http')) {
    return true;
  }
  
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (e) {
    return false;
  }
};

/**
 * Gets the appropriate fallback image for a service
 * @param imagePath - Original image path
 * @param fallbackPath - Path to fallback SVG
 * @param placeholder - Fallback color block if all else fails
 */
export const getImageWithFallback = (
  imagePath: string,
  fallbackPath: string,
  placeholder: string = createColorBlock('#C66', 800, 600, 'Image Unavailable')
): string => {
  if (!imagePath) return fallbackPath || placeholder;
  
  // If the path is already an SVG (likely a fallback), return it
  if (imagePath.endsWith('.svg')) return imagePath;
  
  // For other image paths, provide the fallback path
  return fallbackPath || placeholder;
};

/**
 * Checks if an image URL is a data URL
 * @param url - The image URL to check
 * @returns True if the URL is a data URL
 */
export const isDataUrl = (url: string): boolean => {
  return url.startsWith('data:');
};

/**
 * Default placeholder image path
 */
export const defaultPlaceholder = '/images/services/placeholder.svg';

// Project image type mapping
interface ProjectImageMap {
  [key: string]: string;
}

// Project category fallbacks
const projectPlaceholders: ProjectImageMap = {
  'residential': createColorBlock('#A47551', 400, 300, 'ריצוף ביתי'),
  'bathroom': createColorBlock('#5D87A0', 400, 300, 'חדרי אמבטיה'),
  'kitchen': createColorBlock('#7B9E6B', 400, 300, 'מטבחים'),
  'commercial': createColorBlock('#986B8E', 400, 300, 'מסחרי'),
  'default': createColorBlock('#8B8589', 400, 300, 'פרויקט')
};

/**
 * Gets a project image with appropriate fallback based on category
 * @param imagePath - Original image path
 * @param category - Project category for specialized fallback
 * @returns Path to image or fallback
 */
export const getProjectImage = (
  imagePath: string,
  category: string = 'default'
): string => {
  // Return the fallback immediately if imagePath is empty
  if (!imagePath) return projectPlaceholders[category] || projectPlaceholders.default;
  
  // If it's a data URL or already an SVG, return as is
  if (imagePath.startsWith('data:') || imagePath.endsWith('.svg')) {
    return imagePath;
  }
  
  // For regular image paths, provide the appropriate fallback by category
  return projectPlaceholders[category] || projectPlaceholders.default;
};

/**
 * Generates a thumbnail version of a project image path
 * @param imagePath - Original image path
 * @param category - Project category for specialized fallback
 * @returns Path to thumbnail
 */
export const getProjectThumbnail = (
  imagePath: string, 
  category: string = 'default'
): string => {
  if (!imagePath) return projectPlaceholders[category] || projectPlaceholders.default;
  
  // Always use category placeholder for safety
  // This prevents 404 errors when thumbnail files don't exist
  return projectPlaceholders[category] || projectPlaceholders.default;
};

/**
 * Creates a circular profile image placeholder SVG data URL
 * @param initials - The person's initials to display in the circle
 * @param bgColor - Background color for the circle
 * @returns SVG data URL
 */
export const createProfilePlaceholder = (
  initials: string = 'AB',
  bgColor: string = '#C66'
): string => {
  // Create the raw SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="100" fill="${bgColor}"/>
    <text x="100" y="125" font-family="Arial" font-size="75" font-weight="bold" text-anchor="middle" fill="#FFFFFF" direction="rtl">${initials}</text>
  </svg>`;
  
  // Convert SVG to a data URL
  const base64 = typeof window !== 'undefined' ? 
    window.btoa(unescape(encodeURIComponent(svg))) : 
    Buffer.from(svg).toString('base64');
  
  return `data:image/svg+xml;base64,${base64}`;
};

/**
 * Gets testimonial profile image with appropriate fallback
 * @param imagePath - Original image path
 * @param name - Person's name for generating initials fallback
 * @returns Path to image or fallback
 */
export const getProfileImage = (
  imagePath: string,
  name: string = ''
): string => {
  // Return the original image path if specified
  if (imagePath && (imagePath.startsWith('data:') || imagePath.startsWith('/') || imagePath.startsWith('http'))) {
    return imagePath;
  }
  
  // Generate initials from name
  const initials = name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  
  // Create a placeholder with the person's initials
  return createProfilePlaceholder(initials || 'TP');
}; 