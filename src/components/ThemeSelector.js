import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EggTheme } from '../themes/EggTheme';
import { EggClassicTheme } from '../themes/EggClassicTheme';
import { GlassTheme } from '../themes/GlassTheme';
import { ThermometerTheme } from '../themes/ThermometerTheme';
import { BatteryTheme } from '../themes/BatteryTheme';
import { WeatherTheme } from '../themes/WeatherTheme';
import { VolcanoTheme } from '../themes/VolcanoTheme';
import { CustomTheme } from '../themes/CustomTheme';
const themes = [
    {
        id: 'egg',
        name: 'Egg',
        description: 'A cute egg character that reacts to noise',
        preview: '🥚',
    },
    {
        id: 'eggClassic',
        name: 'Egg Classic',
        description: 'Original simple egg design with crack progression',
        preview: '🥚',
    },
    {
        id: 'glass',
        name: 'Glass',
        description: 'Elegant glass that fills with color',
        preview: '🥛',
    },
    {
        id: 'thermometer',
        name: 'Thermometer',
        description: 'Rising temperature shows noise level',
        preview: '🌡️',
    },
    {
        id: 'battery',
        name: 'Battery',
        description: 'Battery drains as noise increases',
        preview: '🔋',
    },
    {
        id: 'weather',
        name: 'Weather',
        description: 'Sunny to thunderstorm progression',
        preview: '☀️',
    },
    {
        id: 'volcano',
        name: 'Volcano',
        description: 'Volcano builds pressure until eruption',
        preview: '🌋',
    },
    {
        id: 'custom',
        name: 'Custom',
        description: 'Use your own uploaded images',
        preview: '🖼️',
    },
];
// Mini preview component that renders a theme at a specific noise level
function ThemePreview({ theme, level, customImages }) {
    // Mock props for legacy themes (egg, glass, custom)
    const getMockProps = () => {
        switch (level) {
            case 'quiet':
                return { noiseLevel: 30, threshold: 70, isTooLoud: false, customImages, backgroundColor: 'dark' };
            case 'moderate':
                return { noiseLevel: 50, threshold: 70, isTooLoud: false, customImages, backgroundColor: 'dark' };
            case 'loud':
                return { noiseLevel: 65, threshold: 70, isTooLoud: false, customImages, backgroundColor: 'dark' };
            case 'tooLoud':
                return { noiseLevel: 85, threshold: 70, isTooLoud: true, customImages, backgroundColor: 'dark' };
        }
    };
    const levelProps = { level };
    const mockProps = getMockProps();
    // Scale down the theme for mini preview
    const scaleStyle = { transform: 'scale(0.25)', transformOrigin: 'center center' };
    const renderMiniTheme = () => {
        switch (theme) {
            case 'egg':
                return _jsx(EggTheme, { ...mockProps });
            case 'eggClassic':
                return _jsx(EggClassicTheme, { ...mockProps });
            case 'glass':
                return _jsx(GlassTheme, { ...mockProps });
            case 'custom':
                return _jsx(CustomTheme, { ...mockProps });
            case 'thermometer':
                return _jsx(ThermometerTheme, { ...levelProps });
            case 'battery':
                return _jsx(BatteryTheme, { ...levelProps });
            case 'weather':
                return _jsx(WeatherTheme, { ...levelProps });
            case 'volcano':
                return _jsx(VolcanoTheme, { ...levelProps });
            default:
                return _jsx(EggTheme, { ...mockProps });
        }
    };
    return (_jsx("div", { className: "relative w-20 h-20 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center", children: _jsx("div", { style: scaleStyle, className: "absolute w-[300px] h-[300px] flex items-center justify-center", children: renderMiniTheme() }) }));
}
// Preview grid showing all 4 levels for a theme
function ThemePreviewGallery({ theme, customImages }) {
    const levels = [
        { level: 'quiet', label: 'Quiet', color: 'bg-green-100 text-green-700 border-green-200' },
        { level: 'moderate', label: 'Moderate', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
        { level: 'loud', label: 'Loud', color: 'bg-orange-100 text-orange-700 border-orange-200' },
        { level: 'tooLoud', label: 'Too Loud', color: 'bg-red-100 text-red-700 border-red-200' },
    ];
    return (_jsx("div", { className: "mt-3 grid grid-cols-4 gap-2", children: levels.map(({ level, label, color }) => (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: `w-full aspect-square rounded-lg border-2 ${color} flex items-center justify-center overflow-hidden`, children: _jsx(ThemePreview, { theme: theme, level: level, customImages: customImages }) }), _jsx("span", { className: `text-[10px] font-medium mt-1 ${color.split(' ')[1]}`, children: label })] }, level))) }));
}
export function ThemeSelector({ currentTheme, customImages, onThemeChange }) {
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Choose Theme" }), _jsx("div", { className: "grid gap-4", children: themes.map((theme) => (_jsxs("button", { onClick: () => onThemeChange(theme.id), disabled: theme.id === 'custom' && customImages.length === 0, className: `flex flex-col p-4 rounded-xl border-2 transition-all text-left ${currentTheme === theme.id
                        ? 'border-tisa-purple bg-tisa-purple/5'
                        : 'border-gray-200 hover:border-gray-300'} ${theme.id === 'custom' && customImages.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`, children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: "text-4xl", children: theme.preview }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("p", { className: "font-semibold text-gray-800", children: theme.name }), currentTheme === theme.id && (_jsx("span", { className: "px-2 py-0.5 bg-tisa-purple text-white text-xs rounded-full", children: "Active" }))] }), _jsx("p", { className: "text-sm text-gray-500", children: theme.description }), theme.id === 'custom' && customImages.length === 0 && (_jsx("p", { className: "text-xs text-amber-600 mt-1", children: "Upload images to enable" }))] })] }), _jsx(ThemePreviewGallery, { theme: theme.id, customImages: customImages })] }, theme.id))) })] }));
}
