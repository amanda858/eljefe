type BullMarkProps = {
    className?: string;
};

export function BullMark({ className = "" }: BullMarkProps) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            viewBox="0 0 280 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M193 47C216 28 241 22 261 30C252 48 236 61 212 71L188 77L193 47Z"
                fill="#78110E"
            />
            <path
                d="M84 76C57 56 33 50 16 57C26 74 44 88 70 99L95 102L84 76Z"
                fill="#8A1410"
            />
            <path
                d="M101 90C107 62 126 40 159 32C179 27 201 29 220 38C208 51 201 68 199 87L183 103L150 107L101 90Z"
                fill="#E63A30"
            />
            <path
                d="M94 102C96 79 108 60 130 47C154 33 184 30 211 38C239 46 258 61 267 82C275 102 272 123 259 141C246 159 226 169 198 173H116C96 173 79 167 67 156C55 145 49 132 50 117C52 104 59 94 71 88C81 83 91 85 94 102Z"
                fill="#C91E18"
            />
            <path
                d="M108 121C128 126 146 128 163 125C171 124 177 128 180 135L187 154C189 160 185 166 179 166H113C94 166 79 161 69 150C60 141 56 131 58 121L68 114C80 114 93 116 108 121Z"
                fill="#9E1713"
            />
            <path
                d="M83 79C71 59 53 47 33 46C40 60 54 72 74 84"
                stroke="#F4EFE4"
                strokeWidth="9"
                strokeLinecap="round"
            />
            <path
                d="M105 113C118 119 132 123 147 123"
                stroke="#74110E"
                strokeWidth="8"
                strokeLinecap="round"
            />
            <path
                d="M82 102C75 99 67 99 60 102"
                stroke="#1B1212"
                strokeWidth="7"
                strokeLinecap="round"
            />
            <circle cx="92" cy="92" r="5.5" fill="#160F10" />
            <path d="M114 173L101 209" stroke="#6F100D" strokeWidth="12" strokeLinecap="round" />
            <path d="M141 173L151 210" stroke="#8C1511" strokeWidth="12" strokeLinecap="round" />
            <path d="M198 171L185 208" stroke="#6B0F0C" strokeWidth="12" strokeLinecap="round" />
            <path d="M224 169L240 207" stroke="#7F120E" strokeWidth="12" strokeLinecap="round" />
            <path d="M242 88C264 72 274 56 270 42" stroke="#7B110E" strokeWidth="9" strokeLinecap="round" />
        </svg>
    );
}