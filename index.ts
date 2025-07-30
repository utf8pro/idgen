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

const gen = createGenerator()

const id1 = gen.generate(1),
  id2 = gen.generate(64),
  id3 = gen.generate(3)

console.log(id1, id2, id3)

const shard1 = gen.shardId(id1),
  shard2 = gen.shardId(id2),
  shard3 = gen.shardId(id3)

console.log(shard1, shard2, shard3)

