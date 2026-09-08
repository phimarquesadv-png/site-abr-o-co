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

**Oficial: `abrao.co`.** Decidido em 2026-09-08. É o que consta do timbrado e do
e-mail do escritório, e é o que `src/content/site.ts` alimenta em metatags,
sitemap e robots.

#### Como o domínio está hoje (levantado em 2026-09-08)

| Registro | Valor | Serve para |
|---|---|---|
| Registrador | GoDaddy | — |
| NS | `ns29.domaincontrol.com`, `ns30.domaincontrol.com` | DNS é gerido **no GoDaddy** |
| A (apex) | `185.158.133.1` | Site atual, hospedado no **Lovable** |
| `www` | **não existe** | `www.abrao.co` não resolve hoje |
| MX (5 registros) | `aspmx.l.google.com` e alternativos | **E-mail em Google Workspace** |
| TXT SPF | `v=spf1 include:dc-aa8e722993._spfm.abrao.co ~all` | Autorização de envio |
| TXT `dc-aa8e722993._spfm` | `v=spf1 include:_spf.google.com ~all` | Alvo do include acima — **mora dentro da própria zona** |
| TXT `google._domainkey` | chave DKIM | Assinatura das mensagens |
| TXT `_dmarc` | `p=reject; adkim=s; aspf=s` | **Política estrita: mensagem que falhar é rejeitada, não vai para spam** |
| TXT google-site-verification | — | Verificação de propriedade no Google |

#### Por que a virada exige cuidado

Duas coisas elevam o risco:

1. **O DMARC está em `p=reject` com alinhamento estrito.** Se SPF ou DKIM
   quebrarem, a mensagem não cai em spam: é recusada. O e-mail do escritório
   para de sair.
2. **O include do SPF aponta para um subdomínio do próprio `abrao.co`.**
   Migrar a zona sem recriar `dc-aa8e722993._spfm` quebra a cadeia inteira do
   SPF, mesmo com o registro principal correto.

#### Caminho recomendado — mover a zona para o Cloudflare

O apex (`abrao.co`, sem `www`) precisa disso: o GoDaddy não faz CNAME nem ALIAS
na raiz, e o Cloudflare Pages só serve apex quando é ele quem responde pela
zona.

1. Cloudflare → Add a site → `abrao.co` (plano gratuito serve). Deixe o
   scanner importar os registros.
2. **Conferir um a um, antes de qualquer outra coisa**, se foram importados:
   os 5 MX, o TXT do SPF, o TXT `dc-aa8e722993._spfm`, o
   `google._domainkey`, o `_dmarc` e o google-site-verification. O que faltar,
   criar à mão copiando o valor exato da tabela acima.
3. Só então, no GoDaddy, trocar os nameservers pelos dois que o Cloudflare
   indicar. A propagação leva de minutos a algumas horas.
4. Cloudflare Pages → Settings → Custom domains → adicionar `abrao.co` e
   `www.abrao.co`.
5. Depois de propagar, mandar um e-mail de teste de `@abrao.co` para uma caixa
   externa (Gmail pessoal serve) e conferir no cabeçalho se SPF, DKIM e DMARC
   passaram.

**Não desligue o projeto no Lovable antes do passo 5 confirmar.** Enquanto o DNS
não vira, ele continua sendo o site no ar; e se algo der errado, voltar os
nameservers para o GoDaddy é o plano B.

#### Sobre `abraoeco.com.br`

Aparece nas páginas de rosto do portfólio, mas **não resolve**: consulta de
2026-09-08 devolve NXDOMAIN tanto para A quanto para NS, no domínio e no `www`.

Isso prova que ele não tem DNS publicado. Não prova que ninguém o registrou —
um domínio pode estar registrado e ainda sem nameservers. A consulta de whois
do Registro.br não roda deste ambiente; confirmar em
`registro.br/busca-dominio`.

De um jeito ou de outro, não há redirecionamento a fazer hoje: sem DNS, não há
para onde apontar.

> Não confundir com `abrao.co`, que **existe e está no ar** — é o domínio
> oficial do site e serve hoje a página hospedada no Lovable.

## Estrutura

```
functions/api/lead.ts        Function do Cloudflare que recebe o formulário
src/app/                     Rotas (App Router)
src/components/motion/       Primitivas de animação
src/components/layout/       Cabeçalho, rodapé, topo das páginas internas
src/components/sections/     Seções de página
src/components/ui/           Botão, container, rótulo
src/content/site.ts          Dados institucionais, praças e contatos
src/content/atuacao.ts       Frentes, Análise 360º, teses e segmentos
src/content/socios.ts        Sócios
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

**Fonte do catálogo.** O portfólio institucional manda sobre a taxonomia
pública: quatro frentes (Negócio, Tributário, Tecnologia, Agronegócio), a
Análise 360º e as teses. Os nomes operacionais internos — ARO Débito, ARO
Crédito, Parcelamento, Insumos — continuam valendo dentro de casa e não
aparecem no site.

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
- [x] E-mail e telefone (portfólio institucional, p. 20)
- [ ] Caixa comercial própria (`contato@abrao.co`) no lugar do e-mail pessoal do sócio
- [ ] Licença de webfont da Gramatika (substitui a Figtree)
- [x] Fotos dos sócios (extraídas do portfólio, recortadas em 4:5)
- [ ] Fotos de equipe e escritório

- [ ] Revisão jurídica das minutas de privacidade e termos
- [ ] Variáveis do Resend no Cloudflare
- [ ] Imagem de compartilhamento (Open Graph)
