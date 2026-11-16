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
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const selected = form.elements.type.selectedOptions[0].textContent;
    draft = `Hej ${settings.name}!\n\nJag är intresserad av: ${selected}\n\n${values.get('message').trim()}\n\nNamn: ${values.get('name').trim()}\nFöretag: ${values.get('company').trim() || '–'}\nE-post: ${values.get('email').trim()}\nTelefon: ${values.get('phone').trim() || '–'}`;
    document.querySelector('#copy-text').value = draft;
    document.querySelector('#copy-inquiry').classList.add('visible');
    status.textContent = 'Mejlutkastet är förberett. Skicka det i ditt e-postprogram. Om inget öppnas kan du kopiera förfrågan nedan och mejla den till ' + settings.email + '.';
    location.href = `mailto:${settings.email}?subject=${encodeURIComponent('Förfrågan: ' + selected)}&body=${encodeURIComponent(draft)}`;
  });
  document.querySelector('#copy-inquiry').addEventListener('click', async () => {
    try {await navigator.clipboard.writeText(draft); status.textContent = 'Förfrågan är kopierad. Klistra in den i ett mejl till ' + settings.email + '.';}
    catch {document.querySelector('#copy-label').hidden = false; document.querySelector('#copy-text').select(); status.textContent = 'Markera och kopiera texten nedan och mejla den till ' + settings.email + '.';}
  });
}
