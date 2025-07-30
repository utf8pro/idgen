# @utf8pro/idgen

Numeric ID generator.

## Features
- Generates unique numeric (`bigint`) identifiers.
- Almost unique 😎 (enough for us).
- Contains `shardId` within the ID. 

## Installation
```bash
bun add @utf8pro/idgen
```

## Example

```typescript
import {createGenerator} from "@utf8pro/idgen"

const gen = createGenerator()

const
  id1 = gen.generate(1),
  id2 = gen.generate(64),
  id3 = gen.generate(3)

console.log(id1, id2, id3) // 14700234628111795201n 14700234628111859714n 14700234628111797251n

const
  shard1 = gen.shardId(id1),
  shard2 = gen.shardId(id2),
  shard3 = gen.shardId(id3)

console.log(shard1, shard2, shard3) // 1 64 3
```
