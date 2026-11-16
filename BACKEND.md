# Framtida PHP/SQL-koppling

Gränssnittet är fristående från leveransen. I dag är `inquiry.mode` i `config.js` satt till `mailto`. Inga uppgifter skickas till någon server eller databas. PHP eller SQL har inte implementerats.

## Aktivera när servern finns

1. Bygg och testa en PHP-endpoint enligt kontraktet nedan.
2. Ändra `inquiry.endpoint` till endpointens adress och `inquiry.mode` till `api`.
3. Testa fel, timeout, lyckad leverans och mobilflödet innan publicering.
4. Uppdatera integritetstexten i `kontakt.html` med faktisk lagring, mottagare och gallring. Den nuvarande texten beskriver mejlflödet.

GitHub Pages kör den statiska framsidan. PHP behöver en server som kan köra PHP. Om API:t ligger på en annan domän behöver servern tillåta den faktiska webbplatsens origin och hantera JSON-anropens CORS-preflight. Webbläsaren ska aldrig ansluta direkt till SQL.

## HTTP-kontrakt, version 1

POST till din konfigurerade endpoint, `Content-Type: application/json`.

```json
{
  "schemaVersion": 1,
  "source": "kaltofixit-web",
  "businessType": "hobby",
  "name": "Exempelperson",
  "company": "",
  "email": "person@example.com",
  "phone": "",
  "type": "exempel",
  "message": "Jag vill visa mina arbeten."
}
```

`businessType`: tom sträng, `foretag`, `hobby` eller `tjanster`.
`type`: `hemsida`, `exempel`, `forbattring` eller `annat`.
Obligatoriskt: namn (max 100 tecken), giltig e-post (max 160) och meddelande (max 2000).
Frivilligt: företag (max 120), telefon (max 40).

Lyckad mottagning: HTTP 200 eller 201 med `{"ok":true}`. Returnera detta först efter att servern verkligen tagit emot och sparat uppgifterna enligt avsedd rutin. Övriga svar, ogiltig JSON och nätverksfel ger felstatus i formuläret. Inmatningen behålls. Inga automatiska omförsök görs. Tidsgränsen är 15 sekunder.

## Ansvar på servern

- Validera alla fält, längder och tillåtna värden igen; lita inte på webbläsarens validering.
- Använd förberedda SQL-frågor, servergenererat id och serverns mottagningstid.
- Förvara databaslösenord endast på servern, aldrig i JavaScript eller repot.
- Lägg till spam- och frekvensbegränsning, loggning utan onödiga personuppgifter samt skydd som passar serverns sessions-/autentiseringsmodell.
- Bestäm gallring, åtkomst och hantering av dubbletter. Timeout kan inträffa efter att servern sparat en förfrågan.

## Filer

- `explore.js`: exempelval och överföring av ett tillåtet verksamhetsval via URL, inga personuppgifter i URL:en.
- `planner.js`: endast tillåtna funktionsval och upplägg tas från URL. De fyller i meddelandefältet som kunden kan redigera. Befintligt JSON-kontrakt används utan nya databasfält.
- `app.js`: formulärvärden, validering, status och reservväg via kopiering.
- `inquiry-api.js`: JSON-anrop och timeout; ingen layoutkod.
- `config.js`: kontaktuppgifter och transportval, inga hemligheter.

Det befintliga formulärets `name`-attribut fungerar även om du senare väljer vanlig PHP-formulärpostning. Anpassa då action, transport och svarshantering tillsammans; formuläret har ingen aktiv serverdestination i denna version.
