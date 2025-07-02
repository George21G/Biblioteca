import React from 'react';
import { Link } from '@inertiajs/react';

export default function AppLogo() {
    return (
        <Link href="/" aria-label="Ir al inicio">
            <span className="block w-10 h-10">
                <img src="https://millonarios.com.co/wp-content/uploads/2024/08/logo2.png" alt="Millonarios FC" className="w-full h-full object-contain" />
            </span>
        </Link>
    );
}
