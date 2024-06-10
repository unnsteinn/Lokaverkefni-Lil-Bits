import { Card, CardContent, CardTitle } from '@/components/ui/card';
import React from 'react';

export default function Contact() {
    return (
        <div className="flex justify-center">
            <Card className="flex-col p-10 w-full md:w-2/3 xl:w-1/3">
                <CardTitle className="flex justify-center pb-10">
                    <h2>Contact Lil Bits</h2>
                </CardTitle>
                <div className="flex justify-center">
                    <CardContent className="">
                        <h3 className="pb-4">Operating Hours: 16:00 - 22:00</h3>
                        <h3 className="pb-4">Phone: +1 800 LIL BITS</h3>
                        <h3>Email: lilbits@lilbits.com</h3>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}
