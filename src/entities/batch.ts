import { OrderLine } from './order-line'

export class Batch {
  private readonly allocations = new Array<OrderLine>()

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
      this.sku === line.sku &&
      !this.alreadyAllocated(line)
  }

  private alreadyAllocated (line: OrderLine): boolean {
    return this.findAllocated(line) !== undefined
  }

  private findAllocated (line: OrderLine): OrderLine {
    return this.allocations.find(allocatedLine =>
      allocatedLine.equals(line))
  }

  deallocate (line: OrderLine): void {
    const found = this.findAllocated(line)
    if (found !== undefined) {
      const index = this.allocations.indexOf(found)
      this.allocations.splice(index)
    }
  }
}
