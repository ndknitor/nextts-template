import Pagination from '@/components/shared/Pagination/Pagination';
import { Seat } from '@/objects/entities/Seat';
import PagingRequest from '@/objects/requests/PagingRequest';
import { seatService } from '@/services/SeatService';
import NextPageProps from '@/utils/NextPageProps';
import React from 'react'

async function page(props: NextPageProps<{}, PagingRequest<Seat>>) {
  const seats = await seatService.getPaging(props.searchParams);
  return (
    <main>
      {
        seats.data.map(item =>
          <div key={`Seat${item.seatId}`}>
            <h1>Seat Id: {item.seatId}</h1>
            <h1>Name: {item.name}</h1>
            <h1>Price: {item.price}</h1>
            <br />
          </div>
        )
      }
      <Pagination
        navigateUrl={(p) => `/seats?page=${p}&size=${props.searchParams.size || 2}`}
        maxPage={seats.maxPage}
        page={props.searchParams.page || 1}
      />


    </main>
  )
}

export default page