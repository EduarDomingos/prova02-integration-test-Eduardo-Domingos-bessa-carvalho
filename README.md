# Automação de testes de API com Jest e PactumJS

> Integração simples entre JestJS e PactumJS.

## GitHub Actions

[![Node.js CI](https://github.com/ugioni/integration-tests-jest/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/ugioni/integration-tests-jest/actions/workflows/node.js.yml)

## SonarCloud

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ugioni_integration-tests-jest&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ugioni_integration-tests-jest)

# Guia de Início

### Documentação do Pactum:
 - [PactumJS](https://pactumjs.github.io/)

### Pré-requisitos:
 - NodeJS `v22`

### Como executar?

Dentro da pasta do projeto, execute:

 1. `npm install`
 2. `npm run ci`
 3. `npx jest test/dummy_carts.spec.ts`



### Documentação da API em teste:
 - [Dummyjson Carts API](https://dummyjson.com/docs/carts)

### Como rodar os testes?

Para rodar especificamente o arquivo de teste `dummy_carts`, use o seguinte comando:

```bash
npx jest test/dummy_carts.spec.ts
```

### Como funciona o arquivo `dummy_carts.spec.ts`:

Este arquivo de teste valida a **DummyJSON Carts API** usando **PactumJS** para requisições e validações, e `@faker-js/faker` para gerar dados dinâmicos.

A suíte de testes cobre as seguintes operações de carrinho (carts):
- **GET /carts**: Busca todos os carrinhos e valida a estrutura com base nas propriedades esperadas (`carts`, `total`, `skip`, `limit`).
- **POST /carts/add**: Cria um novo carrinho com quantidades aleatórias de produtos usando o faker, validando o status `201 CREATED` ou `200 OK` e garantindo o schema retornado contendo os IDs do carrinho mockado.
- **GET /carts/{id}**: Valida o payload ao buscar um único carrinho por um ID específico.
- **GET /carts/user/{userId}**: Verifica se a API filtra corretamente e retorna um array de carrinhos para o ID de um usuário específico.
- **PUT /carts/{id}**: Testa a funcionalidade de atualização do carrinho, mesclando novos produtos a ele.
- **DELETE /carts/{id}**: Confirma que um carrinho específico pode ser sinalizado como deletado com sucesso (`isDeleted: true`).
