import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface CustomCarouselProps {
  items: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  showArrows?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

function CustomCarousel({
  items,
  className,
  itemClassName,
  showArrows = true,
  autoPlay = false,
  interval = 5000,
}: CustomCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  React.useEffect(() => {
    if (autoPlay && api) {
      const intervalId = setInterval(() => {
        api.scrollNext();
      }, interval);

      return () => clearInterval(intervalId);
    }
  }, [api, autoPlay, interval]);

  return (
    <Carousel
      setApi={setApi}
      className={cn("w-full max-w-xs", className)}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {items.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <CarouselItem key={index} className={cn("pl-1", itemClassName)}>
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      {showArrows && (
        <>
          <CarouselPrevious className="left-0 translate-x-0">
            <ChevronLeftIcon className="h-4 w-4" />
          </CarouselPrevious>
          <CarouselNext className="right-0 translate-x-0">
            <ChevronRightIcon className="h-4 w-4" />
          </CarouselNext>
        </>
      )}
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </Carousel>
  );
}

export { CustomCarousel };
