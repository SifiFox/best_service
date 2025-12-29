export type PromotionExample = {
  title: string;
  description: string;
};

export type PromotionFaq = {
  question: string;
  answer: string;
};

export type PromotionDto = {
  slug: string;
  title: string;
  short_description: string;
  discount?: string;
  valid_until?: string;
  image: string;
  detail_image?: string;
  full_description: string;
  benefits: string[];
  terms: string[];
  how_to_use: string[];
  examples?: PromotionExample[];
  faq?: PromotionFaq[];
};

export type Promotion = {
  id?: string; // Optional or generated from slug
  slug: string;
  title: string;
  shortDescription: string;
  discount?: string;
  validUntil?: string;
  image: string;
  detailImage?: string;
  fullDescription: string;
  benefits: string[];
  terms: string[];
  howToUse: string[];
  examples?: PromotionExample[];
  faq?: PromotionFaq[];
};
