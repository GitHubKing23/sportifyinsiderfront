const fs = require("fs-extra");
const path = require("path");

// Define the expected structure
const expectedFiles = [
  "pages/tickets.tsx",
  "src_modules/navbar/components/Navbar.tsx",
  "src_modules/tickets/services/ticketService.ts"
];

// Function to check if files exist
function checkFiles() {
  console.log("\n🔍 Checking file structure...\n");
  let allFilesExist = true;

  expectedFiles.forEach((filePath) => {
    const absolutePath = path.join(__dirname, filePath);
    if (!fs.existsSync(absolutePath)) {
      console.error(`❌ Missing: ${filePath}`);
      allFilesExist = false;
    } else {
      console.log(`✅ Found: ${filePath}`);
    }
  });

  if (allFilesExist) {
    console.log("\n🎉 All required files are in place!\n");
  } else {
    console.error("\n⚠️ Some files are missing or misnamed. Check the paths above.\n");
  }
}

// Run the check
checkFiles();
