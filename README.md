# React TS boilerplate
Um começo rápido para criar projetos com React, basta clonar esse repositório, dar um `yarn install` e depois é só codar 😉

## Todo
- [x] Criar repositório
- [ ] Criar estrutura de pastas e arquivos
- [ ] Gerenciamento de usuário (autenticação e autorização)
- [ ] Layouts
- [ ] Rotas
- [ ] Testes

## Estrutura do projeto
### /public
Onde tudo que é estático fica, aqui também é onde o __index.html__ fica e traduções (na pasta __locale__)

### /src
* __index.tsx:__ Ponto de partida do React
* __react-app-env.d.ts:__ Definições do Typescript
* __i18n.ts:__ Definiçoes de internacionalização
* __/assets:__ Imagens, icones, estilos gerais, etc
* __/components:__ Componentes que são utilizados na aplicação
* __/routes:__ Declaração de rotas
* __/variables:__ Variáveis necessárias, como endpoints e chaves públicas necessários para o funcionamento da aplicação
* __/utils:__ Funções, hooks e outras coisas sem ma pasta específica
* __/pages:__ Estrutura e lógica das páginas
* __/layouts:__ Layouts (cabeçalhos, rodapés ou menus laterais) das rotas
* __/contexts:__ Providers e contexts da aplicação

