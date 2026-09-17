# Handoff — site Abrão & Co

Estado do projeto em 17/09/2026, para quem for continuar daqui.

## Onde as coisas estão

| | |
|---|---|
| Repositório | `phimarquesadv-png/site-abr-o-co`, branch `main` |
| Homologação | https://site-abr-o-co.phimarquesadv.workers.dev/ |
| Produção (`abrao.co`) | ainda o site anterior, no Lovable — **nada de DNS foi tocado** |
| Hospedagem nova | Cloudflare Workers (static assets), projeto `site-abr-o-co` |

Cada `push` em `main` publica automaticamente no Workers. PRs ganham URL de
preview própria.

## O que foi feito

**Publicação.** O Cloudflare deixou de criar projetos Pages, então o site
passou a ser entregue pelo Workers: a pasta `out/` (export estático do Next)
vai para o CDN e o código em `worker/index.ts` roda só em `/api/*`. A
configuração está em `wrangler.jsonc`. A antiga `functions/api/lead.ts` foi
portada para o Worker com a mesma lógica — validação, armadilha anti-robô e
envio pelo Resend.

**Ferramental.** `npm run lint` voltou a funcionar (o `next lint` deixou de
existir no Next 16; agora é `eslint .` com `eslint.config.mjs`). O
`typescript` é um alias para a linha 6 enquanto o `typescript-eslint` não
suporta o compilador nativo — quando suportar, basta voltar para
`typescript@^7`. Há `engines` e `.node-version`.

**Formulário.** O registro por e-mail usa `keepalive`, para a requisição
sobreviver à navegação até o WhatsApp. O telefone digitado passou a entrar na
mensagem do WhatsApp.

**Produção.** `public/_headers` traz cabeçalhos de segurança. Sem CSP, de
propósito: o export estático injeta scripts inline sem nonce.

**Contato.** Confirmados em 17/09/2026 e centralizados em
`src/content/site.ts`: WhatsApp `+55 62 98134-7394` e caixa comercial
`contato@abrao.co`. O encarregado LGPD (`site.encarregado`) continua sendo o
sócio fundador — decisão de vocês.

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build      # gera out/
npx wrangler dev   # site + /api/lead como no Cloudflare, em :8787
```

Os três comandos de verificação passam em `main`. Vale rodá-los antes de
cada PR — não há CI configurada.

## O que ainda falta antes de apontar o domínio

Conteúdo e jurídico:

- `/termos/` ainda exibe o aviso "Minuta em revisão". Ou passa por revisão
  jurídica e o aviso sai, ou a página não entra.
- A caixa `contato@abrao.co` precisa existir no Google Workspace — o site já
  aponta para ela.
- Nota de período e critério nos números de histórico (R$ 500M / R$ 300M),
  marcada como pendente em `site.ts`.
- Licença de webfont da Gramatika (o site usa Figtree até lá); fotos de
  equipe e escritório.

Técnico:

- **Resend** (registro do lead por e-mail). Sem as três variáveis, a
  `/api/lead` responde 503 e o lead segue só pelo WhatsApp. Ao configurar,
  verificar no Resend um **subdomínio** (`envios.abrao.co`), não o domínio
  raiz — o SPF/DKIM do e-mail corporativo não pode ser tocado. A
  `RESEND_API_KEY` entra como Secret no painel do Worker.
- Abertura automática no NectarCRM: anotada como pendente em
  `worker/index.ts`, com o que precisa ser verificado antes.
- CI (typecheck + lint + build em PR), se quiserem.

## O domínio

É o passo que exige mais cuidado, e o README (seção *Domínio*) descreve o
levantamento e o checklist. Em resumo:

- `abrao.co` é domínio raiz sem `www`. O Cloudflare só serve o apex quando
  a **zona DNS está nele**, e o GoDaddy não faz CNAME/ALIAS na raiz.
- O e-mail corporativo está no Google Workspace com **DMARC `p=reject`** e um
  SPF cujo include mora dentro da própria zona. Migrar a zona sem recriar
  cada registro derruba o e-mail — não para o spam, para a recusa.
- A alternativa que não mexe em nameservers é hospedar em provedor com IP
  fixo (Vercel/Netlify) e trocar só o registro A no GoDaddy; custa portar o
  Worker.

Seja qual for o caminho: homologar tudo na URL do Workers antes, deixar o
Lovable no ar até o e-mail ser testado depois da virada, e manter os
nameservers antigos como rollback.
