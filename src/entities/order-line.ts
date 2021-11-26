export class OrderLine {
  constructor (readonly orderId: string,
    readonly sku: string,
    readonly quantity: number) {
    Object.freeze(this)
  }

  equals (other: OrderLine): boolean {
    return this.orderId === other.orderId &&
      this.sku === other.sku &&
      this.quantity === other.quantity
  }
}
