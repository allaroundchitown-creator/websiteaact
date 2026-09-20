const raffleForm = document.getElementById('raffleForm');
const raffleStatus = document.getElementById('raffleStatus');
const phoneInput = raffleForm.elements.phone;
const dateInput = raffleForm.elements.eventDate;
const fakePhoneNumbers = new Set([
  '0000000000', '1111111111', '1234567890', '0123456789',
  '9876543210', '0987654321', '1231231234', '5555555555'
]);

const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
dateInput.min = today.toISOString().split('T')[0];

const validatePhone = () => {
  const digits = phoneInput.value.replace(/\D/g, '');
  const hasValidNanpShape = /^[2-9]\d{2}[2-9]\d{6}$/.test(digits);
  const isRepeatedNumber = /^(\d)\1{9}$/.test(digits);
  const valid = digits.length === 10 && hasValidNanpShape && !fakePhoneNumbers.has(digits) && !isRepeatedNumber;
  phoneInput.setCustomValidity(valid ? '' : 'Enter a valid 10-digit phone number.');
  return valid;
};

phoneInput.addEventListener('input', () => phoneInput.setCustomValidity(''));
phoneInput.addEventListener('blur', validatePhone);

raffleForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  raffleStatus.className = 'form-status';

  if (!validatePhone() || !raffleForm.checkValidity()) {
    raffleForm.reportValidity();
    return;
  }

  const button = raffleForm.querySelector('button[type="submit"]');
  const originalButton = button.innerHTML;
  const formData = new FormData(raffleForm);
  formData.append('_subject', `New raffle entry: ${formData.get('firstName')} ${formData.get('lastName')}`);
  formData.append('_template', 'table');
  formData.append('_captcha', 'false');
  formData.append('_honey', '');
  formData.append('entrySubmittedAt', new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago', dateStyle: 'full', timeStyle: 'short'
  }));

  button.disabled = true;
  button.textContent = 'Submitting…';
  raffleStatus.textContent = 'Submitting your entry…';

  try {
    const response = await fetch('https://formsubmit.co/ajax/allaroundchitown@gmail.com', {
      method: 'POST', headers: { Accept: 'application/json' }, body: formData
    });
    if (!response.ok) throw new Error('Submission failed');
    raffleForm.reset();
    dateInput.min = today.toISOString().split('T')[0];
    raffleStatus.textContent = 'You’re entered! We’ll contact the winner by phone or email.';
    raffleStatus.className = 'form-status success';
    if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { lead_source: 'raffle' });
  } catch (error) {
    raffleStatus.textContent = 'We couldn’t submit your entry. Please try again or call (224) 234-1473.';
    raffleStatus.className = 'form-status error';
  } finally {
    button.disabled = false;
    button.innerHTML = originalButton;
  }
});
