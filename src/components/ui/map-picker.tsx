'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import { Button } from './button';
import { Input } from './input';

// Динамически загружаем компоненты карты для избежания SSR проблем
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
  ssr: false,
  loading: () => <div className="h-80 animate-pulse rounded-lg bg-gray-100" />,
});

const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), {
  ssr: false,
});

const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), {
  ssr: false,
});

// Компонент для обработки кликов по карте
const MapClickHandler = dynamic(
  () =>
    Promise.resolve(function MapClickHandlerComponent({
      onMapClick,
    }: {
      onMapClick: (lat: number, lng: number) => void;
    }) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useMapEvents } = require('react-leaflet');

      useMapEvents({
        click: (e: { latlng: { lat: number; lng: number } }) => {
          onMapClick(e.latlng.lat, e.latlng.lng);
        },
      });

      return null;
    }),
  { ssr: false }
);

// Компонент для центрирования карты на выбранной позиции
const MapViewController = dynamic(
  () =>
    Promise.resolve(function MapViewControllerComponent({
      position,
    }: {
      position: [number, number] | null;
    }) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useMap } = require('react-leaflet');
      const map = useMap();

      useEffect(() => {
        if (position) {
          map.setView(position, 15);
        }
      }, [position, map]);

      return null;
    }),
  { ssr: false }
);

type MapPickerProps = {
  onAddressSelect: (
    address: string,
    lat: number,
    lng: number,
    nominatimData?: NominatimData | null
  ) => void;
  onClose: () => void;
};

export default function MapPicker({ onAddressSelect, onClose }: MapPickerProps) {
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [nominatimData, setNominatimData] = useState<NominatimData | null>(null);

  // Координаты Екатеринбурга
  const ekaterinburgCenter: [number, number] = [56.8431, 60.6454];

  // Настройка иконок Leaflet
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const L = require('leaflet');

      // Исправляем проблему с иконками в Next.js
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  const handleMapClick = async (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
    setIsLoading(true);

    try {
      // Обратное геокодирование через Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ru`
      );
      const data = await response.json();

      if (data.display_name) {
        setAddress(data.display_name);
        setNominatimData(data);
      } else {
        setAddress(`Координаты: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        setNominatimData(null);
      }
    } catch {
      setAddress(`Координаты: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedPosition && address) {
      onAddressSelect(address, selectedPosition[0], selectedPosition[1], nominatimData);
      onClose();
    }
  };

  const handleManualAddressSearch = async () => {
    if (!manualAddress.trim()) return;

    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          manualAddress
        )}&limit=1&accept-language=ru&countrycodes=ru`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);

        setSelectedPosition([lat, lng]);
        setAddress(result.display_name);
      } else {
        alert('Адрес не найден. Попробуйте изменить запрос.');
      }
    } catch {
      alert('Ошибка при поиске адреса. Попробуйте еще раз.');
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleManualAddressKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleManualAddressSearch();
    }
  };

  return (
    <div className="space-y-4">
      {/* Поле ввода адреса */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Введите адрес или выберите на карте:</label>
        <div className="flex gap-2">
          <Input
            className="flex-1"
            onChange={e => setManualAddress(e.target.value)}
            onKeyPress={handleManualAddressKeyPress}
            placeholder="Например: г. Екатеринбург, ул. Ленина, 15"
            type="text"
            value={manualAddress}
          />
          <Button
            className="px-4"
            disabled={!manualAddress.trim() || isGeocoding}
            onClick={handleManualAddressSearch}
            variant="outline"
          >
            {isGeocoding ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-transparent" />
            ) : (
              'Найти'
            )}
          </Button>
        </div>
      </div>

      {/* Карта */}
      <div className="h-80 overflow-hidden rounded-lg border">
        <MapContainer
          center={ekaterinburgCenter}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          zoom={12}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler onMapClick={handleMapClick} />
          <MapViewController position={selectedPosition} />

          {selectedPosition && (
            <Marker position={selectedPosition}>
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">Выбранный адрес:</div>
                  <div className="mt-1">{address}</div>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Выбранный адрес */}
      <div className="flex h-[100px] flex-col rounded-lg border border-primary/30 bg-primary/10 p-3">
        {selectedPosition ? (
          <>
            <div className="flex-shrink-0 text-sm font-medium text-[#1F5400]">Выбранный адрес:</div>
            <div className="mt-1 flex flex-1 items-start overflow-hidden text-sm text-[#2E7D00]">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-600 border-t-transparent" />
                  <span>Определение адреса...</span>
                </div>
              ) : (
                <div
                  className="leading-relaxed break-words"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {address}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Кликните на карте для выбора адреса
          </div>
        )}
      </div>

      {/* Кнопки */}
      <div className="flex justify-end gap-2">
        <Button onClick={onClose} variant="outline">
          Отмена
        </Button>
        <Button disabled={!selectedPosition || isLoading} onClick={handleConfirm}>
          Подтвердить адрес
        </Button>
      </div>

      <div className="text-xs text-gray-500">
        Введите адрес в поле выше или кликните на карте для выбора точного адреса доставки
      </div>
    </div>
  );
}

type NominatimData = {
  display_name?: string;
  lat?: string;
  lon?: string;
  address?: Record<string, string>;
  [key: string]: unknown;
};
