import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function SkeletonCard() {
    return (
        <Card className="w-full flex flex-col items-center justify-center">
            <CardHeader className="flex flex-col items-center justify-center">
                <CardTitle className="h-6 w-60 bg-gray-200 rounded pt-4"></CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
                <div style={{ width: 500, height: 500 }} className=" bg-gray-200 rounded"></div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 items-center justify-center">
                <div className="h-8 bg-gray-200 rounded w-20 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-16"></div>
            </CardFooter>
        </Card>
    );
}
