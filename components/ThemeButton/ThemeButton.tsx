import appcolors from '@/utils/colors'
import { Button, ButtonProps } from '@mui/material'
import React from 'react'

function ThemeButton(props: ButtonProps) {
    return (
        <Button className={props.className} style={{ backgroundColor: appcolors.primary.tint1, color: "white", padding: 10 }} {...props} />
    )
}

export default ThemeButton