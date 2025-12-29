/**
 * Форматирует номер телефона в российском формате
 * @param value - номер телефона (только цифры)
 * @returns отформатированный номер телефона
 */
export function formatPhoneNumber(value: string): string {
  // Убираем все нецифровые символы
  const cleaned = value.replace(/\D/g, '');

  // Если номер начинается с 8, заменяем на +7
  let formatted = cleaned;
  if (formatted.startsWith('8')) {
    formatted = '7' + formatted.slice(1);
  }

  // Добавляем +7 если номер не начинается с 7
  if (!formatted.startsWith('7')) {
    formatted = '7' + formatted;
  }

  // Форматируем по маске +7 (XXX) XXX-XX-XX
  if (formatted.length >= 1) {
    formatted = '+' + formatted.slice(0, 1);
  }
  if (formatted.length >= 4) {
    formatted = formatted.slice(0, 2) + ' (' + formatted.slice(2, 5);
  }
  if (formatted.length >= 7) {
    formatted = formatted + ') ' + formatted.slice(7, 10);
  }
  if (formatted.length >= 10) {
    formatted = formatted + '-' + formatted.slice(10, 12);
  }
  if (formatted.length >= 12) {
    formatted = formatted + '-' + formatted.slice(12, 14);
  }

  return formatted;
}

/**
 * Проверяет, является ли номер телефона валидным
 * @param value - номер телефона
 * @returns true если номер валидный
 */
export function isValidPhoneNumber(value: string): boolean {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.length === 11 && cleaned.startsWith('7');
}

/**
 * Извлекает только цифры из номера телефона
 * @param value - номер телефона
 * @returns только цифры
 */
export function extractPhoneDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Нормализует номер телефона для отправки на сервер
 * @param value - номер телефона
 * @returns нормализованный номер в формате +7XXXXXXXXXX
 */
export function normalizePhoneNumber(value: string): string {
  const cleaned = extractPhoneDigits(value);

  if (cleaned.startsWith('8')) {
    return '+7' + cleaned.slice(1);
  }

  if (cleaned.startsWith('7')) {
    return '+7' + cleaned.slice(1);
  }

  return '+7' + cleaned;
}
