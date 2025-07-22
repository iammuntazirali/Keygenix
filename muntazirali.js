const inputEl = document.querySelector(".inputContainer input");
const copyBtn = document.querySelector('.copyBtn');
const rangeEl = document.querySelector(".rangeContainer input");
const spanEl = document.querySelector(".rangeContainer span");
const generateBtnEl = document.querySelector(".generateBtn");
const darkModeBtn = document.querySelector('.darkModeToggle');
const toggleSvg = document.querySelector('.toggle-svg');
const strengthBar = document.querySelector('.strengthBar');
const strengthLabel = document.querySelector('.strengthLabel');
const toast = document.getElementById('toast');

// all characters
var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var password = "";

// we change the slider, the generatePassword function runs automatically
rangeEl.addEventListener("input",()=>{
    spanEl.innerHTML = rangeEl.value
    generatePassword()
})

// Generates random password
function generatePassword(){
    value = rangeEl.value
    var password = "";
    for(var i=0; i<value; i++){
    var randomNumber = Math.floor(Math.random() * chars.length);
    password = password + chars[randomNumber];
    }
    inputEl.value = password;
    copyBtn.querySelector('i').classList.replace("fa-clipboard","fa-clipboard-check");
    updateStrength(password);
}

// Whenever we click on the generate button it call generatePassword function
generateBtnEl.addEventListener("click",()=>{
    generatePassword();
})

// if we click on the copy icon, the password will copy to our clipboard
copyBtn.addEventListener("click",()=>{
    navigator.clipboard.writeText(inputEl.value)
    copyBtn.querySelector('i').classList.replace("fa-clipboard","fa-clipboard-check");
    showToast("Copied!");
    setTimeout(() => {
      copyBtn.querySelector('i').classList.replace("fa-clipboard-check","fa-clipboard");
    }, 1500);
})

// DARK MODE TOGGLE
function setDarkMode(on) {
  if (on) {
    document.body.classList.add('dark');
    toggleSvg.style.transform = 'rotate(360deg)';
  } else {
    document.body.classList.remove('dark');
    toggleSvg.style.transform = 'rotate(0deg)';
  }
  localStorage.setItem('darkMode', on ? '1' : '0');
}
darkModeBtn.addEventListener('click', (e) => {
  // Toggle dark mode
  setDarkMode(!document.body.classList.contains('dark'));
});
// On load, set dark mode from localStorage
setDarkMode(localStorage.getItem('darkMode') === '1');

// PASSWORD STRENGTH METER
function getStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}
function updateStrength(password) {
  const score = getStrength(password);
  let color = '#eee', label = 'Weak', width = '30%';
  if (score >= 4) { color = '#4caf50'; label = 'Strong'; width = '100%'; }
  else if (score === 3) { color = '#ffc107'; label = 'Medium'; width = '70%'; }
  else if (score === 2) { color = '#ff9800'; label = 'Weak'; width = '50%'; }
  else { color = '#f44336'; label = 'Very Weak'; width = '30%'; }
  strengthBar.style.background = color;
  strengthBar.style.width = width;
  strengthLabel.textContent = label;
  strengthLabel.style.color = color;
}

// TOAST NOTIFICATION
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1600);
}

// On initial load, show strength for first password
generatePassword();




