import { animated, useSpring } from '@react-spring/web';
import React, { PropsWithChildren, useEffect } from 'react'

function FadeInUp(props: PropsWithChildren) {
    const [style, animate] = useSpring({ opacity: 0, y: -24 }, [])
    useEffect(() => {
        animate({ opacity: 1, y: 0 } )
    }, [animate]);
    return (
        <animated.div style={style}>
            {props.children}
        </animated.div>
    )
}

export default FadeInUp