import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../src/app';
import db from '../../src/database/models';
chai.use(chaiHttp);

describe('Checkout API Integration Tests', () => {
  beforeAll(async () => {
    await db.sync();
  });

  afterAll(async () => {
    await db.close();
  });

  describe('POST /checkout', () => {
    it('should calculate total for MacBook Pro with free Raspberry Pi', async () => {
      const response = await chai
        .request(app)
        .post('/checkout')
        .send({
          items: ['43N23P', '344222'],
        });

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('total');
      expect(response.body.total).to.equal(5399.99);
      expect(response.body.scannedItems).to.have.lengthOf(2);
    });

    it('should calculate total for 3 Google Homes with buy 2 get 1 free', async () => {
      const response = await chai
        .request(app)
        .post('/checkout')
        .send({
          items: ['120P90', '120P90', '120P90'],
        });

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('total');
      expect(response.body.total).to.equal(99.98);
      expect(response.body.scannedItems).to.have.lengthOf(3);
    });

    it('should return 404 for non-existent product', async () => {
      const response = await chai
        .request(app)
        .post('/checkout')
        .send({
          items: ['INVALID-SKU'],
        });

      expect(response).to.have.status(404);
      expect(response.body).to.equal('Product not found INVALID-SKU');
    });

    it('should return 400 for invalid request body', async () => {
      const response = await chai.request(app).post('/checkout').send({
        items: 'not-an-array',
      });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });
  });
});
