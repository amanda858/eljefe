type RunningBullMarkProps = {
    className?: string;
};

export function RunningBullMark({ className = "" }: RunningBullMarkProps) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            viewBox="0 0 360 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className="running-bull-tail"
                d="M291 84C315 67 328 49 324 34"
                stroke="#7E120E"
                strokeWidth="9"
                strokeLinecap="round"
            />
            <path
                d="M67 90C46 74 27 70 15 76C22 87 37 98 59 108L82 109L67 90Z"
                fill="#7F1511"
            />
            <path
                d="M93 115C97 82 118 58 152 45C182 34 219 33 251 43C286 54 309 74 316 101C322 122 315 143 296 159C278 174 252 182 217 182H118C92 182 73 176 60 164C47 152 42 138 45 123C48 108 56 97 70 92C84 87 92 93 93 115Z"
                fill="#C91E18"
            />
            <path
                d="M140 81C151 60 169 45 194 38C220 31 249 34 276 46C296 55 309 66 315 80C297 72 277 68 255 68C223 68 192 72 164 83L140 81Z"
                fill="#E63A30"
            />
            <path
                d="M96 113C113 101 126 88 137 72C146 59 158 51 175 47L168 100L141 120L96 113Z"
                fill="#951712"
            />
            <path
                d="M84 84C73 66 56 52 38 50C45 63 57 75 75 87"
                stroke="#F4EFE4"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M118 76L90 54"
                stroke="#6E100C"
                strokeWidth="10"
                strokeLinecap="round"
            />
            <path
                d="M117 75L132 46"
                stroke="#6E100C"
                strokeWidth="10"
                strokeLinecap="round"
            />
            <path
                d="M104 95C96 92 87 92 79 96"
                stroke="#261213"
                strokeWidth="7"
                strokeLinecap="round"
            />
            <circle cx="112" cy="87" r="5" fill="#180F10" />
            <path
                d="M126 106C143 113 160 115 177 111"
                stroke="#70100D"
                strokeWidth="7"
                strokeLinecap="round"
            />
            <path
                d="M20 133H59"
                stroke="#D9A75A"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.55"
            />
            <path
                d="M2 151H45"
                stroke="#D9A75A"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.4"
            />
            <path
                className="running-bull-leg running-bull-leg-back"
                d="M236 176L223 207"
                stroke="#6F100D"
                strokeWidth="12"
                strokeLinecap="round"
            />
            <path
                className="running-bull-leg running-bull-leg-back"
                d="M264 173L283 205"
                stroke="#7C120E"
                strokeWidth="12"
                strokeLinecap="round"
            />
            <path
                className="running-bull-leg running-bull-leg-front"
                d="M130 178L101 206"
                stroke="#7A120E"
                strokeWidth="12"
                strokeLinecap="round"
            />
            <path
                className="running-bull-leg running-bull-leg-front"
                d="M160 179L173 209"
                stroke="#8A1511"
                strokeWidth="12"
                strokeLinecap="round"
            />
        </svg>
    );
}