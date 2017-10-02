import { Article } from '../entities/Article'
import { BadRequestError } from 'routing-controllers'
import {
  EntityRepository,
  Repository
} from 'typeorm'

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async getArticleById (id: number): Promise<Article> {
    const article = await this.createQueryBuilder('article')
                              .where('article.id=:id', { id })
                              .leftJoinAndSelect('article.tags', 'tags')
                              .getOne()

    if (!article) {
      throw new BadRequestError('文章不存在')
    }

    return article
  }
}
