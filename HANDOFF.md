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

## O domínio — o que falta para concluir

Para o site novo virar o `abrao.co`, são dois passos, nesta ordem:

**1. Migrar a zona DNS do GoDaddy para o Cloudflare.** Não é transferir o
domínio: o GoDaddy continua como registrador. O que muda são os nameservers,
e a gestão dos registros passa para o painel do Cloudflare. É obrigatório —
domínio customizado em Workers só funciona com a zona no Cloudflare, e
`abrao.co` é raiz sem `www`, que o GoDaddy não consegue apontar por CNAME.

Antes de trocar os nameservers, **todos os registros precisam existir no
Cloudflare**, conferidos um a um: os 5 MX do Google Workspace, o TXT do SPF,
o TXT `dc-aa8e722993._spfm` (include do SPF, que mora dentro da própria
zona), o DKIM `google._domainkey`, o `_dmarc` e o google-site-verification.
O DMARC está em `p=reject`: registro esquecido não manda e-mail para o spam,
faz o e-mail ser recusado. O checklist completo está no README, seção
*Domínio*.

Depois da propagação, mandar um e-mail de `@abrao.co` para uma caixa externa
e conferir no cabeçalho se SPF, DKIM e DMARC passaram. Só então adicionar
`abrao.co` e `www.abrao.co` em Workers → o projeto → Settings → Domains &
Routes.

Rollback: voltar os nameservers no GoDaddy. A zona antiga fica lá intacta
enquanto ninguém apagar.

**2. Desativar o Lovable.** Só depois do passo 1 confirmado — site no ar no
domínio e e-mail testado. Enquanto o DNS não vira, o Lovable é o site em
produção e é o plano B.
