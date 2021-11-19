export class OrderLine {
  constructor (readonly orderId: string,
    readonly sku: string,
    readonly quantity: number) {}
}
