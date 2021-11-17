import { Batch } from '../src/entities/batch'
import { OrderLine } from '../src/entities/order-line'

describe('Batch', () => {
  it('should reduce available quantity when allocated to an order line', () => {
    const batch = new Batch('batch-001', 'SMALL-TABLE', 20, new Date())
    const line = new OrderLine('order-ref', 'SMALL-TABLE', 2)
    batch.allocate(line)
    expect(batch.availableQuantity).toEqual(18)
  })
})
