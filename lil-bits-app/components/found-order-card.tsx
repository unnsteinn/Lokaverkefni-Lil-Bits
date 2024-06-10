import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { OrderItem } from '@/lib/utils';
import { format } from 'date-fns';

interface FoundOrderCardProps {
    id: number;
    name: string;
    count: number;
    orderDate: string;
    items: OrderItem[];
    expanded: boolean;
    onToggleExpand: () => void;
    handleDelete: () => Promise<void>;
}

export const FoundOrderCard: React.FC<FoundOrderCardProps> = ({
    id,
    name,
    count,
    orderDate,
    items,
    expanded,
    onToggleExpand,
    handleDelete,
}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const totalCost = items.reduce((total, item) => total + item.price * item.amount, 0);

    const confirmDelete = async () => {
        setShowConfirm(false);
        await handleDelete();
    };

    return (
        <Card onClick={onToggleExpand} className="w-full">
            <CardHeader>
                <CardTitle className="text-center cursor-pointer">
                    Order Found
                    <p className="pt-1 text-sm">{format(orderDate, 'MMMM do, yyyy HH:mm')}</p>
                </CardTitle>
            </CardHeader>
            {expanded && (
                <>
                    <CardContent className="overflow-y-auto">
                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.price}`}
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
                                            {item.amount} <span>x</span>
                                        </>
                                    )}
                                    {item.name}
                                </span>
                                <span className="mr-4">{item.price * item.amount}kr.</span>
                            </div>
                        ))}
                        <div className="flex justify-between pt-4">
                            <span className="font-bold">Total Cost:</span>
                            <span className="mr-4 font-bold">{totalCost}kr.</span>
                        </div>
                        <div className="flex justify-between pt-4">
                            <span className="font-bold">Name</span>
                            <span className="mr-4 font-bold">{name}</span>
                        </div>
                        <div className="flex justify-between pt-4">
                            <span className="font-bold">Number of people</span>
                            <span className="mr-4 font-bold">{count}</span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button variant="destructive" onClick={() => setShowConfirm(true)}>
                            Delete
                        </Button>
                    </CardFooter>
                </>
            )}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Card>
                        <div className="p-4">
                            <p>Are you sure you want to delete this order?</p>
                            <div className="flex justify-evenly pt-4">
                                <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                                    No
                                </Button>
                                <Button variant="destructive" onClick={confirmDelete}>
                                    Yes
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </Card>
    );
};
