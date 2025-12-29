'use client';

import { useState } from 'react';

import { oswaldStyle } from '@/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function PopularQuestions() {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  const handleValueChange = (value: string | undefined) => {
    setOpenItem(value);
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col items-center text-center md:mb-12">
        <span className="mb-3 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          FAQ
        </span>
        <h2
          className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl"
          style={oswaldStyle}
        >
          Часто задаваемые вопросы
        </h2>
        <p className="max-w-2xl text-lg text-gray-600">
          Мы собрали ответы на самые популярные вопросы наших клиентов о ремонте, гарантии и оплате
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col gap-4">
          <Accordion
            className="flex flex-col gap-4"
            collapsible
            onValueChange={handleValueChange}
            type="single"
            value={openItem}
          >
            {FAQ_ITEMS.slice(0, 4).map(item => (
              <AccordionItem
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white px-6 shadow-sm transition-all hover:shadow-md data-[state=open]:border-primary/20 data-[state=open]:shadow-lg"
                key={item.id}
                value={item.id}
              >
                <AccordionTrigger className="py-5 text-left text-lg font-semibold hover:text-primary hover:no-underline md:text-xl">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600 md:text-lg">
                  <div className="pb-5 pt-0">{item.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex flex-col gap-4">
          <Accordion
            className="flex flex-col gap-4"
            collapsible
            onValueChange={handleValueChange}
            type="single"
            value={openItem}
          >
            {FAQ_ITEMS.slice(4).map(item => (
              <AccordionItem
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white px-6 shadow-sm transition-all hover:shadow-md data-[state=open]:border-primary/20 data-[state=open]:shadow-lg"
                key={item.id}
                value={item.id}
              >
                <AccordionTrigger className="py-5 text-left text-lg font-semibold hover:text-primary hover:no-underline md:text-xl">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600 md:text-lg">
                  <div className="pb-5 pt-0">{item.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

// Контент
const FAQ_ITEMS = [
  {
    id: 'item-1',
    question: 'Сколько длится ремонт?',
    answer:
      'Диагностика занимает 15–30 минут. Срок ремонта — от 1 дня до 3 рабочих дней в зависимости от сложности и наличия запчастей. Срочный ремонт возможен по согласованию.',
  },
  {
    id: 'item-2',
    question: 'Сколько стоит диагностика?',
    answer:
      'Диагностика бесплатна при последующем ремонте. Если вы отказываетесь от ремонта — оплачивается по действующему прайс‑листу.',
  },
  {
    id: 'item-3',
    question: 'Есть ли гарантия на работы?',
    answer:
      'Да, предоставляем гарантию от 3 до 12 месяцев на работы и установленные запчасти. Гарантийные условия указаны в талоне и чеке.',
  },
  {
    id: 'item-4',
    question: 'Можно вызвать мастера на дом?',
    answer:
      'Да, доступен выезд мастера по городу. При согласии на ремонт выезд бесплатный, в противном случае оплачивается отдельно.',
  },
  {
    id: 'item-5',
    question: 'Какие запчасти вы используете?',
    answer:
      'Используем оригинальные запчасти или качественные аналоги от проверенных поставщиков. Все детали согласовываем с вами заранее.',
  },
  {
    id: 'item-6',
    question: 'Как оформить заказ на ремонт?',
    answer:
      'Оставьте заявку на сайте или позвоните нам. Менеджер уточнит детали и согласует удобное время. Понадобятся контактный телефон и краткое описание неисправности.',
  },
  {
    id: 'item-7',
    question: 'Какие способы оплаты доступны?',
    answer:
      'Доступны наличные, банковские карты и онлайн‑оплата. По безналичному расчету предоставляем закрывающие документы.',
  },
  {
    id: 'item-8',
    question: 'Что делать, если проблема повторилась?',
    answer:
      'Обратитесь к нам с гарантийным талоном — проведем диагностику и устраним повторную неисправность по гарантии, если она связана с выполненными работами.',
  },
];
