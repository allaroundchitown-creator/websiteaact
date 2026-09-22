const bookingForm = document.getElementById('bookingForm');
const bookingStatus = document.getElementById('bookingStatus');
const phoneInput = bookingForm.elements.phone;
const dateInput = bookingForm.elements.eventDate;
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

bookingForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  bookingStatus.className = 'form-status';

  if (!validatePhone() || !bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }

  const button = bookingForm.querySelector('button[type="submit"]');
  const originalButton = button.innerHTML;
  const formData = new FormData(bookingForm);
  formData.append('_subject', `New paid event lead: ${formData.get('firstName')}`);
  formData.append('_template', 'table');
  formData.append('_captcha', 'false');
  formData.append('_honey', '');
  formData.append('leadSubmittedAt', new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago', dateStyle: 'full', timeStyle: 'short'
  }));

  button.disabled = true;
  button.textContent = 'SENDING…';
  bookingStatus.textContent = 'Sending your event details…';

  try {
    const response = await fetch('https://formsubmit.co/ajax/allaroundchitown@gmail.com', {
      method: 'POST', headers: { Accept: 'application/json' }, body: formData
    });
    if (!response.ok) throw new Error('Submission failed');
    bookingForm.reset();
    dateInput.min = today.toISOString().split('T')[0];
    bookingStatus.textContent = 'Thanks! We received your event details and will contact you with availability and pricing.';
    bookingStatus.className = 'form-status success';
    if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { lead_source: 'paid_event_landing_page' });
  } catch (error) {
    bookingStatus.textContent = 'We couldn’t send your request. Please call or text (224) 234-1473.';
    bookingStatus.className = 'form-status error';
  } finally {
    button.disabled = false;
    button.innerHTML = originalButton;
  }
});
