const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'C:/Users/User/sportifyinsider-frontbeta/pages/profile.tsx',
  'C:/Users/User/sportifyinsider-frontbeta/lib/tracking.ts',
  'C:/Users/User/sportifyinsider-frontbeta/src/components/Auth/useEthereumLogin.ts',
  'C:/Users/User/sportifyinsider-frontbeta/src/context/AuthContext.tsx',
  'C:/Users/User/sportifyinsider-frontbeta/src/modules/comments/components/CommentForm.tsx',
  'C:/Users/User/sportifyinsider-frontbeta/src/modules/comments/components/CommentList.tsx',
  'C:/Users/User/sportifyinsider-frontbeta/src/modules/user/components/UserProfile.tsx',
  'C:/Users/User/sportifyinsider-frontbeta/src/services/userService.ts',
];

const outputDir = path.resolve(__dirname, 'extracted_files');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

filesToProcess.forEach(filePath => {
  const fileName = path.basename(filePath);
  const outputFilePath = path.join(outputDir, `${fileName}.txt`);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    fs.writeFileSync(outputFilePath, content, 'utf-8');
    console.log(`✅ Extracted: ${fileName}`);
  } else {
    fs.writeFileSync(outputFilePath, `⚠️ FILE NOT FOUND: ${filePath}`, 'utf-8');
    console.warn(`❌ NOT FOUND: ${fileName}`);
  }
});

console.log(`\n📁 All outputs saved in: ${outputDir}`);
