import { animated, useSpring } from '@react-spring/web'
import React, { PropsWithChildren } from 'react'

function FadeIn(props: PropsWithChildren) {
    const fadeInAnimation = useSpring({
        opacity: 1,
        from: { opacity: 0 }, // Start the animation from opacity 0 (completely transparent)
        config: { duration: 300 }, // You can adjust the duration as needed
    });
    return (
        <animated.div style={fadeInAnimation}>
            {props.children}
        </animated.div>
    )
}

export default FadeIn