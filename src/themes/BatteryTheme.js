import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Battery Theme
 * Visualizes noise level as battery draining/charging
 * Level 1 (Quiet): Full green battery, happy face
 * Level 2 (Moderate): 75% yellow-green, content face
 * Level 3 (Loud): 50% orange, worried face, warning
 * Level 4 (Too Loud): Critical red, empty, sad/angry face, sparks
 */
export const BatteryTheme = ({ level }) => {
    const getBatteryLevel = () => {
        switch (level) {
            case 'quiet': return 100;
            case 'moderate': return 75;
            case 'loud': return 40;
            case 'tooLoud': return 15;
            default: return 100;
        }
    };
    const getBatteryColor = () => {
        switch (level) {
            case 'quiet': return '#22C55E'; // Green
            case 'moderate': return '#84CC16'; // Lime
            case 'loud': return '#F97316'; // Orange
            case 'tooLoud': return '#EF4444'; // Red
            default: return '#22C55E';
        }
    };
    const getFaceExpression = () => {
        switch (level) {
            case 'quiet': return { eyes: '^ ^', mouth: 'ᴗ', blush: true };
            case 'moderate': return { eyes: '◠ ◠', mouth: '‿', blush: false };
            case 'loud': return { eyes: '◯ ◯', mouth: 'ω', blush: false };
            case 'tooLoud': return { eyes: '> <', mouth: '︵', blush: false };
            default: return { eyes: '^ ^', mouth: 'ᴗ', blush: true };
        }
    };
    const batteryLevel = getBatteryLevel();
    const batteryColor = getBatteryColor();
    const face = getFaceExpression();
    return (_jsx("div", { className: `w-full h-full flex items-center justify-center transition-all duration-500 ${level === 'quiet' ? 'bg-gradient-to-br from-green-50 to-emerald-100' :
            level === 'moderate' ? 'bg-gradient-to-br from-lime-50 to-yellow-100' :
                level === 'loud' ? 'bg-gradient-to-br from-orange-50 to-amber-100' :
                    'bg-gradient-to-br from-red-50 to-rose-100'}`, children: _jsxs("div", { className: "relative", children: [level === 'tooLoud' && (_jsx("div", { className: "absolute inset-0 pointer-events-none", children: [...Array(6)].map((_, i) => (_jsx("div", { className: "absolute animate-ping", style: {
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: '0.8s'
                        }, children: _jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", children: _jsx("path", { d: "M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z", fill: "#FCD34D" }) }) }, i))) })), (level === 'loud' || level === 'tooLoud') && (_jsx("div", { className: "absolute -top-12 left-1/2 -translate-x-1/2 animate-pulse", children: _jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [_jsx("path", { d: "M20 5 L35 35 H5 Z", fill: level === 'tooLoud' ? '#EF4444' : '#F97316', stroke: "white", strokeWidth: "2" }), _jsx("text", { x: "20", y: "30", textAnchor: "middle", fontSize: "20", fill: "white", fontWeight: "bold", children: "!" })] }) })), _jsx("div", { className: "relative", children: _jsxs("svg", { width: "200", height: "280", viewBox: "0 0 200 280", className: "drop-shadow-2xl", children: [_jsx("rect", { x: "20", y: "40", width: "160", height: "200", rx: "20", fill: "#374151", stroke: "#1F2937", strokeWidth: "4" }), _jsx("rect", { x: "70", y: "20", width: "60", height: "25", rx: "5", fill: "#374151" }), _jsx("rect", { x: "35", y: "55", width: "130", height: "170", rx: "12", fill: "#1F2937" }), _jsx("rect", { x: "35", y: 55 + (170 * (1 - batteryLevel / 100)), width: "130", height: 170 * (batteryLevel / 100), rx: "12", fill: batteryColor, className: "transition-all duration-700", children: _jsx("animate", { attributeName: "height", values: `${170 * (batteryLevel / 100)};${170 * (batteryLevel / 100) - 5};${170 * (batteryLevel / 100)}`, dur: level === 'tooLoud' ? '0.3s' : '2s', repeatCount: "indefinite" }) }), [1, 2, 3].map((i) => (_jsx("line", { x1: "35", y1: 55 + i * 42.5, x2: "165", y2: 55 + i * 42.5, stroke: "#374151", strokeWidth: "2", opacity: "0.5" }, i))), _jsxs("g", { transform: "translate(100, 140)", children: [_jsx("text", { x: "0", y: "-10", textAnchor: "middle", fontSize: "28", fill: "white", fontFamily: "Arial", fontWeight: "bold", children: face.eyes }), _jsx("text", { x: "0", y: "25", textAnchor: "middle", fontSize: "24", fill: "white", fontFamily: "Arial", children: face.mouth }), face.blush && (_jsxs(_Fragment, { children: [_jsx("circle", { cx: "-35", cy: "0", r: "8", fill: "#F472B6", opacity: "0.6" }), _jsx("circle", { cx: "35", cy: "0", r: "8", fill: "#F472B6", opacity: "0.6" })] }))] }), (level === 'quiet' || level === 'moderate') && (_jsx("g", { transform: "translate(100, 220)", opacity: "0.8", children: _jsx("path", { d: "M-8 -15 L2 -5 L-5 -5 L8 15 L-2 5 L5 5 Z", fill: "#FCD34D", children: _jsx("animate", { attributeName: "opacity", values: "0.8;0.3;0.8", dur: "1.5s", repeatCount: "indefinite" }) }) })), level === 'tooLoud' && (_jsxs(_Fragment, { children: [_jsx("path", { d: "M30 60 L45 80 L35 95", stroke: "#EF4444", strokeWidth: "2", fill: "none", opacity: "0.7", children: _jsx("animate", { attributeName: "opacity", values: "0.7;1;0.7", dur: "0.5s", repeatCount: "indefinite" }) }), _jsx("path", { d: "M170 220 L155 200 L165 185", stroke: "#EF4444", strokeWidth: "2", fill: "none", opacity: "0.7", children: _jsx("animate", { attributeName: "opacity", values: "0.7;1;0.7", dur: "0.5s", begin: "0.2s", repeatCount: "indefinite" }) })] })), _jsx("rect", { x: "40", y: "60", width: "20", height: "150", rx: "8", fill: "white", opacity: "0.1" })] }) }), _jsx("div", { className: "absolute -bottom-12 left-1/2 -translate-x-1/2", children: _jsxs("div", { className: `px-4 py-2 rounded-xl font-bold text-lg transition-all duration-300 ${level === 'quiet' ? 'bg-green-500 text-white' :
                            level === 'moderate' ? 'bg-lime-500 text-white' :
                                level === 'loud' ? 'bg-orange-500 text-white' :
                                    'bg-red-500 text-white animate-pulse'}`, children: [batteryLevel, "%"] }) }), _jsx("div", { className: "absolute -right-24 top-1/2 -translate-y-1/2", children: _jsxs("div", { className: `px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-300 ${level === 'quiet' ? 'bg-green-200 text-green-800' :
                            level === 'moderate' ? 'bg-lime-200 text-lime-800' :
                                level === 'loud' ? 'bg-orange-200 text-orange-800' :
                                    'bg-red-200 text-red-800 animate-bounce'}`, children: [level === 'quiet' && '🔋 Full!', level === 'moderate' && '⚡ Good', level === 'loud' && '🔌 Low!', level === 'tooLoud' && '💀 Critical!'] }) })] }) }));
};
export default BatteryTheme;
