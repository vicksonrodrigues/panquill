'use client'
import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselApi,
    CarouselContent,
} from '@/components/ui/carousel'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CustomCarouselProps {
    children: React.ReactNode
}

export default function CustomCarousel({ children }: CustomCarouselProps) {
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
                    {children}
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
