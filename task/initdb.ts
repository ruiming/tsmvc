import '../src/utils/config'
import { Test } from '../src/utils/Test'
import * as process from 'process'

(async () => {
  await Test.Instance.connect()
  await Test.Instance.mockData()
  process.exit()
})().catch((e: Error) => {
  console.log(e)
  process.exit()
})
