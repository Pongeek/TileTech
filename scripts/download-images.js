const https = require('https');
const fs = require('fs');
const path = require('path');

// Make sure the directory exists
const imagesDir = path.join(__dirname, '../public/images/services');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download an image from a URL and save it to a file
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filePath);
    
    console.log(`Downloading ${url} to ${filePath}...`);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename} successfully`);
        resolve(filePath);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if error occurs
      reject(err);
    });
  });
}

// Images to download - using Unsplash public domain images
const images = [
  // Home tiling images
  {
    url: 'https://images.unsplash.com/photo-1600607687644-c7e36a45165b?q=80&w=1000',
    filename: 'home-tiling.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1603512500383-f1f87c13ffc4?q=80&w=1000',
    filename: 'home-tiling-before.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1545042746-ec9e5a59bc1a?q=80&w=1000',
    filename: 'home-tiling-after.jpg'
  },
  
  // Kitchen & Bath images
  {
    url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1000',
    filename: 'kitchen-bath.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1604709178681-82325c04f8bd?q=80&w=1000',
    filename: 'kitchen-bath-before.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000',
    filename: 'kitchen-bath-after.jpg'
  },
  
  // Mosaic images
  {
    url: 'https://images.unsplash.com/photo-1582216601747-0284b796e297?q=80&w=1000',
    filename: 'mosaic.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1000',
    filename: 'mosaic-before.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1617806503886-de86fa76e45d?q=80&w=1000',
    filename: 'mosaic-after.jpg'
  }
];

// Download all images
async function downloadAllImages() {
  console.log('Starting image downloads...');
  try {
    const promises = images.map(image => downloadImage(image.url, image.filename));
    await Promise.all(promises);
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

downloadAllImages(); 