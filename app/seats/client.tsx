'use client'
import { seatService } from '@/services/SeatService';
import React from 'react'
import { toast } from 'react-toastify';

export function InsertSeatButton() {
    return (
        <button onClick={async () => {
            const response = await seatService.insert([
                {
                    busId: 3,
                    name: "iseat",
                    price: 10000
                }
            ]);
            toast.success(response.data.message);
        }} >Insert</button>
    );
}