import { Card } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import React from 'react';

export default function About() {
    return (
        <main>
            <Carousel>
                <CarouselContent>
                    <CarouselItem className="flex justify-center h-fit">
                        <Card className="p-10 lg:w-1/2">
                            <h3 className="text-5xl">About Lil Bits</h3>
                            <p className="text-3xl">
                                Welcome to Lil Bits, where culinary creativity meets comfort and
                                tradition. Nestled in the heart of Reykjavík, Lil Bits is your go-to
                                destination for an unforgettable dining experience. Our name
                                reflects our philosophy: it&apos;s the little bits that make life
                                special, and we&apos;re here to celebrate those moments with you.
                            </p>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className="flex justify-center">
                        <Card className="p-10 lg:w-1/2">
                            <h3 className="text-5xl">Our Story</h3>
                            <p className="text-3xl">
                                Lil Bits was born out of a love for food and community. Founded by
                                Steve in 1999, our restaurant is built on the idea that the best
                                meals are the ones that bring people together. With a background in
                                culinary arts and a passion for innovation, Steve set out to create
                                a space where guests could savor both the familiar and the
                                unexpected.
                            </p>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className="flex justify-center">
                        <Card className="p-10 lg:w-1/2">
                            <h3 className="text-5xl">Our Menu</h3>
                            <p className="text-3xl">
                                Our menu is a delightful blend of classic favorites and unique
                                creations, all made from the freshest ingredients. From our
                                signature appetizers to our mouthwatering mains and decadent
                                desserts, every dish is crafted with care and attention to detail.
                                Whether you&apos;re in the mood for a hearty meal or a light bite,
                                you&apos;ll find something to love at Lil Bits.
                            </p>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className="flex justify-center">
                        <Card className="p-10 lg:w-1/2">
                            <h3 className="text-5xl">Our Commitment</h3>
                            <p className="text-3xl">
                                We are committed to sustainability and supporting local farmers and
                                producers. By sourcing our ingredients locally, we ensure that every
                                dish is as fresh and flavorful as possible, while also supporting
                                our community and reducing our environmental footprint.
                            </p>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className="flex justify-center">
                        <Card className="p-10 lg:w-1/2">
                            <h3 className="text-5xl">Join Us</h3>
                            <p className="text-3xl">
                                We invite you to join us at Lil Bits and discover the little things
                                that make our restaurant special. Whether you&apos;re celebrating a
                                special occasion, enjoying a night out, or simply craving a
                                delicious meal, we&apos;re here to make your dining experience
                                memorable. Thank you for choosing Lil Bits. We look forward to
                                serving you soon!
                            </p>
                        </Card>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </main>
    );
}
