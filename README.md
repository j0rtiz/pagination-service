## **Pagination**

## Overview

Serviço de paginação.

## Main features

-   Receber a página atual e a quantidade de páginas;
-   Retornar um array com paginação.

## Main frameworks

-   [Node.js](https://github.com/nodejs/node)
-   [Awilix](https://github.com/jeffijoe/awilix)
-   [Express](https://github.com/expressjs/express)
-   [Morgan](https://github.com/expressjs/morgan)
-   [Axios](https://github.com/axios/axios)
-   [Joi](https://github.com/sideway/joi)
-   [Winston](https://github.com/winstonjs/winston)
-   [Eslint](https://github.com/eslint/eslint)
-   [Jest](https://github.com/facebook/jest)

## Hand's on

### Running Locally

Criar um arquivo .env com base em .env.copy, setar as variáveis de ambiente e inicializar a aplicação.

```shell
$ npm run dev
```

### Running on Docker

Inicializar docker-compose.yml disponível na raiz do projeto.

```shell
$ docker-compose up -d
```

### Running unit tests

Inicializar os testes unitários.

```shell
$ npm run test:unit
```

## Internal documentation

https://git.rarolabs.com.br/-/snippets/308.

## Flow

Não definido.

## Artefacts

-   Linguagem predominante de desenvolvimento Javascript.

## Resources

Memória RAM: ~60MB\
Processamento: 0.01%\
Espaço em disco: 120mb

## Protocols

-   HTTP

## Ports

-   3000

## Environment variables

| Nome                | Descricao                  | Padrão          | Exemplo |
| ------------------- | -------------------------- | --------------- | ------- |
| NODE_ENV            | Tipo de ambiente Node      | -               | develop |
| APP_PORT            | Porta da aplicação         | 3000            | -       |
| APP_LOGS_PATH       | Caminho do arquivo de logs | ./logs/info.log | -       |
| STACK_VISIBLE_ERROR | Exibir stack de erros      | -               | true    |

## Cluster

-   Quantidade de instancias padrão: 1.

### Database

Não possui.

## If the service stops, what happens?

1. Não poderá receber a página atual e a quantidade de páginas;
2. Não poderá retornar um array com paginação.

## If the service is down, what should be done?

**Verification checklist**

-   Identificar os logs;
-   Reiniciar serviço;
-   Verificar se as dependências estão funcionando.
