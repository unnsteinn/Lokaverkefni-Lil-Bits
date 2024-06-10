'use client';

import { DrinkCard } from '@/components/drink-card';
import React, { useEffect, useState } from 'react';
import { addItem, Drink, getStoredItems, OrderItem, removeItem, storeItems } from '@/lib/utils';
import OrderSummary from '@/components/order-summary';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CarouselWithDrinks } from './carousel-with-drinks';

export const OrderDrinks = ({ drinks }: { drinks: Drink[] }) => {
    const [orderedItems, setOrderedItems] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const items = getStoredItems();
        setOrderedItems(items);
        setLoading(false);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 1025);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleRemoveMeal = (idMeal: string) => {
        const updatedItems = removeItem(orderedItems, idMeal);
        setOrderedItems(updatedItems);
        storeItems(updatedItems);
    };

    const handleDrinkOrder = (drink: OrderItem) => {
        const updatedItems = addItem(orderedItems, drink);
        setOrderedItems(updatedItems);
        storeItems(updatedItems);
    };

    return (
        <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
            <div className="xl:col-span-2">
                {isMobileView ? (
                    <CarouselWithDrinks
                        drinks={drinks}
                        onOrderDrink={handleDrinkOrder}
                        loading={loading}
                    />
                ) : (
                    <div className="grid gap-4 grid-cols-2">
                        {drinks.map((drink) => (
                            <div key={drink.idDrink} className="col-span-1">
                                <DrinkCard drink={drink} onOrderDrink={handleDrinkOrder} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="xl:col-start-3 xl:col-span-1">
                <OrderSummary items={orderedItems} onRemoveItem={handleRemoveMeal}>
                    <div className="mt-4 flex justify-evenly">
                        <Link href="/">
                            <Button variant="secondary" onClick={() => storeItems(orderedItems)}>
                                Back
                            </Button>
                        </Link>
                        <Link href="/booking">
                            <Button variant="secondary" onClick={() => storeItems(orderedItems)}>
                                Next
                            </Button>
                        </Link>
                    </div>
                </OrderSummary>
            </div>
        </div>
    );
};
