export type VacancyCreateRequest = {
  name?: string | null;
  email?: string | null;
  phone: string;
  city: number | string;
};

export type VacancyCreateResponse = VacancyCreateRequest;
