export class OutOfStockError extends Error {
  constructor (sku: string) {
    super('Out of stock: ' + sku + '.')
  }
}
