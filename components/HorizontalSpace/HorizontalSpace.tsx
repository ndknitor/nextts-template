import React from 'react'
interface HorizontalSpaceProps {
    space?: number;
}
function HorizontalSpace(props: HorizontalSpaceProps) {
    return (
        <div style={{ marginTop: props.space || 10 }} />
    )
}

export default HorizontalSpace