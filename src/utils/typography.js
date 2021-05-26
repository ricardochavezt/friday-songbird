import Typography from 'typography';
import { MIN_MOBILE_MEDIA_QUERY, MIN_TABLET_MEDIA_QUERY, MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants';

const typography = new Typography({
    googleFonts: [
        {
            name: 'PT Sans',
            styles: ['400']
        }
    ],
    baseFontSize: "1em",
    baseLineHeight: 1.4,
    bodyFontFamily: ['PT Sans', 'Arial', 'sans-serif'],
    bodyColor: '#222',
    overrideStyles: (verticalRhythm, options, styles) => ({
        a: {
            color: '#268bd2',
            textDecoration: 'none'
        },
        'a strong': {
            color: 'inherit'
        },
        'h1, h2, h3, h4, h5, h6': {
            lineHeight: 1.25,
            color: '#313131'
        },
        h1: {
            fontSize: '2rem'
        },
        h2: {
            marginTop: '1rem',
            fontSize: '1.5rem'
        },
        h3: {
            marginTop: '1.5rem',
            fontSize: '1.25rem'
        },
        'h4, h5, h6': {
            marginTop: '1rem',
            fontSize: '1rem'
        },
        p: {
            marginTop: 0,
            marginBottom: '1rem'
        },
        strong: {
            color: '#303030'
        },
        'ul, ol, dl': {
            marginTop: 0,
            marginBottom: '1rem'
        },
        blockquote: {
            padding: '.5rem 1rem',
            margin: '.8rem 0',
            color: '#7a7a7a',
            borderLeft: '.25rem solid #e5e5e5'
        },
        'blockquote p:last-child': {
            marginBottom: 0
        },
        [MIN_TABLET_MEDIA_QUERY]: {
            html: {
                fontSize: '16px'
            }
        },
        [MIN_DEFAULT_MEDIA_QUERY]: {
            html: {
                fontSize: '18px'
            }
        },
        [MIN_MOBILE_MEDIA_QUERY]: {
            blockquote: {
                paddingRight: '5rem',
                paddingLeft: '1.25rem'
            }
        }
    })
});
const { rhythm, scale } = typography;

export { rhythm, scale, typography as default };
