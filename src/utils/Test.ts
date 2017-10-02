import 'reflect-metadata'
import { ArticleRepository } from '../repositories/ArticleRepository'
import { TagRepository } from '../repositories/TagRepository'
import * as mock from './mock'
import { IncomingMessage, ServerResponse } from 'http'
import {
  getConnection
} from 'typeorm'

export class Test {
  private static _instance: Test

  public tagRepository: TagRepository
  public articleRepository: ArticleRepository
  public app: (req: IncomingMessage, res: ServerResponse) => void

  private constructor () { }

  public static get Instance (): Test {
    return this._instance || (this._instance = new this())
  }

  public async close (): Promise<void> {
    await getConnection().close()
  }

  public async connect (): Promise<void> {
    const { connection } = await import('../index')
    this.app = await connection
    await this.setRepository()
  }

  public async setRepository (): Promise<void> {
    this.tagRepository = getConnection().getCustomRepository(TagRepository)
    this.articleRepository = getConnection().getCustomRepository(ArticleRepository)
  }

  public async mockData (): Promise<void> {
    const tags = await this.tagRepository.save(this.tagRepository.create([
      mock.mockTag(), mock.mockTag(), mock.mockTag(), mock.mockTag(),
      mock.mockTag(), mock.mockTag(), mock.mockTag(), mock.mockTag()
    ]))

    for (let i = 0; i < 10; ++i) {
      await this.articleRepository.save(this.articleRepository.create([
        mock.mockArticle({ tags: tags.filter(() => Math.random() > 0.5) }),
        mock.mockArticle({ tags: tags.filter(() => Math.random() > 0.5) }),
        mock.mockArticle({ tags: tags.filter(() => Math.random() > 0.5) }),
        mock.mockArticle({ tags: tags.filter(() => Math.random() > 0.5) })
      ]))
    }
  }
}
