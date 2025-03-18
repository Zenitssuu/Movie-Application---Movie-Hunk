import React, { useId } from 'react'
import { forwardRef } from 'react'

const Input = forwardRef(function Input({
    label,
    placeholder,
    name,
    type,
    ...props
}, ref) {

    const id = useId();
    return (
        <input
            name={name}
            id={id}
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...props}
        />
    );
})

export default Input