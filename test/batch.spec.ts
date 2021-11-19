import { Batch } from '../src/entities/batch'
import { OrderLine } from '../src/entities/order-line'

describe('Batch', () => {
  it('should reduce available quantity when allocated to an order line', () => {
    const batch = new Batch('batch-001', 'SMALL-TABLE', 20, new Date())
    const line = new OrderLine('order-ref', 'SMALL-TABLE', 2)
    batch.allocate(line)
    expect(batch.availableQuantity).toEqual(18)
  })

  it('should be able to allocate if available greater than required', () => {
    const { batch, line } = makeBatchAndLine('ELEGANT_LAMP', 20, 2)
    expect(batch.canAllocate(line)).toBeTruthy()
  })

  it('should not be able to allocate if available smaller than required', () => {
    const { batch, line } = makeBatchAndLine('ELEGANT_LAMP', 2, 20)
    expect(batch.canAllocate(line)).toBeFalsy()
  })

  it('should be able to allocate if available equal to required', () => {
    const { batch, line } = makeBatchAndLine('ELEGANT_LAMP', 2, 2)
    expect(batch.canAllocate(line)).toBeTruthy()
  })

  it('should not be able to allocate if skus do not match', () => {
    const batch = new Batch('batch-001', 'UNCOMFORTABLE-CHAIR', 100, undefined)
    const lineWithDifferentSku = new OrderLine('order-123', 'EXPENSIVE-TOASTER', 10)
    expect(batch.canAllocate(lineWithDifferentSku)).toBeFalsy()
  })

  it('should not be able to create batch without an ETA', () => {
    const batch = new Batch('batch-001', 'UNCOMFORTABLE-CHAIR', 100)
    expect(batch.eta).toBeUndefined()
  })
})

interface BatchAndLine { batch: Batch, line: OrderLine }

function makeBatchAndLine (sku: string, batchQuantity: number, lineQuantity: number): BatchAndLine {
  return {
    batch: new Batch('batch-001', sku, batchQuantity, new Date()),
    line: new OrderLine('order-123', sku, lineQuantity)
  }
}
