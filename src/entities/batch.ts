import { OrderLine } from './order-line'

export class Batch {
  public allocations = new Array<OrderLine>()

  constructor (
    public reference: string,
    public sku: string,
    public quantity: number,
    public eta?: Date,
    public purchasedQuantity = quantity
  ) {}

  get availableQuantity (): number {
    return this.purchasedQuantity - this.allocatedQuantity()
  }

  allocatedQuantity (): number {
    return this.allocations.reduce((partialSum, l: OrderLine) =>
      partialSum + l.quantity, 0)
  }

  allocate (line: OrderLine): void {
    if (this.canAllocate(line)) {
      this.allocations.push(line)
    }
  }

  canAllocate (line: OrderLine): boolean {
    return this.availableQuantity >= line.quantity &&
      this.sku === line.sku
  }

  deallocate (line: OrderLine): void {
    if (this.allocations.includes(line)) {
      const index = this.allocations.indexOf(line)
      this.allocations.splice(index)
    }
  }
}
