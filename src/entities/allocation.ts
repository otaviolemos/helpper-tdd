import { Either, left, right } from '../../shared/either'
import { Batch } from './batch'
import { InvalidBatchArrayError } from './error/invalid-batch-array-error'
import { OutOfStockError } from './error/out-of-stock-error'
import { OrderLine } from './order-line'

export function allocate (line: OrderLine, batches: Batch[]):
Either<OutOfStockError | InvalidBatchArrayError, string> {
  if (empty(batches)) return left(new InvalidBatchArrayError())

  const allocatableBatches = batches.filter(batch => batch.canAllocate(line))
  const batchesSortedByEta = allocatableBatches.sort(compareBatchesByEta)

  if (empty(batchesSortedByEta)) return left(new OutOfStockError(line.sku))

  const selectedBatch = batchesSortedByEta[0]
  selectedBatch.allocate(line)
  return right(selectedBatch.reference)
}

function empty (batches: Batch[]): boolean {
  return batches === undefined || batches === null || batches.length === 0
}

function compareBatchesByEta (b1: Batch, b2: Batch): number {
  if (b1.eta === undefined || b1.eta < b2.eta) return -1
  if (b2.eta === undefined || b1.eta > b2.eta) return 1
  return 0
}
