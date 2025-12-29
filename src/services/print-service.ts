import { type DeliveryType, deliveryTypes } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

import { CartItem } from '@/stores/cart-store';

export type OrderData = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  orderDate: string;
  orderNumber: string;
  deliveryMethod: DeliveryType;
  deliveryCost: number;
  deliveryDate: string;
};

export class PrintService {
  private static generateOrderNumber(): string {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    return `ORD-${timestamp}`;
  }

  private static formatDate(date: Date): string {
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private static generateHTML(orderData: OrderData): string {
    const {
      items,
      totalItems,
      totalPrice,
      orderDate,
      orderNumber,
      deliveryMethod,
      deliveryCost,
      deliveryDate,
    } = orderData;

    return `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Заказ ${orderNumber}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
          }
          .company-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .order-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
          }
          .order-info div {
            flex: 1;
          }
          .order-info strong {
            display: block;
            margin-bottom: 5px;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          .items-table th,
          .items-table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          .items-table th {
            background-color: #f8f9fa;
            font-weight: bold;
          }
          .items-table .price-cell {
            text-align: right;
            font-weight: bold;
          }
          .delivery-info {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
          }
          .delivery-info h3 {
            margin-top: 0;
            margin-bottom: 15px;
          }
          .delivery-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .total-section {
            border-top: 2px solid #333;
            padding-top: 20px;
            text-align: right;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 18px;
          }
          .total-final {
            font-size: 24px;
            font-weight: bold;
            color: #d63384;
            border-top: 1px solid #333;
            padding-top: 10px;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 14px;
          }
          @media print {
            body {
              margin: 0;
              padding: 15px;
            }
            .header {
              margin-bottom: 20px;
              padding-bottom: 15px;
            }
            .items-table th,
            .items-table td {
              padding: 8px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">Лучший сервис</div>
          <div>Сервисный центр бытовой и цифровой техники</div>
        </div>

        <div class="order-info">
          <div>
            <strong>Номер заказа:</strong>
            ${orderNumber}
          </div>
          <div>
            <strong>Дата заказа:</strong>
            ${orderDate}
          </div>
          <div>
            <strong>Количество позиций:</strong>
            ${totalItems}
          </div>
        </div>

        <table class="items-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Наименование</th>
              <th>Количество</th>
              <th>Цена за единицу</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${item.title}</td>
                <td>${item.quantity} шт.</td>
                <td class="price-cell">${formatPrice(item.price)} ₽</td>
                <td class="price-cell">${formatPrice(item.price * item.quantity)} ₽</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <div class="delivery-info">
          <h3>Информация о доставке</h3>
          <div class="delivery-row">
            <span>Способ оказания услуги:</span>
            <strong>${deliveryTypes[deliveryMethod]}</strong>
          </div>
          <div class="delivery-row">
            <span>Стоимость вызова мастера:</span>
            <strong>${formatPrice(deliveryCost)} ₽</strong>
          </div>
          <div class="delivery-row">
            <span>Ближайшая дата вызова мастера:</span>
            <strong>${deliveryDate}</strong>
          </div>
        </div>

        <div class="total-section">
          <div class="total-row">
            <span>Итого к оплате:</span>
            <span class="total-final">${formatPrice(totalPrice)} ₽</span>
          </div>
        </div>

        <div class="footer">
          <p>Спасибо за ваш заказ!</p>
          <p>Документ сформирован автоматически ${new Date().toLocaleString('ru-RU')}</p>
        </div>
      </body>
      </html>
    `;
  }

  public static async printOrder(
    items: CartItem[],
    totalItems: number,
    totalPrice: number,
    deliveryMethod: DeliveryType = 'pickup',
    deliveryCost = 0,
    deliveryDate?: string,
    orderNumber?: string
  ): Promise<void> {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const orderData: OrderData = {
        items,
        totalItems,
        totalPrice: totalPrice + deliveryCost,
        orderDate: this.formatDate(new Date()),
        orderNumber: orderNumber || this.generateOrderNumber(),
        deliveryMethod,
        deliveryCost,
        deliveryDate: deliveryDate || tomorrow.toLocaleDateString('ru-RU'),
      };

      const htmlContent = this.generateHTML(orderData);

      // Создаем новое окно для печати
      const printWindow = window.open('', '_blank', 'width=800,height=600');

      if (!printWindow) {
        throw new Error(
          'Не удалось открыть окно печати. Проверьте настройки блокировщика всплывающих окон.'
        );
      }

      // Записываем HTML в новое окно
      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Ждем загрузки содержимого и запускаем печать
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          // Закрываем окно после печати (опционально)
          printWindow.onafterprint = () => {
            printWindow.close();
          };
        }, 250);
      };
    } catch {
      throw new Error('Не удалось распечатать заказ. Попробуйте еще раз.');
    }
  }

  public static async downloadOrderPDF(
    items: CartItem[],
    totalItems: number,
    totalPrice: number,
    deliveryMethod: DeliveryType = 'pickup',
    deliveryCost = 0,
    deliveryDate?: string,
    orderNumber?: string
  ): Promise<void> {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const orderData: OrderData = {
        items,
        totalItems,
        totalPrice: totalPrice + deliveryCost,
        orderDate: this.formatDate(new Date()),
        orderNumber: orderNumber || this.generateOrderNumber(),
        deliveryMethod,
        deliveryCost,
        deliveryDate: deliveryDate || tomorrow.toLocaleDateString('ru-RU'),
      };

      const htmlContent = this.generateHTML(orderData);

      // Создаем blob с HTML содержимым
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      // Создаем ссылку для скачивания
      const link = document.createElement('a');
      link.href = url;
      link.download = `order-${orderData.orderNumber}.html`;

      // Добавляем в DOM, кликаем и удаляем
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Освобождаем память
      URL.revokeObjectURL(url);
    } catch {
      throw new Error('Не удалось скачать заказ. Попробуйте еще раз.');
    }
  }
}
