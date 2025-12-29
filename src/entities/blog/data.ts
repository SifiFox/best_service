export type ContentBlock =
  | { type: 'header'; data: { text: string; level: 1 | 2 | 3 | 4 | 5 | 6 } }
  | { type: 'paragraph'; data: { text: string } }
  | { type: 'list'; data: { style: 'ordered' | 'unordered'; items: string[] } }
  | {
      type: 'image';
      data: {
        url: string;
        caption?: string;
        withBorder?: boolean;
        withBackground?: boolean;
        stretched?: boolean;
      };
    }
  | { type: 'quote'; data: { text: string; caption: string; alignment: 'left' | 'center' } };

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  tags: string[];
  content: ContentBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-choose-gaming-pc',
    title: 'Как выбрать игровой ПК в 2024 году: Полный гайд',
    description:
      'Разбираем ключевые характеристики, на которые стоит обратить внимание при покупке или сборке игрового компьютера.',
    coverImage: '/images/how-it-works/1.png',
    date: '26 Ноября 2024',
    tags: ['Гайды', 'Железо'],
    content: [
      {
        type: 'paragraph',
        data: {
          text: 'Выбор игрового компьютера — это всегда баланс между производительностью, бюджетом и эстетикой. В этом году рынок железа предлагает множество интересных решений.',
        },
      },
      {
        type: 'header',
        data: { text: 'Процессор: Интел или АМД?', level: 2 },
      },
      {
        type: 'paragraph',
        data: {
          text: 'Вечный спор, который не утихает. На данный момент обе компании предлагают отличные решения для гейминга. Важно смотреть на поколение процессора и количество ядер.',
        },
      },
      {
        type: 'quote',
        data: {
          text: 'Не экономьте на блоке питания. Это сердце вашего компьютера.',
          caption: 'Главный инженер Hous Team',
          alignment: 'left',
        },
      },
      {
        type: 'list',
        data: {
          style: 'unordered',
          items: [
            'Определите бюджет',
            'Выберите разрешение монитора (FHD, 2K, 4K)',
            'Подберите видеокарту под задачи',
          ],
        },
      },
    ],
  },
  {
    id: '2',
    slug: 'maintenance-tips',
    title: 'Топ-5 советов по уходу за консолью',
    description:
      'Простые действия, которые продлят жизнь вашей PlayStation или Xbox на долгие годы.',
    coverImage: '/images/how-it-works/4.png',
    date: '20 Ноября 2024',
    tags: ['Советы', 'Консоли'],
    content: [
      {
        type: 'paragraph',
        data: {
          text: 'Консоли, как и любая техника, требуют ухода. Пыль — главный враг системы охлаждения.',
        },
      },
      {
        type: 'image',
        data: {
          url: '/images/how-it-works/5.png',
          caption: 'Чистка геймпада тоже важна',
          withBorder: true,
        },
      },
    ],
  },
];
