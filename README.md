## **Node Microservice Seed**

## Overview

Serviço responsável por fazer alguma coisa.

## Main features

-   Receber um dado;
-   Armazenar o dado no banco de dados.

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

Inicializar docker-compose.yml disponível na raiz do projeto.

```shell
$ docker-compose up -d
```

## Internal documentation

Não possui.

## Flow

Não definido.

## Artefacts

-   Linguagem predominante de desenvolvimento Javascript;
-   Banco de dados MongoDB.

## Resources

Memória RAM: ~60MB\
Processamento: 0.01%\
Espaço em disco: 120mb

## Protocols

-   HTTP

## Ports

-   3000

## Environment variables

| Nome                      | Descricao                      | Padrão          | Exemplo   |
| ------------------------- | ------------------------------ | --------------- | --------- |
| NODE_ENV                  | Tipo de ambiente Node          | -               | develop   |
| APP_PORT                  | Porta da aplicação             | 3000            | -         |
| APP_LOGS_PATH             | Caminho do arquivo de logs     | ./logs/info.log | -         |
| STACK_VISIBLE_ERROR       | Exibir stack de erros          | -               | true      |
| GRAYLOG_HOST              | Host do gerenciador de logs    | -               | localhost |
| GRAYLOG_PORT              | Porta do gerenciador de logs   | -               | 5555      |
| {TYPE}\_MONGO_DB_USERNAME | Usuário do MongoDB             | -               | -         |
| {TYPE}\_MONGO_DB_PASSWORD | Senha do MongoDB               | -               | -         |
| {TYPE}\_MONGO_DB_NAME     | Nome da coleção do MongoDB     | -               | -         |
| {TYPE}\_MONGO_DB_SERVERS  | Endereço do MongoDB            | -               | -         |
| {TYPE}\_MONGO_DB_REPLICAS | Númerio de réplicas do MongoDB | -               | -         |
| AWS_REGION                | Região da AWS                  | us-east-1       | -         |
| AWS_API_VERSION           | Versão da API AWS              | 2012-11-05      | -         |

## Cluster

-   Quantidade de instancias padrão: 1

### Database

Nome: MongoDB
Versão: 8

## If the service stops, what happens?

1. Não poderá receber um dado;
2. Não poderá salvar o dado no banco de dados.

## If the service is down, what should be done?

**Verification checklist**

-   Identificar os logs;
-   Reiniciar serviço;
-   Verificar se as dependências estão funcionando;
-   Identificar o log de outros serviços que podem estar causando erros.
