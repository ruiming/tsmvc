import {
  Controller,
  Render,
  Get
} from 'routing-controllers'

@Controller('/')
export class ArticleController {
  @Get('/')
  @Render('index.twig')
  async test () {
    return {
      message: 'Ruiming'
    }
  }
}
