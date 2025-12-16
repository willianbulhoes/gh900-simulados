# Simulados GH-900 (GitHub Foundations)

Este pacote contém **3 provas simuladas** (60 questões cada, PT-BR) com **gabarito e explicações** e um **cronômetro de 90 minutos**.

## Como usar localmente
1. Extraia o arquivo `.zip` e abra `index.html` em seu navegador.
2. Clique em uma prova para iniciar. O tempo começa automaticamente.
3. Ao enviar a prova, você verá seus acertos e as **explicações** por questão.
4. Para consultar gabaritos completos, use os links na página inicial.

## Hospedar no GitHub Pages
1. Crie um repositório (ex.: `gh900-simulados`).
2. Faça upload de todos os arquivos desta pasta para o repositório.
3. No GitHub, vá em **Settings → Pages**.
4. Em **Source**, escolha **Deploy from a branch**; selecione **Branch: main** e **Folder: /root**.
5. Salve. Após alguns minutos, acesse: `https://SEU-USUÁRIO.github.io/gh900-simulados/`.

> Dica: Você pode renomear o repositório para o que preferir. Se usar uma organização, a URL será `https://SUA-ORG.github.io/NOME-DO-REPO/`.

## Estrutura
```
/ (raiz)
├─ index.html
├─ exams/
│  ├─ exam1.html
│  ├─ exam2.html
│  └─ exam3.html
├─ data/
│  ├─ exam1.json
│  ├─ exam2.json
│  └─ exam3.json
└─ assets/
   ├─ app.js
   └─ style.css
```

## Observações
- As provas cobrem: **Conceitos do GitHub**, **Git**, **Colaboração & GitHub Flow**, **Segurança**, **GitHub Actions** e **Packages/Integrações**.
- O conteúdo está alinhado ao escopo de fundamentos e boas práticas.
- Todos os gabaritos exibem **explicações detalhadas** após a entrega ou via modo gabarito.

Bom estudo e boa prova! 🎓
