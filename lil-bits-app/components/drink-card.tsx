import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Drink, getOrGeneratePrice, OrderItem } from '@/lib/utils';

export const DrinkCard = ({
    drink,
    onOrderDrink,
}: {
    drink: Drink;
    onOrderDrink: (drink: OrderItem) => void;
}) => {
    const [price, setPrice] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const generatedPrice = getOrGeneratePrice(drink.idDrink);
        setPrice(generatedPrice);
    }, [drink.idDrink]);

    const handleOrderClick = () => {
        if (price !== null) {
            const drinkWithPrice: OrderItem = {
                id: drink.idDrink,
                name: drink.strDrink,
                amount: 1,
                type: 'drink',
                thumbnail: drink.strDrinkThumb,
                price: price,
            };
            onOrderDrink(drinkWithPrice);
            setMessage(`${drink.strDrink} added to your order`);
            setTimeout(() => setMessage(null), 1500);
        }
    };

    return (
        <Card className="p-1 relative">
            <CardHeader>
                <div>
                    <CardTitle className="text-center pb-4">{drink.strDrink}</CardTitle>
                    <CardContent className="flex justify-center relative">
                        <Image
                            src={drink.strDrinkThumb}
                            alt="Drink Thumbnail"
                            width={200}
                            height={200}
                        />
                    </CardContent>
                    <CardFooter className="flex-col gap-3">
                        <h4>{price !== null ? `${price} kr.` : 'Loading...'}</h4>
                        <Button
                            variant={'secondary'}
                            onClick={handleOrderClick}
                            disabled={price === null}
                        >
                            Order
                        </Button>
                    </CardFooter>
                </div>
            </CardHeader>
            {message && (
                <div className="flex justify-center">
                    <div className="absolute top-1/2 transform -translate-y-1/2">
                        <Card className="p-4">{message}</Card>
                    </div>
                </div>
            )}
        </Card>
    );
};
