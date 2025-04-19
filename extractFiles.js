const fs = require('fs');
const path = require('path');

const filesToProcess = [
  path.resolve('C:/Users/User/sportifyinsider-frontbeta/pages/profile.tsx'),
  path.resolve('C:/Users/User/sportifyinsider-frontbeta/lib/tracking.ts'),
  path.resolve('C:/Users/User/sportifyinsider-frontbeta/src/components/Auth/useEthereumLogin.ts'),
  path.resolve('C:/Users/User/sportifyinsider-frontbeta/src/context/AuthContext.tsx'),
  path.resolve('C:/Users/User/sportifyinsider-frontbeta/src/modules/comments/components/CommentForm.tsx'),
  path.resolve('C:/Users/User/sportifyinsider-frontbeta/src/modules/comments/components/CommentList.tsx'),
  path.resolve('C:/Users/User/sportifyinsider-frontbeta/src/modules/user/components/UserProfile.tsx'),
  path.resolve('C:/Users/User/sportifyinsider-frontbeta/src/services/userService.ts')
];

const outputFile = 'extractedSportifyFiles.txt';
let output = '';

filesToProcess.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    output += `=== FILE: ${filePath} ===\n\n${content}\n\n`;
  } else {
    output += `=== FILE: ${filePath} NOT FOUND ===\n\n`;
  }
});

fs.writeFileSync(outputFile, output, 'utf-8');
console.log(`✅ Done. Output written to ${outputFile}`);
