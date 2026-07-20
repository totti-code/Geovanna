# Arquivo Confidencial — Geovanna

Uma experiência interativa em React criada como presente de Totti para Geovanna. O projeto combina romance leve, humor, neon e caos positivo em uma narrativa cinematográfica original.

## Como executar

É necessário ter o Node.js 18 ou superior instalado.

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Personalização

- Nomes, assinatura, música e consequências: `src/config.js`.
- Cantadas: `src/data/cantadas.js`.
- Música: coloque um arquivo chamado `tema.mp3` em `public/music/`. A música nunca começa automaticamente.
- Cores e aparência: variáveis no início de `src/styles.css`.

## Recursos

- Introdução cinematográfica com terminal e progresso.
- Quiz com respostas aleatórias.
- Gerador com 24 cantadas.
- Botão que foge e cede após cinco tentativas.
- Coração secreto desbloqueado com cinco cliques.
- Análise final e confetes.
- Progresso e segredo persistidos no `localStorage`.
- Botão de reinício com confirmação.
- Layout responsivo e suporte a movimento reduzido.

O projeto usa React, Vite, Tailwind CSS, Framer Motion, React Icons e canvas-confetti.

## Site publicado

O deploy é realizado automaticamente pelo GitHub Actions a cada atualização da branch `main`:

https://totti-code.github.io/Geovanna/

## Imagens de fundo

As imagens em `public/images` foram fornecidas pelo responsável pelo projeto e recebem tratamento visual de máscara, cor e transparência pelo CSS.
