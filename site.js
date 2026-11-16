'use strict';
const menu=document.querySelector('.menu-button'),nav=document.querySelector('#nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);menu.textContent=open?'Stäng':'Meny';});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){menu.click();menu.focus();}});}
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
