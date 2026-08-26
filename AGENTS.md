# Cardoso3D - Instruções de Desenvolvimento

Este projeto foi configurado para ser exportado e mantido via GitHub. Abaixo estão as diretrizes essenciais para garantir a integridade do site:

## Ativos e Imagens
- **Pasta `/public/images`**: Esta pasta contém todos os assets visuais, ícones e mockups 3D essenciais para a interface.
- **Regra de Manutenção**: NUNCA exclua ou ignore esta pasta no Git. Ela deve ser sempre preservada e rastreada, pois o Vite depende dela para servir arquivos estáticos na raiz do build.
- **Novos Assets**: Sempre adicione novas imagens de produtos ou banners nesta pasta para manter a organização.

## Scripts e Build
- `npm install`: Instala todas as dependências necessárias (React, Tailwind v4, Motion, Lucide).
- `npm run build`: Gera a pasta `dist/` otimizada para deploy.
- `npm run dev`: Inicia o servidor de desenvolvimento local.

## Deploy
- O projeto utiliza **Vite** e **Tailwind CSS v4**.
- Ao fazer deploy na **Vercel** ou **Netlify**, o framework será detectado automaticamente como Vite.
- Se for fazer deploy no **GitHub Pages**, certifique-se de configurar a propriedade `base` no `vite.config.ts` caso o site não esteja na raiz do domínio.
