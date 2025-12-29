'use client';

import React, { forwardRef, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Input } from './input';

type PhoneInputProps = {
  value?: string;
  onChange?: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value = '', onChange, ...props }, ref) => {
    const formatPhoneNumber = (input: string, type: 'plus7' | 'eight'): string => {
      const digits = input.replace(/\D/g, '');

      if (type === 'plus7') {
        // Формат: +7 (XXX) XXX-XX-XX
        if (digits.length === 0) return '';
        if (digits.length === 1) return '+7 (';
        if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
        if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
        if (digits.length <= 9)
          return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
        return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
      } else {
        // Формат: 8 (XXX) XXX-XX-XX
        if (digits.length === 0) return '';
        if (digits.length === 1) return '8 (';
        if (digits.length <= 4) return `8 (${digits.slice(1)}`;
        if (digits.length <= 7) return `8 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
        if (digits.length <= 9)
          return `8 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
        return `8 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
      }
    };

    // Инициализируем состояние стабильно
    const [displayValue, setDisplayValue] = useState(() => {
      if (value) {
        const digits = value.replace(/\D/g, '');
        if (digits.length > 0) {
          const firstDigit = digits[0];
          const type = firstDigit === '8' ? 'eight' : 'plus7';
          return formatPhoneNumber(digits, type);
        }
      }
      return '';
    });

    const [maskType, setMaskType] = useState<'plus7' | 'eight'>(() => {
      if (value) {
        const digits = value.replace(/\D/g, '');
        if (digits.length > 0) {
          const firstDigit = digits[0];
          return firstDigit === '8' ? 'eight' : 'plus7';
        }
      }
      return 'plus7';
    });

    // Синхронизируем с внешним значением только при изменении
    useEffect(() => {
      if (value !== undefined) {
        const digits = value.replace(/\D/g, '');

        if (digits.length === 0) {
          setDisplayValue('');
          setMaskType('plus7');
        } else {
          // Определяем тип маски по первой цифре
          const firstDigit = digits[0];
          const type = firstDigit === '8' ? 'eight' : 'plus7';
          setMaskType(type);
          setDisplayValue(formatPhoneNumber(digits, type));
        }
      }
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value;

      // Если пользователь полностью очистил поле (включая через Ctrl+A + Delete)
      if (input === '') {
        setMaskType('plus7');
        setDisplayValue('');
        onChange?.('');
        return;
      }

      const digits = input.replace(/\D/g, '');

      // Если после удаления символов не осталось цифр
      if (digits.length === 0) {
        setMaskType('plus7');
        setDisplayValue('');
        onChange?.('');
        return;
      }

      // Определяем тип маски по первому введенному символу
      let newMaskType: 'plus7' | 'eight' = maskType;
      const firstDigit = digits[0];

      if (firstDigit === '8') {
        newMaskType = 'eight';
      } else if (firstDigit === '7') {
        newMaskType = 'plus7';
      } else {
        // Если первая цифра не 7 и не 8, используем +7 и добавляем цифру
        newMaskType = 'plus7';
        const newDigits = '7' + digits;
        const limitedDigits = newDigits.slice(0, 11);
        const formatted = formatPhoneNumber(limitedDigits, newMaskType);
        setMaskType(newMaskType);
        setDisplayValue(formatted);
        onChange?.(limitedDigits);
        return;
      }

      // Ограничиваем количество цифр (11 для российских номеров)
      const limitedDigits = digits.slice(0, 11);
      const formatted = formatPhoneNumber(limitedDigits, newMaskType);

      setMaskType(newMaskType);
      setDisplayValue(formatted);
      onChange?.(limitedDigits);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;

      // Если нажат Backspace или Delete
      if (event.key === 'Backspace' || event.key === 'Delete') {
        const selectionStart = target.selectionStart || 0;
        const selectionEnd = target.selectionEnd || 0;
        const isAllSelected = selectionStart === 0 && selectionEnd === displayValue.length;
        const digits = displayValue.replace(/\D/g, '');

        // Если выделен весь текст или остался только один символ или меньше, очищаем полностью
        if (isAllSelected || digits.length <= 1) {
          setDisplayValue('');
          setMaskType('plus7');
          onChange?.('');
          event.preventDefault();
          return;
        }
      }

      // Разрешаем навигационные клавиши
      if (
        [
          'Backspace',
          'Delete',
          'Tab',
          'Escape',
          'Enter',
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'Home',
          'End',
        ].includes(event.key)
      ) {
        return;
      }

      // Разрешаем Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
      if (event.ctrlKey && ['a', 'c', 'v', 'x', 'z'].includes(event.key.toLowerCase())) {
        return;
      }

      // Разрешаем только цифры
      if (!/^\d$/.test(event.key)) {
        event.preventDefault();
      }
    };

    const getPlaceholder = () => {
      return maskType === 'plus7' ? '+7 (___) ___-__-__' : '8 (___) ___-__-__';
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      // Предотвращаем стандартное поведение paste и обрабатываем вручную
      event.preventDefault();
      const pastedText = event.clipboardData.getData('text');
      const digits = pastedText.replace(/\D/g, '');

      if (digits.length === 0) {
        return;
      }

      // Создаем событие изменения для обработки вставленного текста
      const syntheticEvent = {
        target: { value: digits },
      } as React.ChangeEvent<HTMLInputElement>;

      handleChange(syntheticEvent);
    };

    return (
      <Input
        {...props}
        className={cn(className)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={getPlaceholder()}
        ref={ref}
        type="tel"
        value={displayValue}
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
