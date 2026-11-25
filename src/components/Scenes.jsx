// Original SVG artwork for the site — drawn in the brand gradients (teal → green → sun yellow).
// To use real photos later, add an `image` path to a service / destination in src/config/site.js.
import { useId } from "react";

const clean = (s) => s.replace(/[^a-zA-Z0-9]/g, "");

function Frame({ vb = "0 0 400 240", stops, label, className, children }) {
  const id = clean(useId());
  return (
    <svg
      viewBox={vb}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          {stops.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
        <radialGradient id={`${id}sun`}>
          <stop offset="0" stopColor="#fff7a8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#f7df3a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}sky)`} />
      {children(id)}
    </svg>
  );
}

const Sun = ({ id, x, y, r = 24, glow = 90 }) => (
  <>
    <circle cx={x} cy={y} r={glow} fill={`url(#${id}sun)`} />
    <circle cx={x} cy={y} r={r} fill="#fff6a0" />
  </>
);

const Clouds = ({ items }) => (
  <g fill="#fff" opacity="0.32">
    {items.map(([x, y, w]) => (
      <g key={`${x}${y}`}>
        <ellipse cx={x} cy={y} rx={w} ry={w / 4} />
        <ellipse cx={x + w * 0.5} cy={y - w * 0.18} rx={w * 0.55} ry={w / 4} />
      </g>
    ))}
  </g>
);

const Plane = ({ transform }) => (
  <g transform={transform}>
    <path d="M0 10Q0 4 10 4H70Q92 2 104 10Q92 18 70 18H10Q0 16 0 10Z" fill="#fff" />
    <path d="M6 5-2-8H10L22 5Z" fill="#e6f6ec" />
    <path d="M44 14 28 34H44L66 16Z" fill="#d3efdc" />
    <path d="M46 8 30-12H46L68 6Z" fill="#fff" />
    <g fill="#0c6f86" opacity="0.7">
      {[22, 32, 42, 52, 62].map((x) => (
        <circle key={x} cx={x} cy="9" r="1.7" />
      ))}
    </g>
  </g>
);

/* ---------- Service scenes (400 × 240) ---------- */

function AirScene(props) {
  return (
    <Frame {...props} label={props.label} stops={[[0, "#0c6f86"], [0.55, "#34bd6f"], [1, "#f7df3a"]]}>
      {(id) => (
        <>
          <Sun id={id} x={300} y={158} r={26} glow={100} />
          <Clouds items={[[78, 60, 46], [300, 44, 40], [190, 112, 34]]} />
          <path d="M0 190 70 132 120 170 190 106 260 176 330 140 400 186V240H0Z" fill="#0a5530" opacity="0.55" />
          <path d="M0 216 60 176 130 206 210 160 300 210 360 186 400 206V240H0Z" fill="#073d22" />
          <path d="M150 88Q90 112 8 132" stroke="#fff" strokeOpacity="0.55" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="1 9" />
          <Plane transform="translate(146 70) rotate(-16) scale(1.15)" />
        </>
      )}
    </Frame>
  );
}

function InsuranceScene(props) {
  return (
    <Frame {...props} stops={[[0, "#0a5530"], [0.6, "#0fa44f"], [1, "#b6e84a"]]}>
      {(id) => (
        <>
          <circle cx="86" cy="52" r="64" fill="#fff" opacity="0.08" />
          <circle cx="330" cy="168" r="92" fill="#fff" opacity="0.07" />
          <defs>
            <linearGradient id={`${id}sh`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#c9f2d7" />
            </linearGradient>
          </defs>
          <path
            d="M200 34C230 48 252 52 272 54V120C272 162 238 188 200 204C162 188 128 162 128 120V54C148 52 170 48 200 34Z"
            fill={`url(#${id}sh)`}
            opacity="0.96"
          />
          <path d="M168 120 192 144 236 94" stroke="#0a8240" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M0 206Q100 176 200 204T400 192V240H0Z" fill="#073d22" opacity="0.8" />
          <path d="M0 224Q120 200 240 222T400 214V240H0Z" fill="#052b19" />
        </>
      )}
    </Frame>
  );
}

function HotelScene(props) {
  const rows = [0, 1, 2, 3, 4, 5];
  const cols = [0, 1, 2, 3];
  return (
    <Frame {...props} stops={[[0, "#0a3d3a"], [0.55, "#0c6f86"], [1, "#f7df3a"]]}>
      {(id) => (
        <>
          <Sun id={id} x={70} y={176} r={22} glow={90} />
          <rect x="96" y="112" width="54" height="92" fill="#0a5530" />
          <rect x="262" y="92" width="60" height="112" fill="#0a5530" />
          <rect x="150" y="48" width="112" height="156" rx="3" fill="#073d22" />
          {rows.map((r) =>
            cols.map((c) => (
              <rect
                key={`${r}${c}`}
                x={162 + c * 24}
                y={60 + r * 22}
                width="14"
                height="12"
                rx="2"
                fill={(r * 3 + c) % 3 === 0 ? "#2b6b52" : "#f7df3a"}
                opacity={(r * 3 + c) % 3 === 0 ? 0.6 : 0.95}
              />
            ))
          )}
          <rect x="190" y="182" width="32" height="22" rx="3" fill="#f7df3a" />
          <g stroke="#052b19" strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M52 206Q56 176 66 150" />
            <path d="M356 206Q352 180 342 156" />
          </g>
          <g fill="#0fa44f">
            <path d="M66 150Q40 140 26 156Q50 146 66 150ZM66 150Q80 128 100 130Q82 138 66 150ZM66 150Q52 128 38 126Q58 130 66 150Z" />
            <path d="M342 156Q368 146 382 162Q358 152 342 156ZM342 156Q328 134 308 136Q326 144 342 156ZM342 156Q356 134 372 132Q354 138 342 156Z" />
          </g>
          <rect y="204" width="400" height="36" fill="#052b19" />
        </>
      )}
    </Frame>
  );
}

function TourScene(props) {
  return (
    <Frame {...props} stops={[[0, "#0b6b36"], [0.5, "#34bd6f"], [1, "#f7df3a"]]}>
      {(id) => (
        <>
          <Sun id={id} x={120} y={168} r={34} glow={120} />
          <defs>
            <linearGradient id={`${id}bl`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ce1126" />
              <stop offset="0.55" stopColor="#f7df3a" />
              <stop offset="1" stopColor="#0fa44f" />
            </linearGradient>
          </defs>
          <Clouds items={[[300, 48, 34], [60, 56, 28]]} />
          <ellipse cx="300" cy="82" rx="30" ry="36" fill={`url(#${id}bl)`} />
          <path d="M280 108 288 124M320 108 312 124" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.5" />
          <rect x="287" y="124" width="26" height="14" rx="3" fill="#7a4a1a" />
          <path d="M0 196 90 150 180 190 270 140 360 184 400 166V240H0Z" fill="#0a5530" opacity="0.6" />
          <path d="M0 214Q100 192 200 212T400 204V240H0Z" fill="#073d22" />
          <path d="M296 214V176" stroke="#052b19" strokeWidth="6" strokeLinecap="round" />
          <path d="M296 190 280 178M296 184 314 172" stroke="#052b19" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="296" cy="168" rx="52" ry="13" fill="#052b19" />
          <ellipse cx="270" cy="162" rx="26" ry="8" fill="#052b19" />
          <rect y="222" width="400" height="18" fill="#052b19" />
        </>
      )}
    </Frame>
  );
}

function TransferScene(props) {
  return (
    <Frame {...props} stops={[[0, "#073d22"], [0.5, "#0fa44f"], [1, "#f2d40f"]]}>
      {(id) => (
        <>
          <Sun id={id} x={286} y={128} r={20} glow={90} />
          <rect x="52" y="86" width="9" height="46" fill="#052b19" />
          <path d="M42 70H71L66 86H47Z" fill="#052b19" />
          <path d="M44 74H69" stroke="#f7df3a" strokeWidth="3" />
          <path d="M0 132H400V240H0Z" fill="#0a5530" />
          <path d="M0 132H400V150H0Z" fill="#073d22" opacity="0.6" />
          <path d="M146 240 188 132H212L254 240Z" fill="#1a241b" />
          <g fill="#f7df3a">
            <path d="M198 140H202L203 152H197Z" />
            <path d="M196 164H204L206 182H194Z" />
            <path d="M192 196H208L211 224H189Z" />
          </g>
          <path d="M146 240 188 132" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
          <path d="M254 240 212 132" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
          <g transform="translate(168 184)">
            <rect x="0" y="12" width="64" height="26" rx="8" fill="#ce1126" />
            <path d="M10 12 18 0H46L54 12Z" fill="#a50d20" />
            <path d="M16 11 21 3H43L48 11Z" fill="#bfe9d0" opacity="0.85" />
            <rect x="6" y="22" width="12" height="6" rx="3" fill="#fff6a0" />
            <rect x="46" y="22" width="12" height="6" rx="3" fill="#fff6a0" />
            <rect x="2" y="36" width="14" height="6" rx="3" fill="#111611" />
            <rect x="48" y="36" width="14" height="6" rx="3" fill="#111611" />
          </g>
        </>
      )}
    </Frame>
  );
}

function VisaScene(props) {
  return (
    <Frame {...props} stops={[[0, "#0c6f86"], [0.55, "#0fa44f"], [1, "#fbea6a"]]}>
      {() => (
        <>
          <g fill="none" stroke="#fff" strokeOpacity="0.16" strokeWidth="1.5">
            <circle cx="320" cy="70" r="64" />
            <ellipse cx="320" cy="70" rx="26" ry="64" />
            <path d="M256 70H384M266 40H374M266 100H374" />
          </g>
          <g transform="rotate(-8 190 120)">
            <rect x="138" y="36" width="124" height="168" rx="12" fill="#0a5530" />
            <rect x="138" y="36" width="124" height="168" rx="12" fill="none" stroke="#f7df3a" strokeWidth="3" />
            <circle cx="200" cy="100" r="30" fill="none" stroke="#f7df3a" strokeWidth="3" />
            <ellipse cx="200" cy="100" rx="12" ry="30" fill="none" stroke="#f7df3a" strokeWidth="2.5" />
            <path d="M170 100H230" stroke="#f7df3a" strokeWidth="2.5" />
            <rect x="166" y="150" width="68" height="8" rx="4" fill="#f7df3a" />
            <rect x="178" y="168" width="44" height="6" rx="3" fill="#f7df3a" opacity="0.6" />
          </g>
          <g transform="rotate(12 300 178)">
            <circle cx="300" cy="178" r="34" fill="none" stroke="#f7df3a" strokeWidth="3.5" strokeDasharray="4 4" />
            <circle cx="300" cy="178" r="25" fill="#f7df3a" opacity="0.25" />
            <path d="M286 178 297 190 316 166" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        </>
      )}
    </Frame>
  );
}

const SERVICE_SCENES = {
  "air-ticket": AirScene,
  "travel-insurance": InsuranceScene,
  "hotel-booking": HotelScene,
  "tour-packages": TourScene,
  "airport-transfers": TransferScene,
  "visa-processing": VisaScene,
};

export function ServiceScene({ id, className }) {
  const Scene = SERVICE_SCENES[id] || AirScene;
  return <Scene className={className} />;
}

/* ---------- Destination scenes (300 × 200) ---------- */

const SKY_HEIGHTS = [58, 92, 70, 118, 80, 102, 64, 112, 76, 96, 60];

function Skyline({ base = 168 }) {
  return (
    <g fill="#052b19">
      {SKY_HEIGHTS.map((h, i) => (
        <rect key={i} x={i * 28 - 4} y={base - h} width="24" height={h + 40} opacity={i % 2 ? 0.88 : 1} />
      ))}
      {SKY_HEIGHTS.map((h, i) =>
        i % 3 === 0 ? <rect key={`w${i}`} x={i * 28 + 2} y={base - h + 10} width="6" height="6" fill="#f7df3a" opacity="0.9" /> : null
      )}
    </g>
  );
}

const Palm = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0Q4-34 12-60" stroke="#052b19" strokeWidth="5" strokeLinecap="round" fill="none" />
    <g fill="#052b19">
      <path d="M12-60Q-12-70-26-52Q-4-62 12-60Z" />
      <path d="M12-60Q34-74 52-60Q30-62 12-60Z" />
      <path d="M12-60Q4-84-14-88Q4-78 12-60Z" />
      <path d="M12-60Q26-84 44-84Q28-76 12-60Z" />
    </g>
  </g>
);

export function DestinationScene({ kind = "skyline", colors = ["#0a3d3a", "#f7df3a"], className }) {
  const id = clean(useId());
  return (
    <svg viewBox="0 0 300 200" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}d`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
        <radialGradient id={`${id}g`}>
          <stop offset="0" stopColor="#fff7a8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#f7df3a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1aa6b7" />
          <stop offset="1" stopColor="#0c6f86" />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill={`url(#${id}d)`} />
      <circle cx="226" cy="118" r="70" fill={`url(#${id}g)`} />
      <circle cx="226" cy="118" r="20" fill="#fff6a0" />

      {kind === "skyline" && (
        <>
          <Skyline />
          <rect y="168" width="300" height="32" fill="#041f13" />
        </>
      )}

      {kind === "spire" && (
        <>
          <Skyline base={176} />
          <path d="M146 14 151 70 158 140 164 176H128L134 140 141 70Z" fill="#041f13" />
          <path d="M146 14V0" stroke="#041f13" strokeWidth="2" />
          <rect y="176" width="300" height="24" fill={`url(#${id}sea)`} />
        </>
      )}

      {kind === "clock" && (
        <>
          <g fill="#052b19" opacity="0.8">
            <rect x="20" y="128" width="60" height="50" />
            <rect x="196" y="120" width="70" height="58" />
          </g>
          <rect x="120" y="56" width="42" height="122" fill="#041f13" />
          <path d="M120 56 141 16 162 56Z" fill="#041f13" />
          <circle cx="141" cy="84" r="13" fill="#f7df3a" />
          <path d="M141 76V84H147" stroke="#041f13" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <rect y="178" width="300" height="22" fill={`url(#${id}sea)`} />
          <path d="M0 178H300" stroke="#041f13" strokeWidth="5" />
        </>
      )}

      {kind === "beach" && (
        <>
          <rect y="134" width="300" height="66" fill={`url(#${id}sea)`} />
          <path d="M0 172Q90 150 190 168T300 160V200H0Z" fill="#f6e7a6" />
          <path d="M96 122 96 96 120 122Z" fill="#fff" opacity="0.92" />
          <path d="M88 124H126L118 132H96Z" fill="#052b19" />
          <Palm x={44} y={176} s={1.1} />
          <Palm x={252} y={182} s={0.9} />
        </>
      )}

      {kind === "mountain" && (
        <>
          <path d="M0 150 70 70 118 122 180 48 250 130 300 100V200H0Z" fill="#052b19" opacity="0.5" />
          <path d="M0 176 60 128 120 168 190 118 260 170 300 150V200H0Z" fill="#052b19" />
          <g fill="#f7df3a" opacity="0.9">
            <rect x="40" y="170" width="6" height="6" />
            <rect x="140" y="176" width="6" height="6" />
            <rect x="214" y="174" width="6" height="6" />
          </g>
        </>
      )}
    </svg>
  );
}

/* ---------- Hero backdrop (1440 × 420), drawn behind the hero content ---------- */

export function HeroScene({ className }) {
  const id = clean(useId());
  return (
    <svg viewBox="0 0 1440 420" className={className} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}s`}>
          <stop offset="0" stopColor="#fff7a8" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#f7df3a" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f7df3a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}lake`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#34bd6f" stopOpacity="0.9" />
          <stop offset="1" stopColor="#0c6f86" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <circle cx="1090" cy="262" r="260" fill={`url(#${id}s)`} className="sun-pulse" />
      <circle cx="1090" cy="262" r="46" fill="#fff6a0" />
      <path d="M0 270 150 150 250 226 400 110 560 240 700 168 860 252 1010 160 1160 246 1300 176 1440 236V420H0Z" fill="#34bd6f" opacity="0.28" />
      <path d="M0 300 120 224 240 290 380 196 540 292 690 226 840 300 1000 218 1150 298 1300 232 1440 290V420H0Z" fill="#0b7a45" opacity="0.7" />
      <rect y="322" width="1440" height="100" fill={`url(#${id}lake)`} />
      <g stroke="#fbea6a" strokeLinecap="round" opacity="0.75">
        <path d="M1030 336H1150" strokeWidth="4" />
        <path d="M1050 350H1130" strokeWidth="3" />
        <path d="M1066 364H1114" strokeWidth="2.5" />
      </g>
      <path d="M0 360Q180 322 380 352T760 346T1140 360T1440 340V420H0Z" fill="#073d22" />
      <path d="M0 392Q240 364 480 388T960 384T1440 380V420H0Z" fill="#052b19" />
      <path d="M0 404Q360 384 720 402T1440 398V420H0Z" style={{ fill: "var(--color-paper)" }} />
    </svg>
  );
}

export function MountainBackdrop({ className }) {
  return (
    <svg viewBox="0 0 1440 200" className={className} preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 200 160 60 280 150 420 30 600 160 760 70 940 170 1100 50 1260 150 1440 80V200Z" fill="#34bd6f" opacity="0.16" />
      <path d="M0 200 200 110 340 180 520 90 700 190 900 110 1080 190 1260 120 1440 180V200Z" fill="#f7df3a" opacity="0.07" />
    </svg>
  );
}

export function Wave({ className, fill = "var(--color-paper)", flip = false }) {
  return (
    <svg
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      aria-hidden="true"
    >
      <path d="M0 70V34C220 -4 460 -6 720 28S1220 66 1440 24V70Z" fill={fill} />
    </svg>
  );
}
