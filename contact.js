// Contact form: validate, "send", and show a success message
const form = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');
const formSuccess = document.getElementById('formSuccess');
const groups = {
  name: document.getElementById('nameGroup'),
  email: document.getElementById('emailGroup'),
  message: document.getElementById('messageGroup')
};
const inputs = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  message: document.getElementById('message')
};

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function validate(data) {
  let valid = true;
  groups.name.classList.toggle('error', data.name === '');
  groups.email.classList.toggle('error', !isValidEmail(data.email));
  groups.message.classList.toggle('error', data.message === '');
  valid = data.name !== '' && isValidEmail(data.email) && data.message !== '';
  return valid;
}

// Sends the message. Swap the inside of this function for a real
// fetch() call to your backend/email API when you're ready.
function sendMessage(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('New contact message:', data);
      const saved = JSON.parse(localStorage.getItem('campusfest_messages') || '[]');
      saved.push(data);
      localStorage.setItem('campusfest_messages', JSON.stringify(saved));
      resolve(true);
    }, 700);
  });
}

Object.entries(inputs).forEach(([key, input]) => {
  input.addEventListener('input', () => groups[key].classList.remove('error'));
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: inputs.name.value.trim(),
    email: inputs.email.value.trim(),
    message: inputs.message.value.trim(),
    submittedAt: new Date().toISOString()
  };

  if (!validate(data)) {
    formSuccess.classList.remove('show');
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = 'Sending...';

  const sent = await sendMessage(data);

  sendBtn.disabled = false;
  sendBtn.textContent = 'Send Message';

  if (sent) {
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
    form.reset();
  } else {
    alert('Something went wrong. Please try again.');
  }
});