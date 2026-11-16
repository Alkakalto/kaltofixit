'use strict';
(() => {
  const features={tjanster:'Visa tjänster',galleri:'Bilder och projekt',forfragan:'Ta emot förfrågningar',fragor:'Vanliga frågor'};
  const plans={start:'En tydlig sida',utveckla:'Plats att utforska',fornya:'Förnya en befintlig hemsida'};
  const boxes=[...document.querySelectorAll('[data-feature]')];
  const update=()=>{
    const selected=boxes.filter(box=>box.checked&&features[box.dataset.feature]).map(box=>box.dataset.feature);
    const list=document.querySelector('#plan-list');if(!list)return;
    list.replaceChildren();
    ['En tydlig presentation','Kontaktuppgifter som är lätta att hitta','Layout för mobil och dator',...selected.map(key=>features[key])].forEach(text=>{const item=document.createElement('li');item.textContent=text;list.append(item);});
    document.querySelector('#plan-summary').textContent=selected.length?`${selected.length} valda delar. Här är ditt underlag inför vårt samtal.`:'Välj en eller flera delar för att se ditt upplägg.';
    document.querySelector('#plan-contact').href=selected.length?'kontakt.html?funktioner='+selected.join(','):'kontakt.html';
  };
  boxes.forEach(box=>box.addEventListener('change',update));
  document.querySelector('#reset-plan')?.addEventListener('click',()=>{boxes.forEach(box=>box.checked=false);update();});
  if(boxes.length)update();
  const query=new URLSearchParams(location.search);
  const selected=[...new Set((query.get('funktioner')||'').split(','))].filter(key=>Object.hasOwn(features,key));
  const plan=query.get('upplagg');const title=Object.hasOwn(plans,plan)?plans[plan]:'';
  const message=document.querySelector('[name="message"]');
  if(message&&(selected.length||title)&&!message.value){
    message.value=(title?'Jag är intresserad av: '+title+'.\n\n':'')+(selected.length?'Jag vill ha hjälp med:\n'+selected.map(key=>'• '+features[key]).join('\n')+'\n\n':'')+'Om min verksamhet:\n';
    const context=document.querySelector('#choice-context');context.hidden=false;context.textContent='Dina val har följt med. Ändra eller komplettera texten innan du skickar.';
  }
  document.querySelectorAll('[data-device]').forEach(button=>button.addEventListener('click',()=>{
    const mobile=button.dataset.device==='mobile';
    document.querySelector('.live-preview')?.classList.toggle('device-mobile',mobile);
    document.querySelectorAll('[data-device]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  }));
})();
