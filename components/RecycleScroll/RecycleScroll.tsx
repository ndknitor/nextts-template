import React, { useState, useRef, useImperativeHandle, Fragment } from 'react';

interface RecycleScrollProps<T> {
  fetch: (page: number) => Promise<T[]>;
  placeHolderView?: React.ReactNode;
  dataView: (data: T, index: number) => React.ReactNode;
  maxPage: number;
  topOffset?: number;
  bottomOffset?: number;
  style?: React.CSSProperties;
}

export interface RecycleScrollRef {
  fetch: (page: number) => void | Promise<void>;
}

const RecycleScroll = React.forwardRef<RecycleScrollRef, RecycleScrollProps<any>>(
  function <T = any>(props: RecycleScrollProps<T>, ref: React.Ref<RecycleScrollRef>) {
    const scrollViewRef = useRef<HTMLDivElement | null>(null);

    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (page: number, offset: number) => {
      setIsLoading(true);
      setData(await props.fetch(page));
      setPage(page);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ top: offset, behavior: 'auto' });
      }
      setIsLoading(false);
    };

    const handleScroll = async (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      const isScrolledToBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 10;
      const isScrolledToTop = target.scrollTop <= 0;

      if (isScrolledToTop && !isLoading) {
        if (page > 1) {
          fetchData(page - 1, target.scrollHeight - target.clientHeight - (props.bottomOffset || 30));
        }
      }
      if (isScrolledToBottom && !isLoading) {
        if (page < props.maxPage) {
          fetchData(page + 1, props.topOffset || 30);
        }
      }
    };

    const fetchFromProps = async (page: number) => {
      await fetchData(page, 0);
    };

    useImperativeHandle(ref, () => ({
      fetch: fetchFromProps,
    }));

    return (
      <div style={props.style} onScroll={handleScroll} ref={scrollViewRef}>
        {isLoading && props.placeHolderView}
        {data.map((item, index) => (
          <Fragment key={index}>{props.dataView(item, index)}</Fragment>
        ))}
        {isLoading && props.placeHolderView}
      </div>
    );
  }
);

export default RecycleScroll;
