import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { getMeals, getOrGeneratePrice, Meal, OrderItem } from '@/lib/utils';
import SkeletonCard from './SkeletonCard';

interface CarouselWithMealsProps {
    onOrderMeal: (meal: OrderItem) => void;
}

export function CarouselWithMeals({ onOrderMeal }: CarouselWithMealsProps) {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const fetchRef = useRef(false); // useRef to prevent double fetch

    useEffect(() => {
        if (fetchRef.current) return; // Prevent running again
        fetchRef.current = true;

        async function fetchMeals() {
            setLoading(true);
            const mealsData = await getMeals();
            setMeals(mealsData);
            setLoading(false);
        }

        fetchMeals();
    }, []);

    const handleOrderClick = (meal: Meal) => {
        const mealWithPrice: OrderItem = {
            id: meal.idMeal,
            name: meal.strMeal,
            price: getOrGeneratePrice(meal.idMeal),
            amount: 1,
            type: 'dish',
            thumbnail: meal.strMealThumb,
        };
        onOrderMeal(mealWithPrice);
        setMessage(`${meal.strMeal} added to your order`);
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
                        : meals.map((meal) => {
                              const randomPrice = getOrGeneratePrice(meal.idMeal);
                              return (
                                  <CarouselItem key={meal.idMeal}>
                                      <div>
                                          <Card>
                                              <CardHeader>
                                                  <div>
                                                      <CardTitle className="text-center pb-4 truncate">
                                                          {meal.strMeal}
                                                      </CardTitle>
                                                      <div className="flex justify-center">
                                                          <Image
                                                              src={meal.strMealThumb}
                                                              alt="Meal Thumbnail"
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
                                                              onClick={() => handleOrderClick(meal)}
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
