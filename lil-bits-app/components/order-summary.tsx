import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { X } from 'lucide-react';
import { OrderItem } from '@/lib/utils';

interface OrderSummaryProps {
    items: OrderItem[];
    onRemoveItem: (itemId: string) => void;
    children?: React.ReactNode;
}
const OrderSummary: React.FC<OrderSummaryProps> = ({ items = [], onRemoveItem, children }) => {
    const totalCost = items.reduce((total, item) => total + item.price * item.amount, 0);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-center">Your Order</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto">
                {items.length === 0 ? (
                    <h4>No orders yet.</h4>
                ) : (
                    <div>
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center py-2 border-b"
                            >
                                <span>
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover"
                                        width={200}
                                        height={200}
                                    />
                                </span>
                                <span className="flex items-center flex-1 mx-4 truncate gap-1">
                                    {item.amount > 1 && (
                                        <>
                                            {item.amount} <X className="h-2 w-2" />
                                        </>
                                    )}
                                    {item.name}
                                </span>
                                <span className="mr-4">{item.price * item.amount}kr.</span>
                                <Button variant="destructive" onClick={() => onRemoveItem(item.id)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <div className="flex justify-between pt-4">
                            <span className="font-bold">Total Cost:</span>
                            <span className="mr-4 font-bold">{totalCost}kr.</span>
                        </div>

                        {children}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default OrderSummary;
