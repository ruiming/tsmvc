import { ArticleRepository } from '../repositories/ArticleRepository'
import { TagRepository } from '../repositories/TagRepository'
import { Article } from '../entities/Article'
import {
  Controller,
  Render,
  Param,
  Get
} from 'routing-controllers'
import {
  getConnection
} from 'typeorm'

@Controller()
export class IndexController {

  articleRepository: ArticleRepository = getConnection().getCustomRepository(ArticleRepository)
  tagRepository: TagRepository = getConnection().getCustomRepository(TagRepository)

  @Get('/:page([0-9]+)')
  @Render('index')
  async test (@Param('page') page: number): Promise<{
    message: Article[];
  }> {
    const articleList = await this.articleRepository.getArticleList(page)
    return {
      message: articleList
    }
  }
}
