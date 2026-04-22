import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';

describe('DummyJSON Carts API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://dummyjson.com/carts';
  let createdCartId: number;

  p.request.setDefaultTimeout(90000);

  beforeAll(() => {
    p.reporter.add(rep);
  });

  afterAll(() => {
    p.reporter.end();
  });

  describe('Carts - Operations on Carts', () => {
    it('deve buscar todos os carrinhos (Get All Carts)', async () => {
      await p
        .spec()
        .get(baseUrl)
        .expectStatus(StatusCodes.OK)
        .expectHeaderContains('content-type', 'application/json')
        .expectJsonSchema({
          type: 'object',
          properties: {
            carts: { type: 'array' },
            total: { type: 'number' },
            skip: { type: 'number' },
            limit: { type: 'number' }
          },
          required: ['carts', 'total', 'skip', 'limit']
        });
    });

    it('deve criar um novo carrinho (Add Cart)', async () => {
      const quantity1 = faker.number.int({ min: 1, max: 5 });
      const quantity2 = faker.number.int({ min: 1, max: 5 });

      createdCartId = await p
        .spec()
        .post(`${baseUrl}/add`)
        .withJson({
          userId: 1,
          products: [
            {
              id: 1,
              quantity: quantity1
            },
            {
              id: 50,
              quantity: quantity2
            }
          ]
        })
        .expectStatus(StatusCodes.CREATED)
        .expectJsonSchema({
          type: 'object',
          properties: {
            id: { type: 'number' },
            products: { type: 'array' },
            total: { type: 'number' },
            userId: { type: 'number' }
          },
          required: ['id', 'products', 'userId']
        })
        .returns('id');
    });

    it('deve buscar um carrinho específico por ID (Get Single Cart)', async () => {
      // Como o DummyJSON não persiste as criações (é mock), usamos um ID fixo (ex: 1)
      const cartIdToFetch = 1;

      await p
        .spec()
        .get(`${baseUrl}/${cartIdToFetch}`)
        .expectStatus(StatusCodes.OK)
        .expectJsonMatch({
          id: cartIdToFetch
        });
    });

    it('deve buscar os carrinhos de um usuário específico (Get Carts by User)', async () => {
      const userId = 5;

      await p
        .spec()
        .get(`${baseUrl}/user/${userId}`)
        .expectStatus(StatusCodes.OK)
        .expectJsonSchema({
          type: 'object',
          properties: {
            carts: { type: 'array' }
          },
          required: ['carts']
        });
    });

    it('deve atualizar um carrinho existente (Update Cart)', async () => {
      const cartIdToUpdate = 1; // ID fixo, pois é um mock API

      await p
        .spec()
        .put(`${baseUrl}/${cartIdToUpdate}`)
        .withJson({
          merge: true, // this will merge with existing products
          products: [
            {
              id: 1,
              quantity: faker.number.int({ min: 1, max: 10 })
            }
          ]
        })
        .expectStatus(StatusCodes.OK)
        .expectJsonMatch({
          id: cartIdToUpdate
        });
    });

    it('deve deletar um carrinho (Delete Cart)', async () => {
      const cartIdToDelete = 1;

      await p
        .spec()
        .delete(`${baseUrl}/${cartIdToDelete}`)
        .expectStatus(StatusCodes.OK)
        .expectJsonMatch({
          id: cartIdToDelete,
          isDeleted: true
        });
    });
  });
});
