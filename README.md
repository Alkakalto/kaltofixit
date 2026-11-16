# KaltofixIT – ny webbplats

Ny design och ny kod, byggd från grunden. Vanlig HTML, CSS och JavaScript, utan byggsteg eller externa beroenden. Tidigare design och interaktiva planeringsverktyg används inte.

## Sidor

- index.html: kort startsida med erbjudande, tre tjänstevägar och personlig kontakt.
- tjanster.html: innehåll och arbetsgång.
- projekt.html: introduktion till ett funktionellt demoexempel.
- exempel-snickeri.html: separat, tydligt fiktiv företagssida med meny och FAQ.
- om-oss.html: Alexander och arbetssättet.
- kontakt.html: kontaktuppgifter och förfrågan.
- 404.html: felsida.

## Publicering

Lägg filerna i repots rot. I GitHub Settings → Pages, välj publicering från main och /(root). Ingen egen domän eller byggprocess behövs. Webbplatsen är förberedd för GitHub Pages; PHP behöver köras på separat hosting som stöder PHP.

## Framtida PHP/SQL

Formuläret öppnar tills vidare ett mejlutkast. Inget skickas automatiskt eller sparas på webbplatsen.

När din server finns ändrar du `delivery` till `api` och `endpoint` till adressen i settings.js. Klienten skickar JSON via POST med schemaVersion:1 och fälten name, email, company, phone, message och type. Typ är ny, fornya, forslag eller fraga. Lyckat svar måste vara HTTP 2xx med `{ "ok": true }`. Timeout är 15 sekunder. Fel behåller texten; kopiering till mejl finns som reserv.

Validera obligatoriskt namn, e-post och meddelande på servern. Maxlängder: namn 100, e-post 160, företag 120, telefon 40, meddelande 2000. Tillåt endast kända type-värden. Använd förberedda SQL-frågor. Databaslösenord hör endast hemma på servern. Planera spam-/frekvensbegränsning, eventuell CSRF-hantering, gallring och åtkomst. För API på annan domän måste servern hantera CORS/preflight för webbplatsens origin. Uppdatera integritetstexten före aktivering av lagring. Bekräfta endast mottagning när servern verkligen tagit emot förfrågan.

Kontaktuppgifter finns både i HTML och settings.js. Uppdatera båda vid ändring. Originalbilden logo.png kommer från ägaren.
