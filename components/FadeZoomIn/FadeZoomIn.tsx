import { animated, useSpring } from '@react-spring/web';
import React, { PropsWithChildren } from 'react'
interface FadeZoomInProps extends PropsWithChildren {
    duration?: number;
}
function FadeZoomIn(props: FadeZoomInProps) {
    const animation = useSpring({
        opacity: 1,
        scale: 1,
        from: { opacity: 0, scale: 0 }, // Start the animation from opacity 0 (completely transparent)
        config: { duration: props.duration || 300 }, // You can adjust the duration as needed
    });
    return (
        <animated.div style={animation}>
            {props.children}
        </animated.div>
    )
}

export default FadeZoomIn