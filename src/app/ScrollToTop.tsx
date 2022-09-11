import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        if (
            !pathname.includes('brand') &&
            !pathname.includes('interior') &&
            !pathname.includes('history') &&
            !pathname.includes('principle')
        )
            window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
