import CheckoutService from '../../src/services/CheckoutService';
import { IProduct } from '../../src/types/IProduct';
import CheckoutModel from '../../src/models/CheckoutModel';
import { mock } from 'jest-mock-extended';

describe('CheckoutService', () => {
  let checkoutService: CheckoutService;
  let mockCheckoutModel: jest.Mocked<CheckoutModel>;

  beforeEach(() => {
    checkoutService = new CheckoutService();
    mockCheckoutModel = mock<CheckoutModel>();
  });

  describe('Test calculateTotal method', () => {
    it('should calculate total for MacBook Pro with free Raspberry Pi', () => {
      const cart: IProduct[] = [
        {
          id: 1,
          name: 'MacBook Pro',
          price: 5399.99,
          sku: '43N23P',
        },
        {
          id: 2,
          name: 'Raspberry Pi B',
          price: 30.0,
          sku: '344222',
        },
      ];

      const total = checkoutService.calculateTotal(cart);
      expect(total).toBe(5399.99);
    });

    it('should apply buy 3 pay 2 promotion for Google Home', () => {
      const cart: IProduct[] = [
        {
          id: 3,
          name: 'Google Home',
          price: 49.99,
          sku: '120P90',
        },
        {
          id: 3,
          name: 'Google Home',
          price: 49.99,
          sku: '120P90',
        },
        {
          id: 3,
          name: 'Google Home',
          price: 49.99,
          sku: '120P90',
        },
      ];

      const total = checkoutService.calculateTotal(cart);
      expect(total).toBe(99.98);
    });

    it('should apply 10% discount when buying more than 3 Alexa Speakers', () => {
      const cart: IProduct[] = [
        {
          id: 4,
          name: 'Alexa Speaker',
          price: 109.5,
          sku: 'A304SD',
        },
        {
          id: 4,
          name: 'Alexa Speaker',
          price: 109.5,
          sku: 'A304SD',
        },
        {
          id: 4,
          name: 'Alexa Speaker',
          price: 109.5,
          sku: 'A304SD',
        },
        {
          id: 4,
          name: 'Alexa Speaker',
          price: 109.5,
          sku: 'A304SD',
        },
      ];

      const total = checkoutService.calculateTotal(cart);
      expect(total).toBe(394.2);
    });

    it('should handle multiple promotions in the same cart', () => {
      const cart: IProduct[] = [
        {
          id: 1,
          name: 'MacBook Pro',
          price: 5399.99,
          sku: '43N23P',
        },
        {
          id: 2,
          name: 'Raspberry Pi B',
          price: 30.0,
          sku: '344222',
        },
        {
          id: 3,
          name: 'Google Home',
          price: 49.99,
          sku: '120P90',
        },
        {
          id: 3,
          name: 'Google Home',
          price: 49.99,
          sku: '120P90',
        },
        {
          id: 3,
          name: 'Google Home',
          price: 49.99,
          sku: '120P90',
        },
      ];

      const total = checkoutService.calculateTotal(cart);
      expect(total).toBe(5499.97);
    });

    it('should calculate total for empty cart', () => {
      const total = checkoutService.calculateTotal([]);
      expect(total).toBe(0);
    });
  });

  describe('Test checkTotalPrice method', () => {
    const mockMacBookPro: IProduct = {
      id: 1,
      name: 'MacBook Pro',
      price: 5399.99,
      sku: '43N23P',
    };

    const mockGoogleHome: IProduct = {
      id: 2,
      name: 'Google Home',
      price: 49.99,
      sku: '120P90',
    };

    it('should calculate total price when using SKUs', async () => {
      mockCheckoutModel.getBySku.mockResolvedValueOnce(mockMacBookPro);
      mockCheckoutModel.getBySku.mockResolvedValueOnce(mockGoogleHome);

      const result = await checkoutService.checkTotalPrice([
        '43N23P',
        '120P90',
      ]);

      expect(result.status).toBe(200);
      expect(result.data).toBeDefined();
      expect(result.data.total).toBe(5449.98);
    });

    it('should calculate total price when using product names', async () => {
      mockCheckoutModel.getBySku.mockResolvedValue(null);
      mockCheckoutModel.getByName.mockResolvedValueOnce(mockMacBookPro);
      mockCheckoutModel.getByName.mockResolvedValueOnce(mockGoogleHome);

      const result = await checkoutService.checkTotalPrice([
        'MacBook Pro',
        'Google Home',
      ]);

      expect(result.status).toBe(200);
      expect(result.data).toBeDefined();
      expect(result.data.total).toBe(5449.98);
    });

    it('should calculate total price with mixed SKUs and names', async () => {
      mockCheckoutModel.getBySku.mockResolvedValueOnce(mockMacBookPro);
      mockCheckoutModel.getBySku.mockResolvedValueOnce(null);
      mockCheckoutModel.getByName.mockResolvedValueOnce(mockGoogleHome);

      const result = await checkoutService.checkTotalPrice([
        '43N23P',
        'Google Home',
      ]);

      expect(result.status).toBe(200);
      expect(result.data).toBeDefined();
      expect(result.data.total).toBe(5449.98);
    });

    it('should handle invalid items', async () => {
      mockCheckoutModel.getBySku.mockResolvedValue(null);
      mockCheckoutModel.getByName.mockResolvedValue(null);

      const result = await checkoutService.checkTotalPrice(['INVALID']);

      expect(result.status).toBe(404);
      expect(result.data).toBe(`Product not found ${'INVALID'}`);
    });

    it('should handle empty array', async () => {
      const result = await checkoutService.checkTotalPrice([]);

      expect(result.status).toBe(200);
      expect(result.data.total).toBe(0);
    });
  });
});
