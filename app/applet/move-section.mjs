import fs from 'fs';

const filePath = 'src/pages/ThreeDNaPose.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const modulesSectionStartPattern = '          <section className="modules" id="tdp-modules">';
const modulesSectionEndPattern = '          </section>\n\n          <section className="learning" style={{ padding: "96px 0" }}>';

const startIndex = content.indexOf(modulesSectionStartPattern);
const endIndex = content.indexOf(modulesSectionEndPattern, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const extractedBlock = content.substring(startIndex, endIndex + '          </section>\n'.length);
  
  // Remove block
  content = content.replace(extractedBlock, '');
  
  // Insert block
  const targetPattern = '          <section className="social-proof" id="tdp-social">';
  const targetIndex = content.indexOf(targetPattern);
  if (targetIndex !== -1) {
    const stringToReplace = '          <section className="social-proof" id="tdp-social">';
    const replacement = extractedBlock + '\n          <section className="social-proof" id="tdp-social">';
    content = content.replace(stringToReplace, replacement);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Success');
  } else {
    console.log('Could not find target index');
  }
} else {
  console.log('Could not find section extents');
}
