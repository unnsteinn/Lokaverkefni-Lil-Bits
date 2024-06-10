'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { cn, storeOrderInfo } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';

import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
    dob: z
        .date({
            required_error: 'A date of booking is required.',
        })
        .refine(
            (date) => {
                const now = new Date();
                return date >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
            },
            {
                message: 'You cannot select a past date.',
            }
        ),
    time: z.string().refine(
        (time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return (hours >= 16 && hours < 23) || (hours === 22 && minutes === 0);
        },
        {
            message: 'Time must be between 16:00 and 23:00.',
        }
    ),
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    guests: z.preprocess(
        (val) => parseInt(val as string, 10),
        z
            .number()
            .min(1, { message: 'At least one guest is required.' })
            .max(20, { message: 'A maximum of 20 guests are allowed.' })
    ),
});

export default function CalendarForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const router = useRouter();

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const datePart = data.dob.toISOString().split('T')[0];
            const date = `${datePart}T${data.time}`;
            storeOrderInfo({
                name: data.name,
                count: data.guests,
                email: data.email,
                date,
            });

            router.push('/my-order');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    title: 'Booking Failed',
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">
                                {error.response?.data.message ?? error.message}
                            </code>
                        </pre>
                    ),
                });
            } else {
                toast({
                    title: 'Booking Failed',
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{String(error)}</code>
                        </pre>
                    ),
                });
            }
        }
    }

    return (
        <div className="flex justify-center">
            <Card className="w-full p-10 mb-4 lg:w-1/2">
                <CardTitle className="flex justify-center pb-6">Book a table</CardTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem className="flex flex-col text-black">
                                    <FormLabel style={{ color: '#dfe594' }}>
                                        Date of booking
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-[240px] pl-3 text-left font-normal',
                                                        !field.value && 'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, 'PPP')
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-70" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => date < new Date()}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem className="flex flex-col text-black">
                                    <FormLabel style={{ color: '#dfe594' }}>
                                        Time of booking
                                    </FormLabel>
                                    <FormControl>
                                        <div className="w-fit">
                                            <Input
                                                {...field}
                                                type="time"
                                                className="input"
                                                min="16:00"
                                                max="23:00"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        <span className="text-white">
                                            Please note that the restaurant is open from 16:00 to
                                            23:00.
                                        </span>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col text-black">
                                    <FormLabel style={{ color: '#dfe594' }}>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="input"
                                            type="text"
                                            placeholder="Your name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col text-black">
                                    <FormLabel style={{ color: '#dfe594' }}>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="input"
                                            type="email"
                                            placeholder="Your email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="guests"
                            render={({ field }) => (
                                <FormItem className="flex flex-col text-black">
                                    <FormLabel style={{ color: '#dfe594' }}>
                                        Number of Guests
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="input w-fit"
                                            type="number"
                                            placeholder="Number of guests"
                                            min={1}
                                            max={20}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button variant={'secondary'} type="submit">
                            Submit
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
