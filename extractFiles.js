const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'C:/Users/User/sportifyinsider-frontbeta/src/components/TipWidget.tsx',
  'C:/Users/User/sportifyinsider-frontbeta/src/modules/navbar/components/Navbar.tsx',
  'C:/Users/User/sportifyinsider-frontbeta/src/modules/GoogleAnalytics.tsx',
  'C:/Users/User/sportifyinsider-frontbeta/src/context/AuthContext.tsx',
  'C:/Users/User/sportifyinsider-frontbeta/src/lib/tracking.ts',
  'C:/Users/User/sportifyinsider-frontbeta/src/modules/blog/services/blogService.ts',
  'C:/Users/User/sportifyinsider-frontbeta/src/modules/comments/components/CommentForm.tsx',
  'C:/Users/User/sportifyinsider-frontbeta/src/modules/comments/components/CommentList.tsx',
  'C:/Users/User/sportifyinsider-frontbeta/src/components/Auth/useEthereumLogin.ts'
];

const outputDir = path.resolve(__dirname, 'extracted_files');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

filesToProcess.forEach(filePath => {
  const relativePath = path.relative('C:/Users/User/sportifyinsider-frontbeta', filePath).replace(/[\/\\]/g, '_');
  const outputFilePath = path.join(outputDir, `${relativePath}.txt`);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    fs.writeFileSync(outputFilePath, content, 'utf-8');
    console.log(`✅ Extracted: ${filePath}`);
  } else {
    fs.writeFileSync(outputFilePath, `⚠️ FILE NOT FOUND: ${filePath}`, 'utf-8');
    console.warn(`❌ NOT FOUND: ${filePath}`);
  }
});

console.log(`\n📁 All outputs saved in: ${outputDir}`);
