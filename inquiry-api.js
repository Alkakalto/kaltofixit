'use strict';
// Transport only: no DOM, database credentials, or presentation logic here.
window.InquiryAPI = {
  async send(payload, options) {
    if (!options || options.mode !== 'api' || !options.endpoint) throw new Error('Formuläret är inte anslutet ännu. Kontakta mig via mejl eller telefon.');
    const endpoint = new URL(options.endpoint, location.href);
    if (endpoint.protocol !== 'https:' && endpoint.origin !== location.origin) throw new Error('Formulärets anslutning är inte korrekt inställd.');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), options.timeoutMs || 15000);
    try {
      const response = await fetch(endpoint.href, {
        method: 'POST', headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify(payload), signal: controller.signal, credentials: 'same-origin'
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) throw new Error('Det gick inte att bekräfta din förfrågan. Dina uppgifter finns kvar. Försök igen eller kontakta mig via mejl.');
      return {ok:true};
    } catch (error) {
      if (error.name === 'AbortError') throw new Error('Svaret dröjde. Förfrågan kan ha kommit fram. Kontakta mig om du är osäker innan du försöker igen.');
      if (error instanceof TypeError) throw new Error('Anslutningen bröts. Det går inte att bekräfta om förfrågan kom fram. Dina uppgifter finns kvar.');
      throw error;
    } finally {clearTimeout(timer);}
  }
};
