import Image from 'next/image';

import { Button } from '../ui/button';

export default function DownloadBanner() {
  return (
    <div className="px-0 lg:px-12">
      <div className="bg-bg-gradient-primary relative flex min-h-[526px] flex-col justify-between overflow-hidden rounded-none px-0 pt-8 lg:flex-row lg:rounded-4xl lg:px-4 lg:px-20 lg:pt-20 xl:justify-start">
        <div className="relative order-2 h-[250px] w-full md:max-w-[500px] lg:order-1 lg:h-full lg:max-h-[810px] lg:min-h-[446px] xl:max-w-[700px] xl:min-w-[500px]">
          <Image
            alt="download-banner"
            className="object-contain object-bottom"
            fill
            src="/images/banner_people.png"
          />
        </div>
        <div className="absolute top-0 right-0 h-full w-[120px] opacity-50 2xl:opacity-100">
          <Image alt="download-banner" fill src="/icons/banner_bg_orn.png" />
        </div>
        <div className="relative z-10 order-1 flex flex-col px-4 text-white lg:order-2 lg:px-0">
          <h3 className="text-4xl font-semibold md:text-6xl 2xl:text-9xl">Скачивайте</h3>
          <p className="mb-4 text-2xl md:text-3xl lg:mb-6 2xl:text-5xl">
            и пользуйтесь с комфортом
          </p>
          <div className="mb-4 h-[70px] lg:h-[94px]">
            <Button
              className="relative z-10 flex h-fit cursor-pointer items-center gap-2 lg:gap-4"
              variant="secondary"
            >
              <div className="relative size-[40px] lg:size-[60px]">
                <Image alt="google-play" fill src="/icons/rustore.svg" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-gradient-primary text-sm font-semibold lg:text-xl">
                  Доступно в
                </span>
                <span className="text-gradient-primary text-xl font-bold lg:text-3xl">Rustore</span>
              </div>
            </Button>
          </div>
          <p className="text-lg lg:text-3xl">3000 бонусов на первый заказ</p>
        </div>
      </div>
    </div>
  );
}
