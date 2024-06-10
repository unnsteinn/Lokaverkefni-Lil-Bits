'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Drink, OrderItem, getOrGeneratePrice } from '@/lib/utils';
import SkeletonCard from './SkeletonCard';
import { Button } from './ui/button';

interface CarouselWithDrinksProps {
    drinks: Drink[];
    onOrderDrink: (drink: OrderItem) => void;
    loading: boolean;
}

export function CarouselWithDrinks({ drinks, onOrderDrink, loading }: CarouselWithDrinksProps) {
    const [message, setMessage] = useState<string | null>(null);

    const handleOrderClick = (drink: Drink) => {
        const drinkWithPrice: OrderItem = {
            id: drink.idDrink,
            name: drink.strDrink,
            price: getOrGeneratePrice(drink.idDrink),
            amount: 1,
            type: 'drink',
            thumbnail: drink.strDrinkThumb,
        };
        onOrderDrink(drinkWithPrice);
        setMessage(`${drink.strDrink} added to your order`);
        setTimeout(() => setMessage(null), 1500);
    };

    return (
        <div className="w-full">
            <Carousel>
                <CarouselContent>
                    {loading
                        ? Array.from({ length: 3 }).map((_, index) => (
                              <CarouselItem key={index}>
                                  <SkeletonCard />
                              </CarouselItem>
                          ))
                        : drinks.map((drink) => {
                              const randomPrice = getOrGeneratePrice(drink.idDrink);
                              return (
                                  <CarouselItem key={drink.idDrink}>
                                      <div>
                                          <Card>
                                              <CardHeader>
                                                  <div>
                                                      <CardTitle className="text-center pb-4 truncate">
                                                          {drink.strDrink}
                                                      </CardTitle>
                                                      <div className="flex justify-center">
                                                          <Image
                                                              src={drink.strDrinkThumb}
                                                              alt="Drink Thumbnail"
                                                              width={500}
                                                              height={500}
                                                          />
                                                      </div>
                                                      <CardFooter className="flex-col">
                                                          <h4 className="pt-4 pb-2">
                                                              {randomPrice}kr.
                                                          </h4>
                                                          <Button
                                                              variant={'secondary'}
                                                              onClick={() =>
                                                                  handleOrderClick(drink)
                                                              }
                                                          >
                                                              Order
                                                          </Button>
                                                      </CardFooter>
                                                  </div>
                                              </CardHeader>
                                          </Card>
                                      </div>
                                  </CarouselItem>
                              );
                          })}
                </CarouselContent>
                {message && (
                    <div className="flex justify-center">
                        <div className="absolute top-1/2 transform -translate-y-1/2">
                            <Card className="p-4">{message}</Card>
                        </div>
                    </div>
                )}
                <div className="absolute left-14 top-1/2 transform -translate-y-1/2">
                    <CarouselPrevious />
                </div>
                <div className="absolute right-14 top-1/2 transform -translate-y-1/2">
                    <CarouselNext />
                </div>
            </Carousel>
        </div>
    );
}
