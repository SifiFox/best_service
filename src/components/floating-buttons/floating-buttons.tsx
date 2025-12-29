'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import ModalMaster from '@/components/modals/modal-master/modal-master';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
        {/* Scroll to Top Button - появляется при скролле */}
        <button
          aria-label="Наверх"
          className={`group hover:border-primary hover:bg-primary/10 hover:text-primary flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-gray-700 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl md:h-16 md:w-16 ${
            showScrollTop
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-4 opacity-0'
          }`}
          onClick={scrollToTop}
          title="Прокрутить наверх"
          type="button"
        >
          <svg
            className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 md:h-7 md:w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 10l7-7m0 0l7 7m-7-7v18"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
            />
          </svg>
        </button>

        {/* Phone Button - всегда видна с пульсацией */}
        <div className="relative">
          {/* Пульсирующие волны */}
          <span className="bg-primary/80 absolute inset-0 h-14 w-14 animate-ping rounded-full opacity-75 md:h-16 md:w-16" />
          <span
            className="bg-primary/80 absolute inset-0 h-14 w-14 rounded-full opacity-75 md:h-16 md:w-16"
            style={{
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
              animationDelay: '0.5s',
            }}
          />

          {/* Кнопка */}
          <button
            aria-label="Позвонить"
            className="group bg-primary relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl md:h-16 md:w-16"
            onClick={() => setIsModalOpen(true)}
            title="Заказать звонок"
            type="button"
          >
            <Image
              alt="Позвонить"
              className="h-6 w-6 brightness-0 invert transition-transform duration-300 group-hover:scale-110 md:h-7 md:w-7"
              height={24}
              src="/icons/phone.svg"
              width={24}
            />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalMaster
          modalState={{ isOpen: isModalOpen }}
          onClose={() => setIsModalOpen(false)}
          title="Заказать звонок"
        />
      )}
    </>
  );
}
