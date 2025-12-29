import { BaseApi } from '@/shared/api/base-api';

import { Promotion, PromotionDto } from '../types';

export class PromotionApi extends BaseApi {
  private mapDtoToDomain(dto: PromotionDto): Promotion {
    return {
      slug: dto.slug,
      title: dto.title,
      shortDescription: dto.short_description,
      discount: dto.discount,
      validUntil: dto.valid_until,
      image: dto.image,
      detailImage: dto.detail_image || dto.image,
      fullDescription: dto.full_description,
      benefits: dto.benefits,
      terms: dto.terms,
      howToUse: dto.how_to_use,
      examples: dto.examples,
      faq: dto.faq,
    };
  }

  async getPromotions(): Promise<Promotion[]> {
    const dtos = await this.get<PromotionDto[]>('/promotions');
    return dtos.map(dto => this.mapDtoToDomain(dto));
  }

  async getPromotionBySlug(slug: string): Promise<Promotion> {
    const dto = await this.get<PromotionDto>(`/promotions/${slug}`);
    return this.mapDtoToDomain(dto);
  }
}

export const promotionApi = new PromotionApi();
