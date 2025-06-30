import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SIZES = {
    width,
    height,
    base: 8,
    font: 14,
    radius: 12,
    padding: 12,
    margin: 16,
    small: 12,
    body: 16,
    h1: 32,
    h2: 24,
    h3: 20,
    caption: 14,
};

export const COLORS = {
    primary: '#0A84FF',
    background: '#D3D3D3',
    text: '#1A1A1A',
    white: '#FFFFFF',
    gray: '#8E8E93',
    lightGray: '#F2F2F7',
    red: '#FF3B30',
    border: '#E5E5EA',
};

export const FONTS = {
    regular: { fontSize: SIZES.font, fontFamily: 'System' },
    title: { fontSize: 24, fontWeight: 'bold', fontFamily: 'System' },
    medium: { fontSize: SIZES.body, fontWeight: '500', fontFamily: 'System' },
    bold: { fontSize: SIZES.body, fontWeight: 'bold', fontFamily: 'System' },
};