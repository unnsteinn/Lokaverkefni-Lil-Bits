'use client';

import React, { useState, useEffect } from 'react';
import OrderSummary from '@/components/order-summary';
import { OrderItem, getOrderInfo, getStoredItems, removeItem } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/lib/orderApi';

export default function MyOrder() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [orderedItems, setOrderedItems] = useState<OrderItem[]>([]);

    useEffect(() => {
        setOrderedItems(getStoredItems());
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const orderInfo = getOrderInfo();
        console.log(orderInfo);
        if (!orderInfo) {
            setError('Unable to process your order, please try again');
            return;
        }
        await createOrder(orderInfo);
        localStorage.removeItem('items');
        localStorage.removeItem('orderInfo');

        router.push('/thanks-for-ordering');
    };

    const handleRemoveItem = (id: string) => {
        const updatedItems = removeItem(orderedItems, id);
        setOrderedItems(updatedItems);
    };

    return (
        <form onSubmit={handleSubmit}>
            <OrderSummary items={orderedItems} onRemoveItem={handleRemoveItem}>
                <div className="flex flex-col pt-4 items-center gap-5">
                    {error && <p className="text-red-500">{error}</p>}
                    <Button variant="secondary" type="submit">
                        Confirm Order
                    </Button>
                </div>
            </OrderSummary>
        </form>
    );
}
