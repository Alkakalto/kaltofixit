'use strict';
(() => {
  const examples = {
    foretag: {brand:'DITT FÖRETAG',kicker:'Lokalt. Personligt. Nära.',title:'Det du gör bra.\nSynligt för fler.',copy:'Visa vad du erbjuder och gör det enkelt för nya kunder att hitta dig.',button:'Lär känna oss ↗',foot:'Ett tydligt erbjudande',label:'företag',count:'01 / 03'},
    hobby: {brand:'SKAPAT AV DIG',kicker:'Din passion får ta plats.',title:'Från din verkstad.\nTill hela världen.',copy:'Samla dina bilder, alster eller projekt på en plats som känns som du.',button:'Se mina arbeten ↗',foot:'Plats för det du skapar',label:'hobbyverksamhet',count:'02 / 03'},
    tjanster: {brand:'DIN KUNSKAP',kicker:'Rätt hjälp, nära till hands.',title:'Du kan ditt jobb.\nLåt kunderna se det.',copy:'Presentera dina tjänster och gör det lätt att fråga om hjälp eller en offert.',button:'Be om en offert ↗',foot:'Dina tjänster i fokus',label:'tjänster',count:'03 / 03'}
  };
  const setText=(selector,text)=>{const node=document.querySelector(selector);if(node)node.textContent=text;};
  document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.preview;const example=examples[key];if(!example)return;
    document.querySelectorAll('[data-preview]').forEach(item=>{const selected=item===button;item.setAttribute('aria-pressed',String(selected));item.classList.toggle('active',selected);});
    document.querySelector('[data-preview-theme]').dataset.previewTheme=key;
    for(const field of ['brand','kicker','title','copy','button','foot'])setText('[data-demo-'+field+']',example[field]);
    setText('[data-preview-count]',example.count);
    setText('#preview-feedback','Exempelskiss för '+example.label+' – inte ett kundprojekt.');
    document.querySelector('[data-choice-contact]').href='kontakt.html?verksamhet='+encodeURIComponent(key);
  }));
  const type=new URLSearchParams(location.search).get('verksamhet');
  const hidden=document.querySelector('[name="businessType"]');
  if(hidden&&examples[type]){hidden.value=type;const context=document.querySelector('#choice-context');context.textContent='Du har valt: '+examples[type].label+'. Berätta gärna lite mer nedan.';context.hidden=false;}
})();
