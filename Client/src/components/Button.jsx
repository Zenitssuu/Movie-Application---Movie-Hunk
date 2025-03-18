import { forwardRef } from "react";

const Button = forwardRef(function Button({
    label,
    ...props
}, ref) {
    return (
        <button
            {...props}
            ref={ref}
        >
            {label}
        </button>
    );
})

export default Button