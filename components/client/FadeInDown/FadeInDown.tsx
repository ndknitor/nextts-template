import { animated, useSpring } from '@react-spring/web';
import React, { PropsWithChildren, useEffect } from 'react'
interface FadeInDownProps extends PropsWithChildren {
    deps?: Object[];
    duration?: number;
}
function FadeInDown(props: FadeInDownProps) {
    const [style, animate] = useSpring({ opacity: 0, y: 24 }, []);
    useEffect(() => {
        animate.set({ opacity: 0, y: 24 });
        animate({ opacity: 1, y: 0 , config :{ duration : props.duration || 300}});
    }, [animate, props]);
    return (
        <animated.div style={style}>
            {props.children}
        </animated.div>
    )
}

export default FadeInDown