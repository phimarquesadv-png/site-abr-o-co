# Site Abrão & Co

Site institucional da Abrão & Co — consultoria tributária para empresas no
regime de Lucro Real.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Motion · Lenis.
Build estático, publicado no Cloudflare Pages.

## Rodar local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera a pasta out/
```

## Publicação no Cloudflare Pages

O projeto é exportado como site estático (`output: "export"` em
`next.config.ts`), então o Pages serve arquivos prontos — não há servidor Node
em produção.

**Configuração no painel** (Workers & Pages → o projeto → Settings → Build):

| Campo | Valor |
|---|---|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | *(vazio)* |
| Node version | 20 ou superior |

Cada `push` na branch `main` publica em produção. Cada Pull Request ganha uma
URL de preview própria para aprovação antes do merge.

### Variáveis de ambiente

Configurar em Settings → Environment variables, nos ambientes **Production** e
**Preview**. Nenhuma delas entra no repositório — este repo é público.

| Variável | Para quê |
|---|---|
| `RESEND_API_KEY` | Chave da API do Resend, usada no envio do formulário |
| `LEAD_EMAIL_TO` | Caixa do Comercial que recebe os leads |
| `LEAD_EMAIL_FROM` | Remetente, em domínio verificado no Resend |

Sem essas três variáveis o formulário responde com erro explícito e orienta o
visitante a escrever pelo e-mail do rodapé. É proposital: formulário que finge
ter enviado perde lead sem ninguém perceber.

### Domínio

Settings → Custom domains → adicionar o domínio e seguir os registros que o
Cloudflare indicar. **Não mexer nos registros MX** — são o e-mail do escritório.

## Estrutura

```
functions/api/lead.ts        Function do Cloudflare que recebe o formulário
src/app/                     Rotas (App Router)
src/components/motion/       Primitivas de animação
src/components/layout/       Cabeçalho, rodapé, topo das páginas internas
src/components/sections/     Seções de página
src/components/ui/           Botão, container, rótulo
src/content/                 Textos e dados institucionais
```

## Regras do projeto

**Marca.** Extraída dos arquivos oficiais, não inventada. São duas cores, as
duas medidas em vetor: o preto quente `#231F20`, do timbrado, e o azul
`#0024D7`, do portfólio. O azul é campo cheio com tipografia branca; o preto é
texto e rodapé; não há terceira cor. Nenhum componente usa cor literal: tudo
passa pelos tokens do `@theme` em `src/app/globals.css`.

O logotipo em `src/components/ui/Logo.tsx` são os caminhos vetoriais do próprio
timbrado, onde o texto já vinha convertido em curvas. O monograma empilhado em
`src/components/ui/Monograma.tsx` é composto das mesmas letras (A, &, C, O),
com o espaçamento medido no arquivo. Ambos usam `currentColor`, então a mesma
peça serve positivo e negativo.

**Tipografia.** A fonte da marca é a **Gramatika** (Regular e Bold no
timbrado). É comercial e exige licença de webfont à parte, que ainda não
existe. Até lá o site usa **Figtree**, a substituta mais próxima entre as
gratuitas — mesma classe de grotesca geométrica, altura de x alta, "a" de dois
andares e "g" de um só. Comprada a licença, troca-se em `src/app/layout.tsx` e
no comentário do `@theme`.

**Motion.** Anima-se apenas `opacity` e `transform`. Entrada em scroll acontece
uma vez só. Toda animação respeita `prefers-reduced-motion` — o site inteiro
fica estático para quem pediu menos movimento ao sistema. Meta de performance:
LCP abaixo de 2s e CLS abaixo de 0,05; animação que derrubar isso sai.

**Conteúdo.** Não entram no site nome de cliente, valor de caso individual nem
promessa de resultado. Casos de sucesso, se forem publicados, vão anonimizados
por segmento. Os números agregados de histórico vêm do portfólio institucional
e aparecem com a ressalva de que resultado passado não projeta resultado
futuro.

**Publicidade.** O contrato social constitui uma sociedade empresária limitada,
não uma sociedade de advogados — então não se aplica o Provimento 205/2021 do
CFOAB, e não há inscrição de sociedade a exibir no rodapé. Vale a régua comum
de publicidade (CDC e CONAR): nada de afirmação sem base documentada. O texto
segue em tom informativo por escolha editorial, não por obrigação.

## Pendências antes de publicar

- [x] Razão social (contrato social, 08/01/2026)
- [x] CNPJ (cartão CNPJ, 09/01/2026)
- [ ] Confirmar o domínio `abrao.co` (lido do timbrado) e registrá-lo
- [x] E-mail e telefone (portfólio institucional, p. 20)
- [ ] Caixa comercial própria (`contato@abrao.co`) no lugar do e-mail pessoal do sócio
- [ ] Licença de webfont da Gramatika (substitui a Figtree)
- [x] Fotos dos sócios (extraídas do portfólio, recortadas em 4:5)
- [ ] Fotos de equipe e escritório

- [ ] Revisão jurídica das minutas de privacidade e termos
- [ ] Variáveis do Resend no Cloudflare
- [ ] Imagem de compartilhamento (Open Graph)
