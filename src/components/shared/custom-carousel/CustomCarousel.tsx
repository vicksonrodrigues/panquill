'use client'
import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CustomCarouselProps<T> {
    data: T[]
    getKey: (item: T) => string
    getHref: (item: T) => string
    renderImage: (item: T) => React.ReactNode
    renderBody: (item: T) => React.ReactNode
    basisClassName?: string // override slide width per section, defaults below
}

export default function CustomCarousel<T>({
    data,
    getKey,
    getHref,
    renderImage,
    renderBody,
    basisClassName = 'basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/4 ',
}: CustomCarouselProps<T>) {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>()
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)
    useEffect(() => {
        if (!carouselApi) {
            return
        }
        const updateSelection = () => {
            setCanScrollPrev(carouselApi.canScrollPrev())
            setCanScrollNext(carouselApi.canScrollNext())
        }
        updateSelection()
        carouselApi.on('select', updateSelection)
        return () => {
            carouselApi.off('select', updateSelection)
        }
    }, [carouselApi])
    return (
        <div className="w-full">
            <Carousel setApi={setCarouselApi} className="w-full max-w-full">
                <CarouselContent className="hide-scrollbar w-full max-w-full">
                    {data.map((item) => (
                        <CarouselItem
                            key={getKey(item)}
                            className={`my-1 flex min-w-0 shrink-0 grow-0 pl-6 ${basisClassName}`}
                        >
                            <a
                                href={getHref(item)}
                                className="group border-border bg-card hover:border-primary/45 flex h-full w-full flex-col overflow-hidden rounded-md border transition-all hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                <div className="bg-muted relative aspect-[4/3] w-full">
                                    {renderImage(item)}
                                </div>
                                {renderBody(item)}
                            </a>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="mt-8 flex flex-row items-center justify-between gap-4 md:flex-row">
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                        carouselApi?.scrollPrev()
                    }}
                    disabled={!canScrollPrev}
                    className="disabled:pointer-events-auto"
                >
                    <ArrowLeft className="size-5" />
                </Button>
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                        carouselApi?.scrollNext()
                    }}
                    disabled={!canScrollNext}
                    className="disabled:pointer-events-auto"
                >
                    <ArrowRight className="size-5" />
                </Button>
            </div>
        </div>
    )
}
