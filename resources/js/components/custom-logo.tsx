import { ImgHTMLAttributes } from 'react';

export default function CustomLogo({
    className,
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/loginlogo.svg"
            alt="Logo"
            className={className}
            {...props}
        />
    );
}
