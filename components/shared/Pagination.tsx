import Link from 'next/link';
import { range } from 'ndknitor-ts/system';
import React from 'react'
interface PaginationProps {
    page: number;
    maxPage: number;
    padStart?: number;
    padEnd?: number;
    navigateUrl: (page: number) => string;
}
function Pagination(props: PaginationProps) {
    const getStartPage = (currentPage: number) => {
        const padStart = props.padStart || 2;
        let startPage = parseInt(currentPage.toString()) - padStart;
        if (startPage < 1) {
            startPage = 1;
        }
        return startPage;
    }
    const getEndPage = (currentPage: number, maxPages: number) => {
        const padEnd = props.padEnd || 2;
        let endPage = parseInt(currentPage.toString()) + padEnd;
        if (endPage > maxPages) {
            endPage = maxPages;
        }
        return endPage;
    }
    const activeClass = (page: number) => {
        if (page == props.page) {
            return 'bg-slate-800 text-white'
        }
        else {
            return 'bg-slate-400 rounded-lg';
        }
    }

    return (
        <div className='w-full flex flex-row gap-3 justify-center items-center'>
            {
                props.page > 1 &&
                <Link
                    className='bg-slate-400 hover:bg-slate-800 hover:text-white duration-300 rounded-lg w-9 h-9 p-1 text-center'
                    href={props.navigateUrl(parseInt(props.page.toString()) - 1)}>
                    &#8592;
                </Link>
            }
            {
                range(getStartPage(props.page), getEndPage(props.page, props.maxPage)).map(item =>
                    <Link
                        key={`page${item}`}
                        href={props.navigateUrl(item)}
                        className={`duration-300 pl-4 pr-4 pt-2 pb-2 ${activeClass(item)} hover:bg-slate-800 hover:text-white`}>
                        {item}
                    </Link>
                )
            }
            {
                props.page < props.maxPage &&
                <Link
                    className='bg-slate-400 hover:bg-slate-800 hover:text-white duration-300 rounded-lg items-center justify-center w-9 h-9 p-1 text-center'
                    href={props.navigateUrl(parseInt(props.page.toString()) + 1)}>
                    &#8594;
                </Link>
            }
        </div>
    )
}

export default Pagination