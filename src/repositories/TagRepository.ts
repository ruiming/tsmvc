import { Tag } from '../entities/Tag'
import { BadRequestError } from 'routing-controllers'
import {
  EntityRepository,
  Repository
} from 'typeorm'

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async getTagById (id: number): Promise<Tag> {
    const tag = await this.createQueryBuilder('tag')
                          .where('tag.id=:id', { id })
                          .getOne()

    if (!tag) {
      throw new BadRequestError('标签不存在')
    }

    return tag
  }

  async getTagList (): Promise<Tag[]> {
    const list = await this.createQueryBuilder('tag')
                           .getMany()
    return list
  }
}
