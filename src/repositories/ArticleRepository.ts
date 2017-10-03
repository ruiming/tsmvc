import { Article } from '../entities/Article'
import { BadRequestError } from 'routing-controllers'
import { app } from 'config'
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

  async getArticleList (page: number = 0): Promise<Article[]> {
    const articles = await this.createQueryBuilder('article')
                               .leftJoinAndSelect('article.tags', 'tags')
                               .limit(app.perpage)
                               .offset(app.perpage * page)
                               .getMany()

    return articles
  }
}
