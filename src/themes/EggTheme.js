import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export function EggTheme({ noiseLevel, threshold, isTooLoud, backgroundColor: _bg }) {
    // Calculate animation intensity based on noise level
    const intensity = Math.min(noiseLevel / threshold, 1.5);
    const shakeAmount = isTooLoud ? intensity * 8 : 0;
    const scale = 1 + (intensity * 0.1);
    // Calculate level (1-4)
    const level = isTooLoud ? 4 : intensity < 0.5 ? 1 : intensity < 0.8 ? 2 : 3;
    // Color interpolation
    const getColor = () => {
        if (isTooLoud)
            return '#EF4444'; // Red
        const ratio = noiseLevel / threshold;
        if (ratio < 0.5)
            return '#10B981'; // Green
        if (ratio < 0.8)
            return '#F59E0B'; // Yellow
        return '#EF4444'; // Red
    };
    return (_jsxs("div", { className: "relative flex items-center justify-center", children: [_jsx("div", { className: "transition-transform duration-100", style: {
                    transform: isTooLoud
                        ? `translate(${Math.random() * shakeAmount - shakeAmount / 2}px, ${Math.random() * shakeAmount - shakeAmount / 2}px) scale(${scale})`
                        : `scale(${scale})`,
                }, children: _jsxs("svg", { width: "300", height: "400", viewBox: "0 0 300 400", className: "drop-shadow-2xl", children: [_jsx("ellipse", { cx: "150", cy: "360", rx: "80", ry: "20", fill: "rgba(0,0,0,0.2)" }), _jsx("path", { d: "M150 50 C 220 50, 260 150, 260 220 C 260 310, 210 350, 150 350 C 90 350, 40 310, 40 220 C 40 150, 80 50, 150 50 Z", fill: "#FFFEF0", stroke: "#E5E4D8", strokeWidth: "3" }), _jsx("ellipse", { cx: "110", cy: "120", rx: "30", ry: "50", fill: "rgba(255,255,255,0.6)", transform: "rotate(-20 110 120)" }), _jsxs("g", { className: isTooLoud ? 'animate-bounce' : '', children: [_jsx("circle", { cx: "110", cy: "200", r: "25", fill: "white", stroke: "#333", strokeWidth: "2" }), _jsx("circle", { cx: 110 + (noiseLevel / 100) * 5, cy: 200 + (noiseLevel / 100) * 2, r: "12", fill: "#333" }), _jsx("circle", { cx: "114", cy: "196", r: "4", fill: "white" }), _jsx("circle", { cx: "190", cy: "200", r: "25", fill: "white", stroke: "#333", strokeWidth: "2" }), _jsx("circle", { cx: 190 + (noiseLevel / 100) * 5, cy: 200 + (noiseLevel / 100) * 2, r: "12", fill: "#333" }), _jsx("circle", { cx: "194", cy: "196", r: "4", fill: "white" })] }), isTooLoud ? (
                        // Shocked mouth
                        _jsx("ellipse", { cx: "150", cy: "260", rx: "20", ry: "30", fill: "#333" })) : noiseLevel > threshold * 0.7 ? (
                        // Worried mouth
                        _jsx("path", { d: "M 120 260 Q 150 240, 180 260", fill: "none", stroke: "#333", strokeWidth: "4", strokeLinecap: "round" })) : (
                        // Happy mouth
                        _jsx("path", { d: "M 120 250 Q 150 280, 180 250", fill: "none", stroke: "#333", strokeWidth: "4", strokeLinecap: "round" })), _jsx("circle", { cx: "80", cy: "230", r: "15", fill: getColor(), opacity: "0.3" }), _jsx("circle", { cx: "220", cy: "230", r: "15", fill: getColor(), opacity: "0.3" }), isTooLoud && (_jsxs(_Fragment, { children: [_jsx("path", { d: "M 240 150 Q 245 140, 250 150 Q 250 165, 240 165 Q 230 165, 240 150", fill: "#60A5FA", className: "animate-bounce", style: { animationDelay: '0s' } }), _jsx("path", { d: "M 60 170 Q 65 160, 70 170 Q 70 185, 60 185 Q 50 185, 60 170", fill: "#60A5FA", className: "animate-bounce", style: { animationDelay: '0.2s' } })] })), _jsx("circle", { cx: "150", cy: "200", r: "170", fill: "none", stroke: getColor(), strokeWidth: "8", opacity: 0.3 + (intensity * 0.4), strokeDasharray: `${(noiseLevel / 100) * 1068} 1068`, transform: "rotate(-90 150 200)", className: "transition-all duration-200" })] }) }), _jsx("div", { className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4", children: [1, 2, 3, 4].map((l) => (_jsx("div", { className: `w-4 h-4 rounded-full transition-all duration-300 ${l <= level
                        ? l === 4 ? 'bg-red-500 scale-125 shadow-lg shadow-red-500/50'
                            : l === 3 ? 'bg-orange-500 scale-110'
                                : l === 2 ? 'bg-yellow-500'
                                    : 'bg-green-500'
                        : 'bg-white/20'}` }, l))) }), _jsx("div", { className: "absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center", children: _jsx("p", { className: `text-2xl font-bold transition-colors ${isTooLoud ? 'text-red-400 animate-pulse' : 'text-white'}`, children: isTooLoud ? 'TOO LOUD!' : level === 3 ? 'Careful...' : level === 2 ? 'Getting loud' : 'Quiet' }) })] }));
}
