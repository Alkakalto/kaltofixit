# KaltofixIT

En svensk, mobilanpassad hemsida för KaltofixIT, inriktad på små och medelstora företag och hobbyverksamheter. Byggd i vanlig HTML, CSS och JavaScript. Ingen installation eller byggprocess krävs.

## Publicera på GitHub Pages

1. Öppna repots **Settings → Pages**.
2. Välj **Deploy from a branch** under Source.
3. Välj **main** och **/(root)** och spara.
4. Vänta på GitHubs publicering. Sidans adress visas under Pages.

Förväntad adress med standardinställningar: https://alkakalto.github.io/kaltofixit/

Repot är privat när sidan skapas. GitHub Free kräver ett offentligt repo för Pages; betalda planer kan stödja privata repon. Ingen synlighet har ändrats automatiskt. Inställningar: https://github.com/Alkakalto/kaltofixit/settings/pages

GitHubs guide: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Innehåll

- `index.html`: startsida.
- `projekt.html`: designkoncept som ersätts med riktiga projekt när dessa valts.
- `om-oss.html`: presentation av verksamheten.
- `kontakt.html`: kontaktuppgifter, förfrågan och kort integritetstext.
- `404.html`: felsida.
- `styles.css`: utseende och mobilanpassning.
- `config.js`: kontaktuppgifter som används av JavaScript.
- `app.js`: mobilmeny och mejlutkast.

Kontaktuppgifter finns även i HTML för att fungera utan JavaScript. Uppdatera båda när de ändras. Företagsnamnet finns också i titlar, sidtexter och logotyp.

## Förfrågningar

Formuläret validerar obligatoriska fält och öppnar ett `mailto:`-utkast i besökarens e-postprogram. Besökaren måste själv skicka mejlet. Det finns en kopieringsknapp som reserv. Inga formulärdata sparas på webbplatsen. För direkt leverans från webben behövs en separat formulärtjänst eller serverfunktion; ingen sådan tjänst är ansluten.

Projektkorten är tydligt märkta fiktiva designkoncept, inte genomförda kundprojekt. Ersätt med bilder, beskrivningar och verifierade länkar till egna arbeten.

## Kontroll

JavaScript-syntax, interna filer/länkar och mejlutkastets logik har kontrollerats. Visuell webbläsarkontroll kunde inte slutföras eftersom den lokala förhandsvisningen blockerades av miljöns nätverksåtkomst.

## Logotyp och presentation

Logotypen i kaltofixit-logo.png är originalbilden som ägaren tillhandahållit. Den används i sidhuvud, sidfot, på Om oss och som sidikon. Bilden är 160 × 160 px och ska inte förstoras utöver originalstorleken. Presentationen av Alexander som IT-tekniker i Stockholm bygger på innehållet i den tidigare webbplats som ägaren delat.

