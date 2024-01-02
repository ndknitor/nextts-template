import { RSeat } from '@/objects/entities/Seat';
import React from 'react'
import Pagination from '@/components/shared/Pagination';
import { NextPageProps } from '@/utils/NextProps';
import { InsertSeatButton } from './client';
import OffsetPagingRequest from '@/objects/requests/OffsetPagingRequest';
import seatService from '@/services/SeatService';

async function page(props: NextPageProps<{}, OffsetPagingRequest<RSeat>>) {
  const searchParams = new OffsetPagingRequest<RSeat>(props.searchParams);
  const seats = await seatService.getPaging(searchParams);
  return (
    <main>
      {
        seats.ok && seats.data.data.map(item =>
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