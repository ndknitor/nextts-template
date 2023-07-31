import { animated, useSpring } from '@react-spring/web';
import React, { PropsWithChildren } from 'react'

function FadeInUp(props: PropsWithChildren) {
    const animation = useSpring({
        opacity: 1,
        y: 0,
        from: { opacity: 0, y: -24 }, // Start the animation from opacity 0 (completely transparent)
        config: { duration: 300 }, // You can adjust the duration as needed
    });
    return (
        <animated.div style={animation}>
            {props.children}
        </animated.div>
    )
}

export default FadeInUp