
import { useEffect, useRef, useState, useMemo, useCallback } from "react";

const LazyImage = ({ placeholderSrc, placeholderClassName, placeholderStyle, src, alt, className, style }) => {
    const [state, setState] = useState({
        isLoading: true,
        hasError: false,
        view: sessionStorage.getItem(src) ? src : ""
    });

    const placeholderRef = useRef(null);

    const isCached = useMemo(() => !!sessionStorage.getItem(src), [src]);

    useEffect(() => {
        setState({
            isLoading: !isCached,
            hasError: false,
            view: isCached ? src : ""
        });

        if (isCached) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setState((prevState) => ({ ...prevState, view: src }));
                if (observer && placeholderRef.current) observer.unobserve(placeholderRef.current);
            }
        });

        if (placeholderRef.current) {
            observer.observe(placeholderRef.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [src, isCached]);

    const handleImageLoad = useCallback(() => {
        sessionStorage.setItem(src, src);
        setState((prevState) => ({ ...prevState, isLoading: false, hasError: false }));
    }, [src]);

    const handleImageError = useCallback(() => {
        setState((prevState) => ({ ...prevState, isLoading: false, hasError: true }));
    }, []);

    const { isLoading, hasError, view } = state;

    return (
        <>
            {isLoading && !view && (
                <img
                    src={placeholderSrc}
                    alt={alt}
                    className={placeholderClassName}
                    style={placeholderStyle}
                    ref={placeholderRef}
                />
            )}
            {view && !hasError && (
                <img
                    src={view}
                    className={className}
                    style={{ ...style, display: isLoading ? "none" : "block" }}
                    alt={alt}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            )}
            {hasError && (
                <img
                    src={placeholderSrc}
                    alt={alt}
                    className={placeholderClassName}
                    style={placeholderStyle}
                />
            )}
        </>
    );
};

export default LazyImage;
