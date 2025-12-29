import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(13,131,208,0.1),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(40,77,149,0.12),transparent_60%)]" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col items-start gap-5">
          <div className="inline-flex items-baseline gap-3">
            <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-[#2E7D00]">
              Ошибка 404
            </span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            <span className="text-gradient-primary">Страница не найдена</span>
          </h1>
          <p className="max-w-prose text-base text-muted-foreground md:text-lg">
            Мы не нашли страницу по указанному адресу. Возможно, ссылка устарела или была удалена.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link
              className="bg-gradient-primary hover:bg-gradient-primary/90 active:bg-gradient-primary/80 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-sm transition"
              href="/"
            >
              На главную
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-primary/30 px-5 py-3 text-sm font-semibold text-[#2E7D00] transition hover:border-primary/40 hover:bg-primary/10"
              href="/services"
            >
              Каталог услуг
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <Image
              alt="Иллюстрация: поиск страницы"
              className="object-cover"
              fill
              priority={false}
              sizes="(min-width: 768px) 480px, 90vw"
              src="/images/banner.png"
            />
          </div>
          <div className="absolute -left-6 -top-6 -z-10 h-24 w-24 rounded-full bg-primary/30 blur-xl" />
          <div className="absolute -bottom-8 -right-8 -z-10 h-28 w-28 rounded-full bg-indigo-200/40 blur-xl" />
        </div>
      </div>
    </div>
  );
}
