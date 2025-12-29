import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const oswaldStyle = {
  fontFamily: 'var(--font-oswald) !important',
};

/**
 * Форматирует цену из копеек в рубли с разделителем
 * @param priceInKopecks - цена в копейках
 * @returns строка с отформатированной ценой в рублях
 */
export function formatPrice(priceInKopecks: number): string {
  const priceInRubles = priceInKopecks / 100;
  return priceInRubles.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Форматирует дату в человекочитаемый формат
 * @param date - дата в виде строки или объекта Date
 * @returns строка с относительным временем (сегодня, вчера, неделю назад и т.д.)
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const targetDate = new Date(date);

  // Проверяем валидность даты
  if (isNaN(targetDate.getTime())) {
    return 'Неверная дата';
  }

  const diffInMs = now.getTime() - targetDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  // Если дата в будущем
  if (diffInMs < 0) {
    return targetDate.toLocaleDateString('ru-RU');
  }

  // Менее минуты
  if (diffInSeconds < 60) {
    return 'только что';
  }

  // Менее часа
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${getMinuteWord(diffInMinutes)} назад`;
  }

  // Менее суток
  if (diffInHours < 24) {
    return `${diffInHours} ${getHourWord(diffInHours)} назад`;
  }

  // Сегодня
  if (diffInDays === 0) {
    return 'сегодня';
  }

  // Вчера
  if (diffInDays === 1) {
    return 'вчера';
  }

  // Менее недели
  if (diffInDays < 7) {
    return `${diffInDays} ${getDayWord(diffInDays)} назад`;
  }

  // Менее месяца
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${getWeekWord(diffInWeeks)} назад`;
  }

  // Менее года
  if (diffInMonths < 12) {
    return `${diffInMonths} ${getMonthWord(diffInMonths)} назад`;
  }

  // Больше года
  return `${diffInYears} ${getYearWord(diffInYears)} назад`;
}

/**
 * Возвращает правильное склонение слова "минута"
 */
function getMinuteWord(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'минуту';
  }
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'минуты';
  }
  return 'минут';
}

/**
 * Возвращает правильное склонение слова "час"
 */
function getHourWord(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'час';
  }
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'часа';
  }
  return 'часов';
}

/**
 * Возвращает правильное склонение слова "день"
 */
function getDayWord(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'день';
  }
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'дня';
  }
  return 'дней';
}

/**
 * Возвращает правильное склонение слова "неделя"
 */
function getWeekWord(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'неделю';
  }
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'недели';
  }
  return 'недель';
}

/**
 * Возвращает правильное склонение слова "месяц"
 */
function getMonthWord(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'месяц';
  }
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'месяца';
  }
  return 'месяцев';
}

/**
 * Возвращает правильное склонение слова "год"
 */
function getYearWord(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'год';
  }
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'года';
  }
  return 'лет';
}

export function getFullName(firstName: string | null, lastName: string | null): string {
  if (!firstName && !lastName) return '';
  return `${firstName || ''} ${lastName || ''}`.trim();
}
