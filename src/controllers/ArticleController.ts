import { ArticleRepository } from '../repositories/ArticleRepository'
import { Article } from '../entities/Article'
import {
  Controller,
  Render,
  Get
} from 'routing-controllers'
import {
  getConnection
} from 'typeorm'

@Controller('/articles')
export class ArticleController {

  articleRepository: ArticleRepository = getConnection().getCustomRepository(ArticleRepository)

  @Get('/')
  @Render('articles')
  async test (): Promise<{
    articles: Article[];
  }> {
    const articles = await this.articleRepository.createQueryBuilder('articles').getMany()
    return {
      articles
    }
  }
}
