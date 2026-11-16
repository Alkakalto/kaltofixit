'use strict';
const settings = window.SITE;
document.querySelectorAll('[data-name]').forEach(el => el.textContent = settings.name);
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
document.querySelectorAll('[data-email]').forEach(el => {el.textContent = settings.email + ' ↗'; el.href = 'mailto:' + settings.email;});
document.querySelectorAll('[data-phone]').forEach(el => {el.textContent = settings.phoneDisplay + ' ↗'; el.href = 'tel:' + settings.phone;});
const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); menu.textContent = open ? 'Stäng' : 'Meny';});
document.addEventListener('keydown', event => {if(event.key === 'Escape'){menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); menu.textContent = 'Meny';}});
const form = document.querySelector('#inquiry');
if (form) {
  const type = new URLSearchParams(location.search).get('typ');
  if ([...form.elements.type.options].some(option => option.value === type)) form.elements.type.value = type;
  let draft = '';
  const status = document.querySelector('#form-status');
  const apiMode = settings.inquiry?.mode === 'api';
  const submitButton = form.querySelector('button[type="submit"]');
  if (apiMode) {
    submitButton.textContent = 'Skicka min förfrågan ↗';
    document.querySelector('#delivery-help').textContent = 'Din förfrågan skickas till KaltofixIT. Den är ingen bindande beställning.';
  }
  let submitting = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting || !form.reportValidity()) return;
    const values = new FormData(form);
    const selected = form.elements.type.selectedOptions[0].textContent;
    const businessType = values.get('businessType') || '';
    const businessLabels = {foretag:'Företag',hobby:'Hobbyverksamhet',tjanster:'Tjänster'};
    draft = `Hej ${settings.name}!\n\nJag är intresserad av: ${selected}${businessLabels[businessType] ? '\nVerksamhet: '+businessLabels[businessType] : ''}\n\n${values.get('message').trim()}\n\nNamn: ${values.get('name').trim()}\nFöretag: ${values.get('company').trim() || '–'}\nE-post: ${values.get('email').trim()}\nTelefon: ${values.get('phone').trim() || '–'}`;
    document.querySelector('#copy-text').value = draft;
    document.querySelector('#copy-inquiry').classList.add('visible');
    if (apiMode) {
      const payload = {schemaVersion:1,source:'kaltofixit-web',businessType:businessLabels[businessType] ? businessType : ''};
      for (const key of ['name','company','email','phone','type','message']) payload[key] = String(values.get(key) || '').trim();
      submitting = true; submitButton.disabled = true; form.setAttribute('aria-busy','true');
      status.dataset.state = 'pending'; status.textContent = 'Skickar din förfrågan…';
      try {
        await window.InquiryAPI.send(payload,settings.inquiry);
        status.dataset.state = 'success'; status.textContent = 'Tack! Din förfrågan har tagits emot. Jag hör av mig via uppgifterna du lämnat.';
      } catch (error) {
        status.dataset.state = 'error'; status.textContent = error.message;
      } finally {submitting = false; submitButton.disabled = false; form.setAttribute('aria-busy','false');}
      return;
    }
    status.textContent = 'Mejlutkastet är förberett. Skicka det i ditt e-postprogram. Om inget öppnas kan du kopiera förfrågan nedan och mejla den till ' + settings.email + '.';
    location.href = `mailto:${settings.email}?subject=${encodeURIComponent('Förfrågan: ' + selected)}&body=${encodeURIComponent(draft)}`;
  });
  document.querySelector('#copy-inquiry').addEventListener('click', async () => {
    try {await navigator.clipboard.writeText(draft); status.textContent = 'Förfrågan är kopierad. Klistra in den i ett mejl till ' + settings.email + '.';}
    catch {document.querySelector('#copy-label').hidden = false; document.querySelector('#copy-text').select(); status.textContent = 'Markera och kopiera texten nedan och mejla den till ' + settings.email + '.';}
  });
}
