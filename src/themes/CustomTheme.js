import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function CustomTheme({ noiseLevel, threshold, isTooLoud, customImages }) {
    // Select image based on noise level
    const getImageIndex = () => {
        if (customImages.length === 0)
            return -1;
        if (customImages.length === 1)
            return 0;
        const ratio = noiseLevel / threshold;
        if (ratio < 0.5)
            return 0;
        if (ratio < 1)
            return Math.min(1, customImages.length - 1);
        return Math.min(2, customImages.length - 1);
    };
    const imageIndex = getImageIndex();
    const currentImage = imageIndex >= 0 ? customImages[imageIndex] : null;
    // Animation intensity
    const intensity = Math.min(noiseLevel / threshold, 1.5);
    const scale = 1 + (isTooLoud ? 0.05 : 0);
    const shakeAmount = isTooLoud ? intensity * 5 : 0;
    if (!currentImage) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center text-center p-8", children: [_jsx("div", { className: "w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4", children: _jsx("svg", { className: "w-16 h-16 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-700 mb-2", children: "No Custom Images" }), _jsx("p", { className: "text-gray-500", children: "Upload images in settings to use this theme" })] }));
    }
    return (_jsxs("div", { className: "relative flex flex-col items-center justify-center", children: [_jsxs("div", { className: "relative transition-transform duration-100", style: {
                    transform: isTooLoud
                        ? `translate(${Math.random() * shakeAmount - shakeAmount / 2}px, ${Math.random() * shakeAmount - shakeAmount / 2}px) scale(${scale})`
                        : `scale(${scale})`,
                }, children: [_jsxs("div", { className: "relative w-72 h-72 rounded-3xl overflow-hidden shadow-2xl", children: [_jsx("img", { src: currentImage.url, alt: currentImage.name, className: "w-full h-full object-cover transition-all duration-300", style: {
                                    filter: isTooLoud ? 'hue-rotate(-30deg) saturate(1.5)' : 'none',
                                } }), _jsx("div", { className: "absolute inset-0 transition-opacity duration-200", style: {
                                    background: isTooLoud
                                        ? 'radial-gradient(circle, transparent 30%, rgba(239, 68, 68, 0.4) 100%)'
                                        : `radial-gradient(circle, transparent 30%, ${noiseLevel > threshold * 0.7 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'} 100%)`,
                                } }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 h-2 bg-gray-200", children: _jsx("div", { className: "h-full transition-all duration-200", style: {
                                        width: `${Math.min((noiseLevel / threshold) * 100, 100)}%`,
                                        backgroundColor: isTooLoud ? '#EF4444' : noiseLevel > threshold * 0.7 ? '#F59E0B' : '#10B981',
                                    } }) })] }), isTooLoud && (_jsx("div", { className: "absolute inset-0 rounded-3xl animate-pulse bg-red-500 opacity-30 blur-xl -z-10" }))] }), _jsxs("div", { className: "mt-8 flex items-center gap-3", children: [_jsx("div", { className: "w-4 h-4 rounded-full animate-pulse", style: {
                            backgroundColor: isTooLoud ? '#EF4444' : noiseLevel > threshold * 0.7 ? '#F59E0B' : '#10B981',
                        } }), _jsx("p", { className: `text-2xl font-bold ${isTooLoud ? 'text-red-500' : 'text-gray-700'}`, children: isTooLoud ? 'TOO LOUD!' : currentImage.name })] }), _jsxs("p", { className: "mt-2 text-gray-500", children: [Math.round(noiseLevel), " dB / ", threshold, " dB threshold"] })] }));
}
