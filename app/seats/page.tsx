import { RSeat } from '@/objects/entities/Seat';
import PagingRequest from '@/objects/requests/PagingRequest';
import React from 'react'
import { seatService } from '@/services/SeatService';
import Pagination from '@/components/shared/Pagination';
import { NextPageProps } from '@/utils/NextProps';
import { InsertSeatButton } from './client';

async function page(props: NextPageProps<{}, PagingRequest<RSeat>>) {
  const searchParams = new PagingRequest<RSeat>(props.searchParams);
  const seats = await seatService.getPaging(searchParams);
  return (
    <main>
      {
        seats.data.data.map(item =>
          <div key={`Seat${item.seatId}`}>
            <h1>Seat Id: {item.seatId}</h1>
            <h1>Name: {item.name}</h1>
            <h1>Price: {item.price}</h1>
            <br />
          </div>
        )
      }
      <Pagination
        navigateUrl={(p) => `/seats?page=${p}&size=${searchParams.size}`}
        maxPage={seats.data.maxPage}
        page={searchParams.page}
      />
      <InsertSeatButton />
    </main>
  )
}

export default page