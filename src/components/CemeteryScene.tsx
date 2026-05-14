'use client'

export default function CemeteryScene({ height = 340 }: { height?: number }) {
  return (
    <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden' }}>
      <svg width="100%" height="100%" viewBox="0 0 900 340" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6db892"/>
            <stop offset="60%" stopColor="#96ccaa"/>
            <stop offset="100%" stopColor="#bcdec6"/>
          </linearGradient>
          <linearGradient id="gnd" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4e7a3c"/>
            <stop offset="100%" stopColor="#345228"/>
          </linearGradient>
          <radialGradient id="sg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5d060" stopOpacity=".45"/>
            <stop offset="100%" stopColor="#f5d060" stopOpacity="0"/>
          </radialGradient>
        </defs>

        <rect width="900" height="340" fill="url(#sky)"/>

        <ellipse cx="145" cy="62" rx="58" ry="58" fill="url(#sg)"/>
        <circle cx="145" cy="62" r="28" fill="#f5d060" opacity=".94"/>

        <g opacity=".78">
          <ellipse cx="310" cy="52" rx="55" ry="16" fill="white"/>
          <ellipse cx="288" cy="49" rx="34" ry="14" fill="white"/>
          <ellipse cx="334" cy="48" rx="28" ry="12" fill="white"/>
        </g>
        <g opacity=".68">
          <ellipse cx="700" cy="44" rx="48" ry="14" fill="white"/>
          <ellipse cx="718" cy="41" rx="30" ry="12" fill="white"/>
        </g>

        <ellipse cx="450" cy="330" rx="560" ry="75" fill="url(#gnd)"/>
        <ellipse cx="450" cy="278" rx="580" ry="28" fill="#5e8a48"/>
        <ellipse cx="450" cy="272" rx="570" ry="14" fill="#6a9a52" opacity=".5"/>

        <ellipse cx="450" cy="332" rx="30" ry="65" fill="rgba(195,178,148,.26)"/>

        <rect x="58" y="204" width="13" height="66" rx="4" fill="#6a4828"/>
        <ellipse cx="65" cy="188" rx="32" ry="46" fill="#295218"/>
        <ellipse cx="65" cy="170" rx="24" ry="35" fill="#356228"/>
        <ellipse cx="65" cy="156" rx="17" ry="25" fill="#3e6e30"/>

        <rect x="760" y="212" width="11" height="54" rx="3" fill="#6a4828"/>
        <ellipse cx="766" cy="198" rx="26" ry="38" fill="#295218"/>
        <ellipse cx="766" cy="184" rx="20" ry="29" fill="#356228"/>

        <rect x="162" y="228" width="9" height="40" rx="3" fill="#6a4828"/>
        <ellipse cx="167" cy="218" rx="19" ry="27" fill="#2d5a1c"/>
        <ellipse cx="167" cy="205" rx="14" ry="20" fill="#386828"/>

        <rect x="210" y="238" width="38" height="8" rx="3" fill="#aabbc6"/>
        <path d="M214 204 Q228 192 242 204 L242 238 L214 238 Z" fill="#c8d4dc"/>
        <rect x="217" y="206" width="2" height="28" rx="1" fill="rgba(255,255,255,.28)"/>
        <rect x="214" y="219" width="28" height="2" rx="1" fill="rgba(255,255,255,.28)"/>
        <text x="216" y="252" fontSize="13">🌹</text>

        <rect x="336" y="246" width="30" height="7" rx="2" fill="#a4b4be"/>
        <path d="M339 220 Q351 212 363 220 L363 246 L339 246 Z" fill="#bcc8d0"/>

        <rect x="534" y="240" width="38" height="8" rx="3" fill="#aabbc6"/>
        <path d="M538 206 Q552 194 566 206 L566 240 L538 240 Z" fill="#c8d4dc"/>
        <rect x="541" y="208" width="2" height="28" rx="1" fill="rgba(255,255,255,.28)"/>
        <rect x="538" y="221" width="28" height="2" rx="1" fill="rgba(255,255,255,.28)"/>
        <text x="540" y="254" fontSize="13">🌻</text>

        <rect x="646" y="244" width="32" height="7" rx="2" fill="#a4b4be"/>
        <path d="M649 220 Q661 212 673 220 L673 244 L649 244 Z" fill="#bcc8d0"/>

        <rect x="286" y="236" width="7" height="20" rx="2" fill="#fef4d8"/>
        <ellipse cx="290" cy="234" rx="5" ry="7" fill="#f5a020" opacity=".92"/>
        <ellipse cx="290" cy="233" rx="2.5" ry="3.5" fill="#fff8b0" opacity=".8"/>

        <rect x="608" y="238" width="7" height="18" rx="2" fill="#fef4d8"/>
        <ellipse cx="612" cy="236" rx="5" ry="7" fill="#f5a020" opacity=".92"/>
        <ellipse cx="612" cy="235" rx="2.5" ry="3.5" fill="#fff8b0" opacity=".8"/>

        <rect x="398" y="246" width="5" height="14" rx="2" fill="#fef4d8"/>
        <ellipse cx="401" cy="245" rx="4" ry="5.5" fill="#f5a020" opacity=".85"/>

        <ellipse cx="450" cy="272" rx="575" ry="12" fill="#78a85e" opacity=".3"/>
      </svg>
    </div>
  )
}
