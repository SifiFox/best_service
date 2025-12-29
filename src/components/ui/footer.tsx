import Image from 'next/image';

import { MAIL, OK_URL, PHONE, PHONE_TEL, TG_URL, VK_URL } from '@/shared/constants';

type SocialIcon = {
  src: string;
  alt: string;
  url: string;
  width?: number;
  height?: number;
};

type MenuItem = {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
  orientation?: 'horizontal' | 'vertical';
};

type FooterProps = {
  logo?: {
    url: string;
    src: string;
    alt: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
  socialIcons?: SocialIcon[];
};

export default function Footer({
  logo = {
    src: '/icons/logo_dark.svg',
    alt: 'Idea',
    url: '#',
  },
  tagline = 'ООО "ДОМ ИНДУСТРИИ", ОГРН 1237400041394, 456851, Еманжелинск, Островского 7',
  menuItems = [
    {
      title: 'Контакты',
      links: [
        { text: PHONE, url: `tel:${PHONE_TEL}` },
        { text: MAIL, url: `mailto:${MAIL}` },
      ],
    },
    {
      title: 'Услуги',
      links: [
        { text: 'Компьютерная помощь', url: '/services/104' },
        { text: 'Бытовая техника', url: '/services?department=bytovaya-tehnika' },
        { text: 'Цифровая техника', url: '/services?department=digital' },
        { text: 'Оформить заказ', url: '/cart' },
      ],
    },
    {
      title: 'Информация',
      links: [
        { text: 'Наша цель', url: '/' },
        { text: 'Отзывы', url: '/' },
        { text: 'Наше приложение', url: '/' },
      ],
    },
  ],
  bottomLinks = [{ text: 'Политика конфиденциальности', url: '/files/privacy.docx' }],
  socialIcons = [
    {
      src: '/icons/vk.svg',
      alt: 'ВКонтакте',
      url: VK_URL,
      width: 40,
      height: 40,
    },
    {
      src: '/icons/ok.svg',
      alt: 'Одноклассники',
      url: OK_URL,
      width: 40,
      height: 40,
    },
    {
      src: '/icons/tg.svg',
      alt: 'Телеграм',
      url: TG_URL,
      width: 40,
      height: 40,
    },
  ],
}: FooterProps) {
  const contactsSection = menuItems.find(item => item.title === 'Контакты');
  const servicesSection = menuItems.find(item => item.title === 'Услуги');
  const infoSection = menuItems.find(item => item.title === 'Информация');

  return (
    <section className="pt-16 sm:pt-24 md:pt-32">
      <footer>
        <div className="px-6 sm:px-8 md:px-12">
          {/* Адаптивная сетка */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5 lg:gap-8">
            {/* Лого и адрес */}
            <div className="col-span-1 mb-6 md:col-span-1 md:mb-8 lg:col-span-1 lg:mb-0">
              <div className="mb-3 flex items-center gap-2 md:mb-4">
                <a href="/">
                  <img alt={logo.alt} className="h-8 md:h-20" src={logo.src} />
                </a>
              </div>
              <p className="text-muted-foreground md:text-foreground text-xs font-semibold md:mt-4 md:text-sm lg:text-base">
                {tagline}
              </p>
            </div>

            {/* Социальные сети и контакты (мобильная версия в одной колонке) */}
            <div className="col-span-1 mb-6 md:order-4 md:col-span-1 md:mb-0 lg:order-5 lg:col-span-1">
              {/* Соцсети */}
              {socialIcons && socialIcons.length > 0 && (
                <div className="mb-3 flex gap-2 md:mt-2 md:gap-4 lg:mt-4">
                  {socialIcons.map((icon, index) => (
                    <a
                      className="transition-opacity hover:opacity-80"
                      href={icon.url}
                      key={index}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Image
                        alt={icon.alt}
                        className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12"
                        height={icon.height || 24}
                        src={icon.src}
                        width={icon.width || 24}
                      />
                    </a>
                  ))}
                </div>
              )}

              {/* Контакты (показываем только на мобильных) */}
              {contactsSection && (
                <div className="block md:hidden">
                  {contactsSection.links.map((link, linkIdx) => (
                    <div className="text-muted-foreground mb-1 text-xs font-medium" key={linkIdx}>
                      <a className="hover:text-primary" href={link.url}>
                        {link.text}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Услуги */}
            {servicesSection && (
              <div className="col-span-1 mb-6 md:order-2 md:col-span-1 md:mb-0 lg:order-2 lg:col-span-1">
                <h3 className="mb-3 text-sm font-semibold md:mb-4 md:text-base lg:text-lg">
                  {servicesSection.title}
                </h3>
                <ul className="text-muted-foreground space-y-2 text-xs md:space-y-4 md:text-sm lg:text-base">
                  {servicesSection.links.map((link, linkIdx) => (
                    <li className="hover:text-primary font-medium" key={linkIdx}>
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Информация */}
            {infoSection && (
              <div className="col-span-1 mb-6 md:order-3 md:col-span-1 md:mb-0 lg:order-3 lg:col-span-1">
                <h3 className="mb-3 text-sm font-semibold md:mb-4 md:text-base lg:text-lg">
                  {infoSection.title}
                </h3>
                <ul className="text-muted-foreground space-y-2 text-xs md:space-y-4 md:text-sm lg:text-base">
                  {infoSection.links.map((link, linkIdx) => (
                    <li className="hover:text-primary font-medium" key={linkIdx}>
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Контакты (показываем только на десктопе) */}
            {contactsSection && (
              <div className="col-span-1 mb-6 hidden md:order-1 md:mb-0 md:block lg:order-4">
                <h3 className="mb-3 text-base font-semibold md:mb-4 lg:text-lg">
                  {contactsSection.title}
                </h3>
                <ul className="text-muted-foreground space-y-2 text-sm md:space-y-4 lg:text-base">
                  {contactsSection.links.map((link, linkIdx) => (
                    <li className="hover:text-primary font-medium" key={linkIdx}>
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="text-muted-foreground mt-8 flex flex-col justify-center gap-4 border-t px-6 py-6 text-xs font-medium sm:mt-10 sm:px-10 sm:py-8 sm:text-sm md:flex-row md:items-center md:px-14">
          <ul className="flex gap-4">
            {bottomLinks.map((link, linkIdx) => (
              <li className="hover:text-primary underline" key={linkIdx}>
                <a download={`${link.text}.docx`} href={link.url}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </section>
  );
}
