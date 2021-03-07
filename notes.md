# Next.js

## Start a new project (yarn or npx)
```
yarn create next-app nextjs-demo
npx create-next-app nextjs-demo-npx
```

## Add TypeScript
```
yarn add typescript @types/react @types/node -D
npm i typescript @types/react @types/node --save-dev
```
## Routes and Pages

> Devem estar na raiz da aplicação ou dentro da pasta "pages";

Cada arquivo criado representa uma rota, por exemplo:
* `src/pages/search.tsx`, no Browser seria acessado: http://localhost:3000/search
* `src/pages/catalog/products/product.tsx`, no Browser seria acessado: http://localhost:3000/catalog/products/product
* `src/pages/index.tsx`, seria a rota principal (Home)
* `src/pages/_app.tsx`, o underline na frente do nome do arquivo indicia que a rota não poderá ser acessada

## Dynamic Routes

Deve-se criar o nome do arquivo da seguinte forma para aceitar rotas dinâmicas (`[id].tsx`), por exemplo:
* `src/pages/catalog/products/[slug|id|qualquerNome].tsx`, no Browser seria acessado: http://localhost:3000/catalog/products/<slug|id|qualquerNome>

Para acessar o parâmetro via url, pode-se recuperar a informaçõa via hook `useRouter()`:
```tsx
import { useRouter } from 'next/router';

export default function Product() {

  const router = useRouter();

  return <h1>{router.query.slug}</h1>;
}
```

## Add styled-components
```
yarn add styled-components
yarn add @types/styled-components -D
```

* Setup babel
> https://github.com/vercel/next.js/blob/master/examples/with-styled-components/.babelrc
```
yarn add babel-plugin-styled-components -D
```
```js
// file: babel.config.js (root path)

module.exports = {
  presets: ["next/babel"],
  plugins: [["styled-components", { "ssr": true }]]
}
```

Create file src/pages/_documents.tsx (https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js)

## Fake Server (json-server)

Run json-server without install it
```
npx json-server server.json -p 3333 -w
// simulate a delay of 2 seconds (2000ms)
npx json-server server.json -p 3333 -w -d 2000
```

## SSR - Server Side Rendering

Faz sentido usar SSR quando um determinado conteúdo de uma página precisa ser indexado pelos motores de busca (SEO).

## Static Site Generation

Faz sentido usar quando uma página não sofrerá atualizações, por exemplo: posts de um blog.
Dado o exemplo, apenas na primeira vez que acessar um determinado post, será feito uma chamada ao back-end e as próximas chamadas subsequentes irão buscar as mesmas informações de forma estática sem necessidade de ir ao back-end novamente.

## Páginas estáticas dinâmicas

`getStaticPaths`

> As páginas estáticas são geradas no momento da build.

```tsx
export const getStaticPaths: GetStaticPaths = async () => {

  const response = await fetch('http://localhost:3333/categories');
  const categories = await response.json();

  const paths = categories.map(category => {
    return {
      params: { slug: category.id }
    }
  });

  return {
    paths: [], // dessa forma, após o primeiro acesso de qualquer usuário, os demais acessarão o conteúdo de forma estática.
    fallback: true,
  }
}
```