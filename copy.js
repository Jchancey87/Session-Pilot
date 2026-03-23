const fs = require('fs');
try {
  fs.copyFileSync('C:\\Users\\jchan\\.gemini\\antigravity\\brain\\92079e91-cb92-4583-be2b-932a78f8f836\\studio_api_hero_1774179766727.png', 'c:\\Users\\jchan\\Documents\\Session Pilot\\public\\studio-api.png');
  console.log("Image copied successfully.");
} catch (e) {
  console.error("Failed to copy image:", e.message);
}
