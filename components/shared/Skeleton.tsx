import React, { HtmlHTMLAttributes } from 'react'

function Skeleton(props: HtmlHTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`animate-pulse bg-gray-400 rounded-full dark:bg-gray-500 ${props.className}`}>
        </div>
    )
}

export default Skeleton