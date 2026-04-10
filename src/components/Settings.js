import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSettings } from '../hooks/useSettings';
export function Settings({ onClose }) {
    const { thresholds, errors, updateThreshold, resetToWHO, isUsingWHODefaults } = useSettings();
    const thresholdLabels = {
        quietToModerate: 'Quiet → Moderate',
        moderateToLoud: 'Moderate → Loud',
        loudToTooLoud: 'Loud → Too Loud',
        alarmTrigger: 'Alarm Trigger'
    };
    const thresholdDescriptions = {
        quietToModerate: 'Optimal for learning (<40 dB)',
        moderateToLoud: 'Acceptable level (40-55 dB)',
        loudToTooLoud: 'Disruptive to learning (55-70 dB)',
        alarmTrigger: 'Harmful, immediate action needed (>70 dB)'
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsx("div", { className: "bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Noise Threshold Settings" }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-gray-100 rounded-full", children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), _jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6", children: [_jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "WHO Guidelines for Classrooms" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "<40 dB:" }), " Optimal for learning"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "40-55 dB:" }), " Acceptable"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "55-70 dB:" }), " Disruptive"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: ">70 dB:" }), " Harmful, action needed"] })] })] }), _jsx("div", { className: "space-y-6", children: Object.keys(thresholds).map((key) => (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("label", { className: "font-medium text-gray-700", children: thresholdLabels[key] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "number", value: thresholds[key], onChange: (e) => updateThreshold(key, Number(e.target.value)), className: "w-20 px-2 py-1 border rounded text-center", min: 20, max: 100 }), _jsx("span", { className: "text-gray-500", children: "dB" })] })] }), _jsx("input", { type: "range", min: 20, max: 100, value: thresholds[key], onChange: (e) => updateThreshold(key, Number(e.target.value)), className: "w-full accent-tisa-purple" }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: thresholdDescriptions[key] }), errors[key] && (_jsx("p", { className: "text-xs text-red-500 mt-1", children: errors[key] }))] }, key))) }), _jsx("div", { className: "mt-6 pt-6 border-t", children: _jsx("button", { onClick: resetToWHO, disabled: isUsingWHODefaults, className: "w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium transition-colors", children: isUsingWHODefaults ? 'Using WHO Recommendations ✓' : 'Reset to WHO Recommendations' }) })] }) }) }));
}
