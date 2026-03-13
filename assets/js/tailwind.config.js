tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                display: ['"Stereo Gothic W06 950"', 'Montserrat', 'sans-serif'],
            },
            colors: {
                bg: '#FFFFFF',
                surface: '#F5F5F0', /* Premium Gray */
                primary: '#09090b', /* Near Black */
                muted: '#a1a1aa',
                accent: '#1C1C1C',
                border: '#E0E0E0',
                brandAccent: '#0057FF' /* DS24 Blue Reference */
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        }
    }
}
