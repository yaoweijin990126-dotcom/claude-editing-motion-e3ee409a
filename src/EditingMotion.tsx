import React from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
  delayRender,
  continueRender,
} from "remotion";
const ink = "#302b27",
  paper = "#f6f2e9",
  red = "#ce715f",
  teal = "#72b8ac",
  yellow = "#f4d46e";
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const ramp = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], clamp);
const between = (t: number, a: number, b: number) => t >= a && t < b;
const ready = delayRender("Handwriting font");
new FontFace("Hand", `url(${staticFile("fonts/LongCang-Regular.ttf")})`)
  .load()
  .then((f) => {
    document.fonts.add(f);
    continueRender(ready);
  })
  .catch(() => continueRender(ready));
const titleReady = delayRender("Display handwriting font");
new FontFace("HandTitle", `url(${staticFile("fonts/MaShanZheng-Regular.ttf")})`)
  .load()
  .then((f) => {
    document.fonts.add(f);
    continueRender(titleReady);
  })
  .catch(() => continueRender(titleReady));
const Box = ({
  x,
  y,
  w,
  h,
  fill = paper,
  r = 8,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  r?: number;
}) => (
  <rect
    x={x}
    y={y}
    width={w}
    height={h}
    rx={r}
    fill={fill}
    stroke={ink}
    strokeWidth="2.5"
  />
);
const Txt = ({
  x,
  y,
  size = 20,
  fill = ink,
  children,
  ...rest
}: {
  x: number;
  y: number;
  size?: number;
  fill?: string;
  children: React.ReactNode;
} & React.SVGProps<SVGTextElement>) => (
  <text
    x={x}
    y={y}
    fontSize={size}
    fill={fill}
    fontFamily="Hand, cursive"
    {...rest}
  >
    {children}
  </text>
);
const Star = ({
  x,
  y,
  s = 8,
  fill = yellow,
}: {
  x: number;
  y: number;
  s?: number;
  fill?: string;
}) => (
  <path
    d={`M${x} ${y - s} Q${x + 2} ${y - 2} ${x + s} ${y} Q${x + 2} ${y + 2} ${x} ${y + s} Q${x - 2} ${y + 2} ${x - s} ${y} Q${x - 2} ${y - 2} ${x} ${y - s}`}
    fill={fill}
    stroke={ink}
    strokeWidth="1.2"
  />
);
export const Mascot = ({
  x,
  y,
  s = 1,
  t = 0,
  happy = false,
  glasses = false,
  arm,
}: {
  x: number;
  y: number;
  s?: number;
  t?: number;
  happy?: boolean;
  glasses?: boolean;
  arm?: [number, number];
}) => (
  <g
    transform={`translate(${x} ${y + Math.sin(t * 10) * 2}) scale(${s})`}
    stroke={ink}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {arm && (
      <>
        <path
          d={`M75 28 Q${((arm[0] - x) / s) * 0.4} ${((arm[1] - y) / s) * 0.15} ${(arm[0] - x) / s} ${(arm[1] - y) / s}`}
          stroke={ink}
          strokeWidth="13"
          fill="none"
        />
        <path
          d={`M75 28 Q${((arm[0] - x) / s) * 0.4} ${((arm[1] - y) / s) * 0.15} ${(arm[0] - x) / s} ${(arm[1] - y) / s}`}
          stroke={red}
          strokeWidth="8"
          fill="none"
        />
        <circle cx={(arm[0] - x) / s} cy={(arm[1] - y) / s} r="7" fill={red} />
      </>
    )}
    <path d="M13 53 v23 h10 v-23 M57 53 v23 h10 v-23" fill={red} />
    {happy ? (
      <>
        <path
          d="M7 28 Q-10 15 -9 -3 M74 28 Q90 12 91 -5"
          fill="none"
          strokeWidth="8"
          stroke={red}
        />
        <circle cx="-9" cy="-4" r="6" fill={red} />
        <circle cx="91" cy="-5" r="6" fill={red} />
      </>
    ) : (
      <path d="M4 24 H-7 V35 H4 M76 24 H86 V35 H76" fill={red} />
    )}
    <path d="M1 0 L79 -2 Q82 -2 82 3 L81 57 L1 59Z" fill={red} />
    <path d="M7 5 L71 4" stroke="#efa390" strokeWidth="2" />
    {happy ? (
      <path d="M25 27 q5 -10 10 0 M52 27 q5 -10 10 0" fill="none" />
    ) : (
      <>
        <rect x="24" y="17" width="4" height="9" rx="2" fill={ink} />
        <rect x="54" y="17" width="4" height="9" rx="2" fill={ink} />
      </>
    )}
    {happy && (
      <>
        <ellipse cx="17" cy="36" rx="6" ry="3" fill="#e897a0" stroke="none" />
        <ellipse cx="65" cy="36" rx="6" ry="3" fill="#e897a0" stroke="none" />
      </>
    )}
    {glasses && (
      <g transform="translate(16,-9) rotate(-7)">
        <path d="M0 0 H54 L48 12 H32 L27 4 L22 12 H6Z" fill="#222" />
        <path
          d="M12 2 l-5 6 M18 2 l-5 6 M44 2 l-5 6"
          stroke="white"
          strokeWidth="1"
        />
      </g>
    )}
  </g>
);
type Kind = "city" | "ramen" | "dog" | "dance";
export const Art = ({ kind, t = 0 }: { kind: Kind; t?: number }) => {
  if (kind === "city")
    return (
      <g>
        <rect width="180" height="280" fill="url(#night)" />
        {Array.from({ length: 22 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 67 + 13) % 180}
            cy={(i * 31 + 11) % 170}
            r={i % 3 === 0 ? 1.5 : 0.7}
            fill="#faf0b8"
            opacity={0.5 + Math.sin(t * 2 + i) * 0.3}
          />
        ))}
        <path
          d="M143 26 A21 21 0 1 0 158 56 A20 20 0 0 1 143 26"
          fill={yellow}
          stroke={ink}
          strokeWidth="2"
        />
        {Array.from({ length: 12 }, (_, i) => {
          const h = 45 + ((i * 31) % 92);
          return (
            <g key={i}>
              <rect
                x={i * 17 - 8}
                y={280 - h}
                width="24"
                height={h}
                fill={["#33344c", "#424159", "#262d46"][i % 3]}
                stroke={ink}
                strokeWidth="1.5"
              />
              {Array.from({ length: 14 }, (_, j) => (
                <rect
                  key={j}
                  x={i * 17 - 4 + (j % 3) * 6}
                  y={285 - h + Math.floor(j / 3) * 12}
                  width="3"
                  height="5"
                  fill={(i + j) % 4 === 0 ? "#68677b" : "#e7d27a"}
                />
              ))}
            </g>
          );
        })}
      </g>
    );
  if (kind === "ramen")
    return (
      <g>
        <rect width="180" height="280" fill="#f8e8b6" />
        <path d="M0 193 H180 V280 H0Z" fill="#e5ba87" />
        {[206, 232, 258].map((y) => (
          <path key={y} d={`M0 ${y} H180`} stroke="#d3a67a" />
        ))}
        <ellipse
          cx="90"
          cy="190"
          rx="66"
          ry="24"
          fill="#fff8da"
          stroke={ink}
          strokeWidth="3"
        />
        <path
          d="M24 190 Q34 247 90 245 Q145 246 156 190 Q90 222 24 190"
          fill="#efc6bd"
          stroke={ink}
          strokeWidth="3"
        />
        <ellipse
          cx="90"
          cy="185"
          rx="55"
          ry="17"
          fill="#785948"
          stroke={ink}
          strokeWidth="2"
        />
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M${53 + i * 7} 181 q-12 10 3 13 q14 -4 2 -12`}
            stroke="#f2d578"
            fill="none"
            strokeWidth="2"
          />
        ))}
        <ellipse cx="63" cy="181" rx="13" ry="8" fill="#fff6d9" stroke={ink} />
        <ellipse cx="63" cy="181" rx="6" ry="4" fill="#e5b14c" />
        <path
          d="M109 181 L112 164 L129 166 L128 187"
          fill="#5a7c4a"
          stroke={ink}
        />
        <path
          d="M101 176 L167 94 M106 180 L173 97"
          stroke={ink}
          strokeWidth="4"
        />
        <path d="M35 218 H145" stroke="#bc6b65" strokeWidth="3" />
        {[65, 91, 117].map((x, i) => (
          <path
            key={i}
            d={`M${x} ${160 - Math.sin(t * 3 + i) * 4} q-12 -14 0 -26 q10 -12 0 -25`}
            fill="none"
            stroke="white"
            strokeWidth="3"
          />
        ))}
      </g>
    );
  if (kind === "dog")
    return (
      <g>
        <rect width="180" height="280" fill="#bfe1d1" />
        {Array.from({ length: 20 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 43) % 180}
            cy={(i * 57) % 280}
            r="2"
            fill="#e4f0dc"
          />
        ))}
        <g
          transform={`translate(0 ${Math.sin(t * 3) * 2})`}
          stroke={ink}
          strokeWidth="2.5"
        >
          <ellipse cx="90" cy="243" rx="57" ry="72" fill="#d89651" />
          <ellipse cx="90" cy="254" rx="35" ry="59" fill="#fff9e8" />
          <path
            d="M42 132 L43 82 L72 105 M108 104 L137 82 L142 137"
            fill="#da9a59"
          />
          <path
            d="M48 115 L49 91 L65 108 M116 108 L131 94 L135 116"
            fill="#f1c3b4"
          />
          <ellipse cx="91" cy="145" rx="54" ry="49" fill="#dc9b55" />
          <path
            d="M39 150 Q65 125 89 160 Q117 129 144 150 Q139 194 91 195 Q48 191 39 150"
            fill="#fff9eb"
            stroke="none"
          />
          <path d="M60 136 q5 -6 10 0 M111 136 q5 -6 10 0" fill="none" />
          <path d="M85 157 Q92 153 99 157 L93 164Z" fill={ink} />
          <path d="M93 164 v6 l-6 4 M93 170 l7 3" fill="none" />
          <path d="M61 194 Q92 205 120 194" stroke="#b7574b" strokeWidth="5" />
          <circle cx="91" cy="205" r="6" fill={yellow} />
        </g>
        <Txt x={135} y={74} size={26} fill="#e38292">
          ♥
        </Txt>
      </g>
    );
  return (
    <g>
      <rect width="180" height="280" fill="url(#disco)" />
      <path d="M0 188 H180 V280 H0Z" fill="#293759" />
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 9 }, (_, col) => {
          const y1 = 188 + row * row * 1.5,
            y2 = 188 + (row + 1) * (row + 1) * 1.5,
            w1 = 3 + row * 4,
            w2 = 7 + row * 4;
          return (
            <path
              key={`${row}-${col}`}
              d={`M${90 + (col - 4.5) * w1} ${y1} L${90 + (col - 3.5) * w1} ${y1} L${90 + (col - 3.5) * w2} ${y2} L${90 + (col - 4.5) * w2} ${y2}Z`}
              fill={
                ["#5768a0", "#324b7f", "#68a5a7", "#b17cba", "#d3bf70"][
                  (row + col) % 5
                ]
              }
            />
          );
        }),
      )}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M90 28 L${-30 + i * 70 + Math.sin(t * 1.5 + i) * 40} 280 L${20 + i * 90 + Math.sin(t * 1.5 + i) * 40} 280Z`}
          fill={["#e9b4d7", "#bad8eb", "#f8e1b9"][i]}
          opacity=".14"
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={`bokeh-${i}`}
          cx={20 + ((i * 41) % 150) + Math.sin(t + i) * 12}
          cy={60 + ((i * 37) % 180)}
          r={8 + (i % 3) * 3}
          fill={["#d3e9cd", "#f2c9e7", "#d6d5ff"][i % 3]}
          opacity=".2"
          filter="url(#soft)"
        />
      ))}
      <path d="M90 0 V29" stroke={ink} />
      <circle
        cx="90"
        cy="43"
        r="17"
        fill="#d6d6ee"
        stroke={ink}
        strokeWidth="2"
      />
      <path
        d="M75 37 H105 M74 45 H106 M79 53 H101 M85 27 V60 M96 27 V60"
        stroke="#a6a0c8"
        strokeWidth="2"
      />
      <path d="M91 44 h12 v9 H91" fill={yellow} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          x={20 + i * 33}
          y={25 + ((i * 41) % 145)}
          s={3 + (i % 3)}
          fill={i % 2 ? "#fff6e3" : yellow}
        />
      ))}
      <g transform={`rotate(${Math.sin(t * 7) * 7} 90 200)`}>
        <Mascot x={56} y={175 + Math.sin(t * 9) * 6} s={0.8} t={t} happy />
      </g>
    </g>
  );
};
const names = ["夜景.mp4", "拉面.mp4", "柴犬.mov", "小克蹦迪.mp4"];
const kinds: Kind[] = ["city", "ramen", "dog", "dance"];
const Thumb = ({
  kind,
  x,
  y,
  w,
  h,
  t = 0,
}: {
  kind: Kind;
  x: number;
  y: number;
  w: number;
  h: number;
  t?: number;
}) => (
  <svg
    x={x}
    y={y}
    width={Math.max(1, w)}
    height={h}
    viewBox="0 0 180 280"
    preserveAspectRatio="none"
  >
    <Art kind={kind} t={t} />
  </svg>
);
export const Library = ({ t }: { t: number }) => {
  const tab = t < 9 ? 0 : t < 12 ? 1 : 2;
  return (
    <g>
      <Box x={26} y={68} w={252} h={313} />
      {["素材", "转场", "文字"].map((l, i) => (
        <g key={l}>
          <Box
            x={38 + i * 79}
            y={77}
            w={73}
            h={26}
            r={5}
            fill={tab === i ? yellow : paper}
          />
          <Txt x={74 + i * 79} y={96} size={19} textAnchor="middle">
            {l}
          </Txt>
        </g>
      ))}
      {tab === 0 ? (
        <>
          {kinds.map((kind, i) => (
            <g key={kind}>
              <Box
                x={40 + (i % 2) * 118}
                y={114 + Math.floor(i / 2) * 89}
                w={107}
                h={64}
                r={5}
              />
              <Thumb
                kind={kind}
                x={42 + (i % 2) * 118}
                y={116 + Math.floor(i / 2) * 89}
                w={103}
                h={60}
              />
              <Txt
                x={91 + (i % 2) * 118}
                y={191 + Math.floor(i / 2) * 89}
                size={15}
                textAnchor="middle"
              >
                {names[i]}
              </Txt>
            </g>
          ))}
          {[0, 1].map((i) => (
            <g key={i}>
              <rect
                x={41 + i * 118}
                y="293"
                width="104"
                height="61"
                rx="7"
                fill="none"
                stroke="#aaa69b"
                strokeDasharray="4 5"
              />
              <Txt
                x={93 + i * 118}
                y={336}
                size={39}
                fill="#aaa79d"
                textAnchor="middle"
              >
                +
              </Txt>
              <Txt
                x={94 + i * 118}
                y={368}
                size={14}
                fill="#aaa79d"
                textAnchor="middle"
              >
                导入素材
              </Txt>
            </g>
          ))}
        </>
      ) : tab === 1 ? (
        <>
          {["旋转", "翻页", "故障", "缩放", "滑动", "溶解"].map((l, i) => (
            <g key={l}>
              <Box
                x={40 + (i % 2) * 118}
                y={116 + Math.floor(i / 2) * 81}
                w={106}
                h={60}
                r={6}
                fill={
                  [
                    "#dcd7ef",
                    "#cde7dd",
                    "#efd1d6",
                    "#d2e9ec",
                    "#f6e8b7",
                    "#ded7e8",
                  ][i]
                }
              />
              <Txt
                x={92 + (i % 2) * 118}
                y={156 + Math.floor(i / 2) * 81}
                size={35}
                textAnchor="middle"
              >
                {["◎", "▤", "☷", "⌕", "➜", "▧"][i]}
              </Txt>
              <Txt
                x={92 + (i % 2) * 118}
                y={191 + Math.floor(i / 2) * 81}
                size={15}
                textAnchor="middle"
              >
                {l}
              </Txt>
            </g>
          ))}
        </>
      ) : (
        <>
          {["前方高能", "好耶～", "霓虹 NEON"].map((l, i) => (
            <g key={l}>
              <Box
                x={40}
                y={119 + i * 66}
                w={222}
                h={52}
                r={6}
                fill={["#fae8b6", "#f6d8dc", "#373045"][i]}
              />
              <Txt
                x={151}
                y={154 + i * 66}
                size={26}
                textAnchor="middle"
                fill={i === 2 ? "#f0c8ed" : i === 1 ? "#c67e97" : ink}
              >
                {l}
              </Txt>
            </g>
          ))}
        </>
      )}
    </g>
  );
};
export const Controls = ({ t }: { t: number }) => {
  const vals = [
    t < 15 ? 0 : 70,
    t < 16 ? 100 : t < 17.9 ? 100 + 125 * ramp(t, 16, 17) : 110,
    t < 18 ? 0 : 60,
    100,
  ];
  return (
    <g>
      <Box x={999} y={68} w={255} h={313} />
      <Txt x={1016} y={101} size={26}>
        调整 ✦
      </Txt>
      <path d="M1017 115 H1235" stroke="#aaa69d" />
      {["闪光", "饱和度", "缩放冲击", "速度"].map((l, i) => {
        const y = 157 + i * 60,
          v = vals[i] / (i === 1 ? 300 : i === 3 ? 200 : 100);
        return (
          <g key={l}>
            <Txt x={1016} y={y - 19} size={19}>
              {l}
            </Txt>
            <Txt x={1236} y={y - 19} size={18} textAnchor="end">
              {i === 3 ? "1.0x" : `${Math.round(vals[i])}%`}
            </Txt>
            <rect
              x="1020"
              y={y - 3}
              width="214"
              height="7"
              rx="4"
              fill="#deded1"
              stroke={ink}
            />
            <rect
              x="1021"
              y={y - 2}
              width={212 * v}
              height="5"
              rx="3"
              fill={teal}
            />
            <circle
              cx={1020 + 214 * v}
              cy={y}
              r="10"
              fill={between(t, 16, 18) && i === 1 ? yellow : "#fefcf5"}
              stroke={ink}
              strokeWidth="2"
            />
            <circle cx={1020 + 214 * v} cy={y} r="2" fill="#999489" />
          </g>
        );
      })}
    </g>
  );
};
export const Timeline = ({ t }: { t: number }) => {
  const cut = t >= 7.6,
    widths = [
      175 - 9 * ramp(t, 7.6, 8),
      330 - 137 * ramp(t, 7.6, 8),
      166 - 6 * ramp(t, 7.6, 8),
      210 - 6 * ramp(t, 7.6, 8),
    ],
    play = 100 + Math.min(760, Math.max(0, t - 2) * 35);
  let accum = 100;
  return (
    <g>
      <Box x={26} y={395} w={1228} h={309} />
      <path d="M83 435 H1241" stroke={ink} strokeWidth="1.5" />
      {Array.from({ length: 33 }, (_, i) => (
        <g key={i}>
          <path
            d={`M${100 + i * 35.3} 435 v${i % 4 === 0 ? -15 : -6}`}
            stroke="#888479"
          />
          {i % 4 === 0 && (
            <Txt x={100 + i * 35.3} y={421} size={15} textAnchor="middle">
              0:{String(i / 2).padStart(2, "0")}
            </Txt>
          )}
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x="85"
            y={445 + i * 56}
            width="1155"
            height={i === 1 ? 67 : 40}
            fill="#eeeae3"
          />
          <Box
            x={37}
            y={445 + i * 59}
            w={39}
            h={i === 1 ? 65 : 38}
            fill={["#faf0cd", "#c9e5da", "#e3dcf0"][i]}
            r={6}
          />
          <Txt x={56} y={473 + i * 59} size={25} textAnchor="middle">
            {["T", "▶", "♪"][i]}
          </Txt>
        </g>
      ))}
      {t > 12.7 && (
        <g>
          <Box
            x={510}
            y={448}
            w={Math.max(1, 197 * ramp(t, 12.7, 13))}
            h={27}
            fill={yellow}
            r={4}
          />
          <Txt x={527} y={468} size={16}>
            T 前方高能预警
          </Txt>
        </g>
      )}
      {t > 2.3 &&
        kinds.map((kind, i) => {
          const x = accum;
          accum += widths[i] + 3;
          const a = ramp(t, 2.3 + i * 0.42, 2.65 + i * 0.42);
          return (
            <g
              key={kind}
              opacity={a}
              transform={`translate(0 ${(1 - a) * -220})`}
            >
              <Box
                x={x}
                y={485}
                w={widths[i]}
                h={67}
                fill={["#555780", "#efd88f", "#b6dfcf", "#a389ba"][i]}
                r={6}
              />
              {Array.from(
                { length: Math.ceil((widths[i] - 6) / 65) },
                (_, j) => (
                  <Thumb
                    key={j}
                    kind={kind}
                    x={x + 3 + j * 65}
                    y={489}
                    w={Math.min(65, widths[i] - 6 - j * 65)}
                    h={59}
                    t={t}
                  />
                ),
              )}
              <rect
                x={x + 5}
                y="489"
                width={i === 3 ? 94 : 61}
                height="17"
                rx="6"
                fill="#fffdf1"
              />
              <Txt x={x + 9} y={502} size={13}>
                {names[i]}
              </Txt>
              {t > 9.5 && i > 0 && (
                <g>
                  <circle
                    cx={x}
                    cy="520"
                    r="15"
                    fill={paper}
                    stroke={ink}
                    strokeWidth="2"
                  />
                  <Txt x={x} y={526} size={23} textAnchor="middle">
                    {["", "◎", "▤", "☷"][i]}
                  </Txt>
                </g>
              )}
            </g>
          );
        })}
      {between(t, 5.3, 7.65) && (
        <g>
          <rect
            x="423"
            y="486"
            width="119"
            height="65"
            fill="#555"
            opacity=".45"
            stroke={ink}
          />
          {Array.from({ length: 10 }, (_, i) => (
            <path
              key={i}
              d={`M${425 + i * 9} 549 l30 -60`}
              stroke={ink}
              opacity=".5"
            />
          ))}
        </g>
      )}
      {t > 3.3 && (
        <g opacity={ramp(t, 3.3, 3.7)}>
          <Box x={100} y={562} w={1128} h={38} fill="#e3dbef" r={5} />
          <Txt x={108} y={575} size={12}>
            ♪ bgm_小克.wav
          </Txt>
          {Array.from({ length: 280 }, (_, i) => {
            const h = 4 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.13)) * 18;
            return (
              <path
                key={i}
                d={`M${105 + i * 4} ${584 - h / 2} v${h}`}
                stroke="#9181bc"
                strokeWidth="1.6"
              />
            );
          })}
        </g>
      )}
      {t > 21 &&
        Array.from({ length: 31 }, (_, i) => (
          <path
            key={i}
            d={`M${100 + i * 35} 615 l5 10 l5 -10Z`}
            fill={yellow}
            stroke={ink}
            opacity={ramp(t, 21 + i * 0.026, 21.3 + i * 0.026)}
          />
        ))}
      <path d={`M${play} 410 V627`} stroke="#ce6677" strokeWidth="2" />
      <path
        d={`M${play - 7} 403 h14 v10 l-7 8 l-7 -8Z`}
        fill="#d76e7b"
        stroke={ink}
        strokeWidth="1.4"
      />
      <Txt x={51} y={684} size={17} fill="#aaa59b">
        − ──○──── +
      </Txt>
      <Txt x={1234} y={684} size={13} fill="#aaa59b" textAnchor="end">
        片段 {t > 2.3 ? 4 : 0} · 总时长 {cut ? "0:10.5" : "0:13.2"}
      </Txt>
      {t > 21 && (
        <g>
          <Box x={1141} y={608} w={92} h={32} r={5} fill={yellow} />
          <Txt x={1187} y={631} size={22} textAnchor="middle">
            ▽ 卡点
          </Txt>
        </g>
      )}
    </g>
  );
};
export const Phone = ({
  t,
  ending = false,
}: {
  t: number;
  ending?: boolean;
}) => {
  const kind: Kind =
      t < 5 ? "city" : t < 11 ? "ramen" : t < 15 ? "dog" : "dance",
    x = ending ? 454 : 544,
    y = ending ? 134 : 70,
    w = ending ? 294 : 192,
    h = ending ? 455 : 294;
  return (
    <g>
      <Box
        x={x - 4}
        y={y - 3}
        w={w + 8}
        h={h + 8}
        r={ending ? 40 : 27}
        fill="#242020"
      />
      <rect
        x={x + 3}
        y={y + 4}
        width={w - 6}
        height={h - 6}
        rx="23"
        fill="#181616"
      />
      {t > 2.35 && (
        <svg
          x={x + 7}
          y={y + 8}
          width={w - 14}
          height={h - 15}
          viewBox="0 0 180 280"
          style={{ borderRadius: ending ? 28 : 19, overflow: "hidden" }}
        >
          <defs>
            <clipPath id={ending ? "phone-end-clip" : "phone-clip"}>
              <rect width="180" height="280" rx="16" />
            </clipPath>
          </defs>
          <g clipPath={ending ? "url(#phone-end-clip)" : "url(#phone-clip)"}>
            <g
              filter={between(t, 5.3, 7.65) ? "url(#blur)" : undefined}
              style={{
                filter: between(t, 16.6, 17.9) ? "saturate(2.8)" : undefined,
              }}
            >
              <Art kind={ending ? "dance" : kind} t={t} />
            </g>
            {between(t, 10.9, 11.5) && (
              <path
                d={`M${180 * ramp(t, 10.9, 11.5)} 0 H180 V280Z`}
                fill="#fff9e8"
                stroke={ink}
              />
            )}
            {between(t, 5.3, 7.65) && (
              <>
                <path
                  d="M31 95 v-13 h15 M134 82 h15 v13 M31 166 v13 h15 M134 179 h15 v-13"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                />
                <circle
                  cx="90"
                  cy="119"
                  r="15"
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  strokeDasharray="64 30"
                  transform={`rotate(${t * 200} 90 119)`}
                />
                <Txt
                  x={90}
                  y={156}
                  size={23}
                  textAnchor="middle"
                  fill="white"
                  stroke={ink}
                  strokeWidth="3"
                  paintOrder="stroke"
                >
                  对焦中…
                </Txt>
              </>
            )}
            {t > 13 && t < 15 && (
              <Txt
                x={90}
                y={178}
                size={16}
                fontFamily="HandTitle"
                textAnchor="middle"
                fill={yellow}
                stroke={ink}
                strokeWidth="3"
                paintOrder="stroke"
              >
                前方高能预警
              </Txt>
            )}
            {ending && (
              <>
                <Txt
                  x={83}
                  y={108}
                  size={34}
                  fontFamily="HandTitle"
                  textAnchor="middle"
                  fill={yellow}
                  stroke={ink}
                  strokeWidth="5"
                  paintOrder="stroke"
                  transform="rotate(-5 83 108)"
                >
                  拿捏了!
                </Txt>
                <Txt x={147} y={84} size={23} fill="#e391a5">
                  ♥
                </Txt>
                <Txt x={148} y={100} size={10} fill="white">
                  10.2w
                </Txt>
                <Txt x={151} y={130} size={20} fill="white">
                  ☏
                </Txt>
                <Txt x={150} y={147} size={10} fill="white">
                  2333
                </Txt>
                <Txt x={151} y={172} size={22} fill="white">
                  ➜
                </Txt>
                <Txt x={8} y={249} size={12} fill="white">
                  @小克 · Opus 5.5
                </Txt>
                <Txt x={8} y={265} size={10} fill="white">
                  #AI剪辑 #卡点 #code2video
                </Txt>
              </>
            )}
          </g>
        </svg>
      )}
      <rect
        x={x + w / 2 - 15}
        y={y + 12}
        width="30"
        height="9"
        rx="5"
        fill="#211e1e"
      />
      {!ending && (
        <Txt x={640} y={388} size={21} textAnchor="middle" fill="#77746b">
          ⏮ ⊙ ⏭
        </Txt>
      )}
    </g>
  );
};
const Shout = ({
  x,
  y,
  text,
  fill = yellow,
  size = 34,
}: {
  x: number;
  y: number;
  text: string;
  fill?: string;
  size?: number;
}) => (
  <Txt
    x={x}
    y={y}
    size={size}
    fill={fill}
    stroke={ink}
    strokeWidth={6}
    paintOrder="stroke"
    textAnchor="middle"
  >
    {text}
  </Txt>
);
export const EditingMotion: React.FC = () => {
  const frame = useCurrentFrame(),
    t = frame / 30;
  const times = [
    0, 4.7, 5.5, 11.6, 12.5, 14.7, 15.5, 19, 20, 23, 24, 25.4, 26.5, 30,
  ];
  const zoom = interpolate(
      t,
      times,
      [1, 1, 1.28, 1.28, 1.4, 1.4, 1.4, 1.4, 1.05, 1.05, 1.3, 1.3, 1, 1],
      clamp,
    ),
    cx = interpolate(
      t,
      times,
      [0, 0, -16, -16, -195, -195, -510, -510, -64, -64, -380, -380, 0, 0],
      clamp,
    ),
    cy = interpolate(
      t,
      times,
      [0, 0, -170, -100, -98, -98, -14, -14, -20, -20, -5, -5, 0, 0],
      clamp,
    );
  const ax = interpolate(
      t,
      [0, 12.8, 13.3, 14.6, 15.2, 19.8, 20.4, 22.5, 23.4, 26, 26.7],
      [160, 160, 320, 320, 490, 490, 560, 560, 900, 900, 1010],
      clamp,
    ),
    ay = t < 23 ? 421 : t < 26 ? 415 : 530;
  let arm: [number, number] | undefined;
  if (between(t, 2.3, 4.2))
    arm = [
      92 + (Math.floor((t - 2.3) / 0.5) % 2) * 118,
      145 + Math.floor((t - 2.3) / 1) * 89,
    ];
  if (between(t, 6.4, 7.5)) arm = [510 + 90 * ramp(t, 6.4, 7.5), 574];
  if (between(t, 9, 10)) arm = [91, 151];
  if (between(t, 11.7, 12.5)) arm = [232, 87];
  if (between(t, 16, 18))
    arm = [1020 + (214 * (100 + 125 * ramp(t, 16, 17))) / 300, 217];
  if (between(t, 18, 19.5)) arm = [1148, 277];
  if (between(t, 23, 25)) arm = [1160, 36];
  const end = ramp(t, 26.6, 27.3);
  return (
    <AbsoluteFill style={{ background: paper }}>
      <Audio src={staticFile("reference-audio.m4a")} />
      <svg viewBox="0 0 1280 720" width="1280" height="720">
        <defs>
          <linearGradient id="night" x2="0" y2="1">
            <stop stopColor="#33355c" />
            <stop offset="1" stopColor="#747198" />
          </linearGradient>
          <linearGradient id="disco" x2="0" y2="1">
            <stop stopColor="#7065a8" />
            <stop offset=".7" stopColor="#b47caf" />
            <stop offset="1" stopColor="#747bc1" />
          </linearGradient>
          <filter id="soft">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="blur">
            <feGaussianBlur stdDeviation="4" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".65"
              numOctaves="3"
              seed="8"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        {t < 1.2 ? (
          <g>
            <Box x={310} y={245} w={660} h={210} r={8} fill="#fffdf7" />
            <path d="M310 273 H970" stroke={ink} />
            {["#d8797a", "#e3c966", "#7ea883"].map((c, i) => (
              <circle
                key={i}
                cx={323 + i * 13}
                cy="259"
                r="4"
                fill={c}
                stroke={ink}
              />
            ))}
            <Txt x={640} y={265} size={13} textAnchor="middle">
              小克 · 视频编辑
            </Txt>
            <Txt x={333} y={324} size={23}>
              {"帮我把这几个素材剪成一个有趣的视频。".slice(
                0,
                Math.floor(t * 25),
              )}
            </Txt>
            <rect
              x={334 + Math.min(20, Math.floor(t * 25)) * 23}
              y="304"
              width="4"
              height="25"
              fill={red}
              opacity={frame % 14 < 9 ? 1 : 0}
            />
          </g>
        ) : (
          <>
            <g
              transform={`translate(${cx} ${cy}) scale(${zoom})`}
              opacity={1 - end * 0.7}
            >
              <Box x={12} y={6} w={1255} h={708} r={14} />
              <Box x={26} y={16} w={1228} h={43} r={11} fill="#fffdf7" />
              {["#cc7778", "#e4ca70", "#8cad88"].map((c, i) => (
                <circle
                  key={i}
                  cx={43 + i * 16}
                  cy="36"
                  r="5"
                  fill={c}
                  stroke={ink}
                />
              ))}
              <Mascot x={95} y={29} s={0.24} />
              <Txt x={128} y={41} size={22}>
                小克剪辑_最终版_打死不改(3).mp4
              </Txt>
              <Box x={565} y={21} w={148} h={31} r={7} fill="#292522" />
              <Txt x={639} y={44} size={21} fill="white" textAnchor="middle">
                00:00:{String(Math.floor(t)).padStart(2, "0")}:
                {String(frame % 30).padStart(2, "0")}
              </Txt>
              <Txt x={735} y={41} size={15} fill="#8f8a7e">
                · 已自动保存
              </Txt>
              <Box x={993} y={23} w={62} h={27} r={7} />
              <Txt x={1024} y={43} size={18} textAnchor="middle">
                1080p
              </Txt>
              <Box
                x={1064}
                y={22}
                w={174}
                h={30}
                r={8}
                fill={t > 25 ? yellow : teal}
              />
              <Txt
                x={1151}
                y={44}
                size={22}
                textAnchor="middle"
                fill={t > 25 ? ink : "white"}
              >
                {t > 26 ? "完成 ✓" : t > 24 ? "渲染中 99%" : "↥ 导出"}
              </Txt>
              <Library t={t} />
              <Controls t={t} />
              {end === 0 && <Phone t={t} />}
              <Timeline t={t} />
              {end === 0 && (
                <Mascot
                  x={ax}
                  y={ay}
                  s={t > 26 ? 1.3 : 1}
                  t={t}
                  happy={t > 25}
                  glasses={t > 26}
                  arm={arm}
                />
              )}
              {between(t, 6.4, 7.5) && (
                <>
                  <Shout x={470} y={411} text="唰!" fill="#e5a9bc" />
                  <path
                    d="M580 553 l-9 29 l35 -8Z"
                    fill="#f5f1d7"
                    stroke={ink}
                    strokeWidth="2"
                  />
                </>
              )}
              {between(t, 7.6, 8.7) && (
                <g transform={`translate(570 ${545 + ramp(t, 7.6, 8.4) * 35})`}>
                  <Box x={0} y={0} w={30} h={39} fill="#aebbb0" r={2} />
                  <ellipse
                    cx="15"
                    cy="0"
                    rx="19"
                    ry="4"
                    fill="#d5dcd0"
                    stroke={ink}
                  />
                  <path d="M7 5 v28 M15 5 v28 M23 5 v28" stroke="#788477" />
                  <Shout x={64} y={24} text="咔当!" size={23} />
                </g>
              )}
              {between(t, 13.65, 14.55) && (
                <g>
                  <Box x={280} y={490} w={164} h={89} fill="#fffdf5" />
                  <Txt
                    x={362}
                    y={550}
                    size={43}
                    textAnchor="middle"
                    fontFamily="HandTitle"
                  >
                    Ctrl+Z
                  </Txt>
                  <Shout x={362} y={380} text="撤销!" fill={teal} size={25} />
                </g>
              )}
              {between(t, 16.6, 17.9) && (
                <Shout
                  x={720}
                  y={103}
                  text="饱和度：拉满"
                  fill="#e775b4"
                  size={29}
                />
              )}
              {between(t, 21, 22.7) && (
                <Shout x={655} y={406} text="卡点!" fill={teal} size={27} />
              )}
              {between(t, 25.2, 26) && (
                <g>
                  <ellipse
                    cx="1030"
                    cy="495"
                    rx="24"
                    ry="19"
                    fill="white"
                    stroke={ink}
                  />
                  <Txt x={1030} y={502} size={22} textAnchor="middle">
                    …
                  </Txt>
                </g>
              )}
            </g>
            {end > 0 && (
              <g opacity={end}>
                <Phone t={t} ending />
                <g
                  transform={`translate(${-100 * (1 - end)} 0) rotate(-2 226 333)`}
                >
                  <Box x={44} y={167} w={359} h={322} fill="#fffdfa" r={9} />
                  {[225, 274, 325, 375, 426].map((y) => (
                    <path key={y} d={`M58 ${y} H390`} stroke="#e7e1d7" />
                  ))}
                  <rect
                    x="177"
                    y="159"
                    width="94"
                    height="20"
                    fill={yellow}
                    opacity=".8"
                  />
                  <Txt x={73} y={248} size={35}>
                    30 秒剪完，
                  </Txt>
                  <Txt x={72} y={360} size={72} fontFamily="HandTitle">
                    {"Opus 5.5".slice(
                      0,
                      Math.max(0, Math.floor((t - 27.2) * 8)),
                    )}
                  </Txt>
                  <path
                    d={`M69 387 Q223 365 ${69 + 309 * ramp(t, 28.5, 29.2)} 383`}
                    fill="none"
                    stroke={red}
                    strokeWidth="5"
                  />
                  <Txt x={289} y={456} size={18} fill="#aaa398">
                    —— 小克出手
                  </Txt>
                </g>
                <Mascot x={968} y={482} s={1.45} t={t} happy glasses />
                {Array.from({ length: 26 }, (_, i) => (
                  <rect
                    key={i}
                    x={(i * 157 + 84) % 1260}
                    y={((t - 26.6) * 60 + i * 39) % 720}
                    width="5"
                    height="9"
                    fill={[yellow, teal, red, "#b1a0c8"][i % 4]}
                    stroke={ink}
                    strokeWidth=".7"
                    transform={`rotate(${i * 31} ${(i * 157 + 84) % 1260} ${((t - 26.6) * 60 + i * 39) % 720})`}
                  />
                ))}
              </g>
            )}
          </>
        )}
        <rect
          width="1280"
          height="720"
          filter="url(#grain)"
          opacity=".038"
          style={{ mixBlendMode: "multiply" }}
          pointerEvents="none"
        />
      </svg>
    </AbsoluteFill>
  );
};
