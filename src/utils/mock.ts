import * as faker from 'faker'
import { Article } from '../entities/Article'
import { Tag } from '../entities/Tag'

export function mockArticle (item?: Partial<Article>): Partial<Article> {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(5),
    thumbnail: faker.image.city(800, 300),
    ...item
  }
}

export function mockTag (item?: Partial<Tag>): Partial<Tag> {
  return {
    name: faker.lorem.word(),
    ...item
  }
}
