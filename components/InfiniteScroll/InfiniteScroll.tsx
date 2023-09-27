import React, { useState, forwardRef, useImperativeHandle, Fragment, useEffect } from 'react';

interface InfiniteScrollProps<T> {
  fetch: (page: number) => Promise<T[]>;
  placeHolderView?: React.ReactElement;
  dataView: (data: T, index: number) => React.ReactElement;
  style?: React.CSSProperties;
  maxPage: number;
}

export interface InfiniteScrollRef {
  fetch: () => void;
}

const InfiniteScroll = forwardRef<InfiniteScrollRef, InfiniteScrollProps<any>>(
  function <T = any>(props: InfiniteScrollProps<T>, ref: React.Ref<InfiniteScrollRef>) {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      fetchData(1);
    }, []);

    const fetchData = async (page: number) => {
      setIsLoading(true);
      const fetchedData = await props.fetch(page);
      setData((prevData) => [...prevData, ...fetchedData]);
      setPage(page);
      setIsLoading(false);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const isScrolledToBottom =
        target.scrollHeight - target.scrollTop <= target.clientHeight + 10;

      if (isScrolledToBottom && !isLoading) {
        if (page < props.maxPage) {
          fetchData(page + 1);
        }
      }
    };

    const fetchFromProps = () => {
      setPage(1);
    };

    useImperativeHandle(ref, () => ({
      fetch: fetchFromProps,
    }));

    return (
      <div style={props.style} onScroll={handleScroll}>
        {isLoading && props.placeHolderView}
        {data.map((item, index) => (
          <Fragment key={index}>{props.dataView(item, index)}</Fragment>
        ))}
        {isLoading && props.placeHolderView}
      </div>
    );
  }
);

export default InfiniteScroll;