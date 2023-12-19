> [!note]
> Dies ist ein privates Studierendenprojekt der [Universität zu Lübeck](https://www.uni-luebeck.de). Es ist zum jetzigen Zeitpunkt **nicht für die Öffentlichkeit** bestimmt.
# Klima.SH (CS5180-KP04: Open Data Hackathon)

Dieses Projekt verwendet [React](https://react.dev) (Clientseitiges JavaScript-Framework) und [Vite](https://vitejs.dev/) (Entwicklungsumgebung). Mithilfe von [Vercel](https://vercel.com/) (kontinuierliche Bereitstellung) kann der aktuelle Entwicklungsstand unter folgender URL aufgerufen werden: [www.klimash.de](https://www.klimash.de/).

---

## 🚀 Projekt aufsetzen

[Node.js](https://nodejs.org/) muss auf dem Entwicklungsgerät installiert sein.
Als Paketmanager wird [Yarn](https://yarnpkg.com/) verwendet (_Installation:_ `npm install --global yarn`).
Es sollten die empfohlenen Erweiterungen in VSCode (empfohlener Editor) hinzugefügt werden (siehe `.vscode/extensions.json`).

**Befehle** \
`yarn install` (Paketabhängigkeiten laden) \
`yarn run dev` (Entwicklungsserver starten)

**Code Analyse und Formatierung** \
Für die Codeanalyse ist in das Projekt [ESLint](https://eslint.org/) (Quellcode-Analyse) und für das Formatieren [Prettier](https://prettier.io/) (Code-Formatierung) integriert.

Folgende Einstellungen können in VSCode übernommen werden:

```
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
```

---

## 👨‍💻 Vorgehensweise

Jeder Entwickler arbeitet auf einem eigenen Branch (welcher jeweils für eine bestimmte Verbesserung angelegt wird). Es wird nicht auf dem `main`-Branch gearbeitet 😄.

Für jede Verbesserung wird ein Issue geschrieben. Für das Issue wird ein treffender Titel gewählt (Orientierung an Git Commit Messages Best Practices). Ggf. kann bei Erklärungsbedarf eine Beschreibung hinzugefügt werden.
Für das Issue wird ein zutreffendes Label gewählt: `bug` / `documentation` / `enhancement`. Der Entwickler (der an der Verbesserung arbeitet) weist sich das Issue selbst zu. In der Issueansicht kann bei GitHub der Branch zu dem Issue erstellt werden.

Zwischenstände werden auf dem Branch committet. Commit-Nachrichten sind aussagekräftig und folgen Best Practices. Es dürfen gerne vorangestellt [Gitmojis](https://gitmoji.dev/) verwendet werden - die sind cool!

Sollte der Entwicklungsstand die Verbesserung erfüllen und keine unerwünschten Auswirkungen auf bestehenden Code haben, kann ein Pull Request erstellt werden. Dieser wird von mindestens zwei Personen überprüft und freigegeben. Sind keine Anpassungen mehr nötig, darf der Code in den `main`-Branch gemergt werden.

---

## 💄 Konventionen

- Entwicklung in Englisch
- Issues in Englisch und klein geschrieben
- Commit-Nachrichten klein geschrieben
- camelCase im Code
- Variablen, Funktionen ... werden aussagekräftig benannt und ausgeschrieben
