const generateButton = document.getElementById('generateButton');
const resetButton = document.getElementById('resetButton');
const copyButton = document.getElementById('copyButton');
const listenButton = document.getElementById('listenButton');
const passwordOutput = document.getElementById('passwordOutput');

generateButton.addEventListener('click', () => {
  const passwordLength = document.getElementById('passwordLength').value;
  const includeUppercase = document.getElementById('includeUppercase').checked;
  const includeLowercase = document.getElementById('includeLowercase').checked;
  const includeNumbers = document.getElementById('includeNumbers').checked;
  const includeSpecialChars = document.getElementById('includeSpecialChars').checked;

  const generatedPassword = generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSpecialChars);

  passwordOutput.textContent = generatedPassword;
  speakPassword(generatedPassword); // Read out the generated password
});

resetButton.addEventListener('click', () => {
  passwordOutput.textContent = '';
  document.getElementById('passwordLength').value = '12';
  document.getElementById('includeUppercase').checked = true;
  document.getElementById('includeLowercase').checked = true;
  document.getElementById('includeNumbers').checked = true;
  document.getElementById('includeSpecialChars').checked = true;
});

copyButton.addEventListener('click', () => {
  const password = passwordOutput.textContent;
  copyToClipboard(password);
});

listenButton.addEventListener('click', () => {
  const password = passwordOutput.textContent;
  speakPassword(password);
});

function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSpecialChars) {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

  let chars = '';
  if (includeUppercase) chars += uppercaseChars;
  if (includeLowercase) chars += lowercaseChars;
  if (includeNumbers) chars += numberChars;
  if (includeSpecialChars) chars += specialChars;

  let generatedPassword = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    generatedPassword += chars.charAt(randomIndex);
  }

  return generatedPassword;
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function speakPassword(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}


