type TGenerator = {
  generate(shardId: number): bigint
  shardId(id: bigint): number
}

const epoch: bigint = 1474661123n

export function createGenerator(): TGenerator {
  let counter = 0n

  const generate = (shardId: number): bigint => {
    let id = (BigInt(Date.now()) - epoch) << 23n
    id = id | BigInt(shardId) << 10n
    id = id | (++counter % 1024n)
    return id
  }

  const shardId = (id: bigint): number => {
    let shardId = id >> 10n
    shardId = shardId & ((1n << 10n) - 1n)
    return Number(shardId)
  }

  return {generate, shardId}
}
