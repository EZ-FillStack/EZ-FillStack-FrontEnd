import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { banners } from '@/lib/banners';
import { bannerImageById } from '@/assets/banners/bannerImages';
import { cn } from '@/lib/utils';

export default function MainBanner() {
  const autoplay = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  );

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2">
      <Carousel
        opts={{
          align: 'center',
          loop: true,
          slidesToScroll: 1,
          duration: 12,
        }}
        plugins={[autoplay.current]}
      >
        <CarouselContent className="-ml-4">
          {banners.map((banner) => {
            const image = bannerImageById[banner.id];

            return (
              <CarouselItem key={banner.id} className="basis-auto pl-4">
                <div
                  className={cn(
                    'relative flex h-72 w-96 flex-col justify-end overflow-hidden rounded-2xl px-8 py-7',
                    !image && banner.className,
                  )}
                >
                  {image && (
                    <img
                      src={image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <div className="relative z-10 w-3/5">
                    <p className="text-2xl font-bold leading-snug text-white break-keep line-clamp-2">
                      {banner.title}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white break-keep line-clamp-2">
                      {banner.subtitle}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
