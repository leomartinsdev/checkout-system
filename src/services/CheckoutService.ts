import CheckoutModel from '../models/CheckoutModel';
import ICheckoutModel from '../types/ICheckoutModel';
import { IProduct } from '../types/IProduct';

interface GroupedProduct {
  sku: string;
  name: string;
  price: number;
  quantity: number;
}

export default class CheckoutService {
  constructor(private checkoutModel: ICheckoutModel = new CheckoutModel()) {}

  public async findAll(): Promise<any> {
    try {
      const products = await this.checkoutModel.findAll();

      return {
        status: 200,
        data: products,
      };
    } catch (error) {
      throw error;
    }
  }

  public async checkTotalPrice(items: string[]): Promise<any> {
    try {
      const foundProducts: IProduct[] = [];

      for (const item of items) {
        const product =
          (await this.checkoutModel.getBySku(item)) ||
          (await this.checkoutModel.getByName(item));

        if (!product) {
          throw new Error(`Product not found: ${item}`);
        }

        foundProducts.push(product);
      }

      const total = this.calculateTotal(foundProducts);

      return {
        status: 200,
        data: {
          scannedItems: foundProducts,
          total,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  private calculateTotal(products: IProduct[]): number {
    const grouped: GroupedProduct[] = Object.values(
      products.reduce((acc, product) => {
        if (!acc[product.sku]) {
          acc[product.sku] = {
            sku: product.sku,
            quantity: 0,
            price: product.price,
            name: product.name,
          };
        }
        acc[product.sku].quantity += 1;
        return acc;
      }, {} as Record<string, GroupedProduct>)
    );

    let total = 0;

    const googleHome = grouped.find((p) => p.sku === '120P90');
    if (googleHome) {
      const sets = Math.floor(googleHome.quantity / 3);
      const remainder = googleHome.quantity % 3;
      total += (sets * 2 + remainder) * googleHome.price;
    }

    const macBook = grouped.find((p) => p.sku === '43N23P');
    const raspberryPi = grouped.find((p) => p.sku === '344222');
    if (macBook) {
      total += macBook.quantity * macBook.price;
      if (raspberryPi) {
        const freeCount = Math.min(raspberryPi.quantity, macBook.quantity);
        raspberryPi.quantity -= freeCount;
      }
    }

    const alexa = grouped.find((p) => p.sku === 'A304SD');
    if (alexa) {
      const discount = alexa.quantity > 3 ? 0.9 : 1;
      total += alexa.quantity * alexa.price * discount;
    }

    if (raspberryPi && raspberryPi.quantity > 0) {
      total += raspberryPi.quantity * raspberryPi.price;
    }

    return Number(total.toFixed(2));
  }
}
