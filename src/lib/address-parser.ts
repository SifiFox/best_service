export type ParsedAddress = {
  street: string;
  house: string;
  city: string;
};

export type NominatimAddress = {
  city?: string;
  town?: string;
  village?: string;
  hamlet?: string;
  road?: string;
  house_number?: string;
  display_name?: string;
};

/**
 * Парсер адреса из структурированных данных Nominatim API
 * @param nominatimData - данные от Nominatim API
 * @returns объект с разобранными частями адреса
 */
export function parseNominatimAddress(nominatimData: {
  address?: NominatimAddress;
  display_name?: string;
}): ParsedAddress {
  const address = nominatimData.address;

  if (!address) {
    return parseAddress(nominatimData.display_name || '');
  }
  const city = address.city || address.town || address.village || address.hamlet || 'Екатеринбург';
  const street = address.road || '';
  const house = address.house_number || '';

  return {
    street,
    house,
    city,
  };
}

/**
 * Умный парсер адреса из строки, возвращаемой картами (fallback метод)
 * @param addressString - строка адреса, разделенная запятыми
 * @returns объект с разобранными частями адреса
 */
export function parseAddress(addressString: string): ParsedAddress {
  const addressParts = addressString.split(', ');

  let street = '';
  let house = '';
  let city = 'Екатеринбург';

  const cityKeywords = ['екатеринбург', 'пермь', 'москва', 'санкт-петербург', 'спб'];
  const cityIndex = addressParts.findIndex(part =>
    cityKeywords.some(keyword => part.toLowerCase().includes(keyword))
  );
  if (cityIndex !== -1) {
    city = addressParts[cityIndex] || 'Екатеринбург';
  }

  const streetKeywords = [
    'улица',
    'ул.',
    'проспект',
    'пр.',
    'переулок',
    'пер.',
    'бульвар',
    'бул.',
    'шоссе',
    'набережная',
    'наб.',
    'площадь',
    'пл.',
    'проезд',
    'тупик',
    'туп.',
  ];

  const streetIndex = addressParts.findIndex(part =>
    streetKeywords.some(keyword => part.toLowerCase().includes(keyword))
  );

  if (streetIndex !== -1) {
    street = addressParts[streetIndex] || '';
  }

  const houseIndex = addressParts.findIndex(part => {
    const trimmedPart = part.trim();

    const isHouseNumber = /^\d+[а-яёА-ЯЁ]?(\/\d+[а-яёА-ЯЁ]?)?$/.test(trimmedPart);

    const excludeKeywords = [
      'улица',
      'ул.',
      'проспект',
      'пр.',
      'переулок',
      'пер.',
      'бульвар',
      'бул.',
      'шоссе',
      'набережная',
      'наб.',
      'площадь',
      'пл.',
      'проезд',
      'тупик',
      'туп.',
      'екатеринбург',
      'пермь',
      'москва',
      'санкт-петербург',
      'спб',
      'район',
      'область',
      'округ',
      'россия',
    ];

    const isExcluded = excludeKeywords.some(keyword => trimmedPart.toLowerCase().includes(keyword));

    return isHouseNumber && !isExcluded;
  });

  if (houseIndex !== -1) {
    house = addressParts[houseIndex] || '';
  }

  return {
    street,
    house,
    city,
  };
}
