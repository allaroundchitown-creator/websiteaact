const successTargets = [
  document.getElementById('formNote'),
  document.getElementById('bookingStatus')
].filter(Boolean);

const redirectOnSuccess = (target) => {
  if (!target.classList.contains('success')) return;
  window.setTimeout(() => window.location.assign('confirmation.html'), 500);
};

successTargets.forEach((target) => {
  const observer = new MutationObserver(() => redirectOnSuccess(target));
  observer.observe(target, { attributes: true, childList: true, subtree: true });
});
