import { animated, useSpring } from '@react-spring/web';
import React, { PropsWithChildren, useEffect } from 'react'
interface FadeZoomInProps extends PropsWithChildren {
    duration?: number;
}
function FadeZoomIn(props: FadeZoomInProps) {
    const [style, animate] = useSpring({ opacity: 0, scale: 0 }, [])
    useEffect(() => {
        animate({ opacity: 1, scale: 1 } )
    }, []);
    return (
        <animated.div style={style}>
            {props.children}
        </animated.div>
    )
}

export default FadeZoomIn