'use strict';
(() => {
 const form=document.querySelector('#contact-form');if(!form)return;
 const labels={ny:'En ny hemsida',fornya:'Förnya min hemsida',forslag:'Ett första designförslag',fraga:'Jag har en fråga'};
 const preset=new URLSearchParams(location.search).get('behov');if(Object.hasOwn(labels,preset))form.elements.type.value=preset;
 const cfg=window.KALTO,button=document.querySelector('#submit-contact'),status=document.querySelector('#form-status');let busy=false,draft='';
 if(cfg.delivery==='api'){button.textContent='Skicka förfrågan →';document.querySelector('#delivery-note').textContent='Din förfrågan skickas till KaltofixIT. Det är inte en bindande beställning.';}
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(busy||!form.reportValidity())return;
  const raw=new FormData(form),payload={schemaVersion:1};for(const key of ['name','email','company','phone','message','type'])payload[key]=String(raw.get(key)||'').trim();
  draft=`Hej Alexander!\n\n${labels[payload.type]}\n\n${payload.message}\n\nNamn: ${payload.name}\nE-post: ${payload.email}\nFöretag: ${payload.company||'–'}\nTelefon: ${payload.phone||'–'}`;
  document.querySelector('#draft-text').value=draft;document.querySelector('#copy-draft').hidden=false;status.dataset.error='false';
  if(cfg.delivery!=='api'){location.href=`mailto:${cfg.email}?subject=${encodeURIComponent(labels[payload.type])}&body=${encodeURIComponent(draft)}`;status.textContent='Utkastet är klart. Skicka det i ditt e-postprogram. Om inget öppnas kan du kopiera texten och mejla den till '+cfg.email+'.';return;}
  busy=true;button.disabled=true;form.setAttribute('aria-busy','true');status.textContent='Skickar din förfrågan…';const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
  try{if(!cfg.endpoint)throw Error('Formuläret är inte anslutet ännu. Mejla eller ring mig i stället.');const url=new URL(cfg.endpoint,location.href);if(url.protocol!=='https:'&&url.origin!==location.origin)throw Error('Anslutningen är inte korrekt inställd. Kontakta mig via mejl.');const response=await fetch(url.href,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),signal:controller.signal,credentials:'same-origin'});const result=await response.json().catch(()=>null);if(!response.ok||result?.ok!==true)throw Error('Förfrågan kunde inte bekräftas. Texten finns kvar. Kontakta mig via mejl om problemet fortsätter.');status.textContent='Tack! Din förfrågan har tagits emot. Jag hör av mig via uppgifterna du lämnat.';}
  catch(error){status.dataset.error='true';status.textContent=error.name==='AbortError'?'Svaret dröjde. Förfrågan kan ha kommit fram. Kontakta mig om du är osäker.':error instanceof TypeError?'Anslutningen bröts. Det går inte att bekräfta om förfrågan kom fram. Du kan kopiera texten och mejla mig.':error.message;}
  finally{clearTimeout(timer);busy=false;button.disabled=false;form.setAttribute('aria-busy','false');}
 });
 document.querySelector('#copy-draft').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(draft);status.textContent='Texten är kopierad. Klistra in den i ett mejl till '+cfg.email+'.';}catch{document.querySelector('#manual-copy').hidden=false;document.querySelector('#draft-text').select();status.textContent='Markera och kopiera texten nedan.';}});
})();
