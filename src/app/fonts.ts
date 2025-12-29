import localFont from 'next/font/local';

export const involveFont = localFont({
  src: [
    {
      path: '../fonts/Involve-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Involve-Oblique.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/Involve-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Involve-MediumOblique.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/Involve-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Involve-SemiBoldOblique.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../fonts/Involve-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Involve-BoldOblique.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-involve',
  display: 'swap',
});

export const rfDewiFont = localFont({
  src: [
    {
      path: '../fonts/RFDewiExpanded-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-rf-dewi',
  display: 'swap',
});
