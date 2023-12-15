import React, { PropsWithChildren } from 'react'
import { isClient } from '@/utils/function'
function ClientFragment(props: PropsWithChildren) {
    if (isClient()) {
        return (
            <>
                {props.children}
            </>
        );
    }
    else
    {
        return (null);
    }
}

export default ClientFragment