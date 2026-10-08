import type { ServiceKind } from "@/data/services";

// Original vector illustrations; no external photos, stock licences or hotlinks.
export default function ServiceHeroVisual({ service }: { service: ServiceKind }) {
  if (service === "hotels") return (
    <svg viewBox="0 0 520 360" role="img" aria-label="Illustration of a calm hotel lounge with arched windows" className="h-auto w-full">
      <rect width="520" height="360" rx="28" fill="#f4ecdf" />
      <path d="M0 282H520V360H0Z" fill="#e7dac8" />
      <path d="M46 252V130A64 64 0 0 1 174 130V252Z" fill="#001c42" />
      <path d="M200 252V96A78 78 0 0 1 356 96V252Z" fill="#001c42" />
      <path d="M65 231V130A45 45 0 0 1 155 130V231Z" fill="#dce9ee" />
      <path d="M220 230V96A58 58 0 0 1 336 96V230Z" fill="#b9d5e5" />
      <path d="M67 196Q112 161 154 183V231H67Z" fill="#b2c8bf" /><path d="M221 180Q279 138 335 177V230H221Z" fill="#87b3c9" />
      <path d="M110 85V236M278 40V236" stroke="#001c42" strokeWidth="8" />
      <rect x="60" y="254" width="235" height="53" rx="17" fill="#c09263" /><rect x="74" y="218" width="208" height="58" rx="20" fill="#d1ad87" />
      <path d="M88 307V321M267 307V321" stroke="#001c42" strokeWidth="7" />
      <rect x="313" y="272" width="100" height="12" rx="6" fill="#001c42" /><path d="M328 283V325M399 283V325" stroke="#001c42" strokeWidth="6" />
      <path d="M369 268V183" stroke="#001c42" strokeWidth="5" /><path d="M347 185L357 151H381L392 185Z" fill="#e2bc80" />
      <rect x="426" y="253" width="36" height="56" rx="6" fill="#ba9876" /><path d="M444 255V157M444 203Q392 182 408 153Q449 155 444 203M444 220Q487 203 480 175Q444 177 444 220" fill="#607f69" stroke="#607f69" strokeWidth="4" />
    </svg>
  );
  if (service === "cruise") return (
    <svg viewBox="0 0 520 360" role="img" aria-label="Illustration of a voyage across a blue ocean at sunset" className="h-auto w-full">
      <rect width="520" height="360" rx="28" fill="#d7eaf3" /><circle cx="389" cy="84" r="36" fill="#efd4a7" />
      <path d="M0 164Q75 132 150 169T300 162T520 159V360H0Z" fill="#83bad2" />
      <path d="M0 222Q80 193 163 222T331 221T520 219V360H0Z" fill="#1077e3" />
      <path d="M0 278Q69 246 159 280T332 279T520 266V360H0Z" fill="#001c42" opacity=".86" />
      <path d="M91 189H378L343 243H139Z" fill="#fff" /><path d="M148 137H310L342 188H130Z" fill="#f4f7fa" />
      <path d="M177 111H271V138H163Z" fill="#fff" /><path d="M251 84H275V113H251Z" fill="#001c42" />
      <path d="M168 155H300M157 173H312" stroke="#83bad2" strokeWidth="7" strokeDasharray="12 8" />
      <path d="M127 206H356" stroke="#1077e3" strokeWidth="7" />
      <path d="M85 261Q140 245 195 263M300 274Q345 259 390 274M35 315Q78 299 124 315M415 232Q445 222 480 232" fill="none" stroke="#fff" opacity=".45" strokeWidth="3" strokeLinecap="round" />
      <path d="M90 90Q105 76 120 90M132 70Q147 56 162 70" fill="none" stroke="#001c42" opacity=".55" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg viewBox="0 0 520 360" role="img" aria-label="Illustration of a car on a winding scenic road" className="h-auto w-full">
      <rect width="520" height="360" rx="28" fill="#e7f1fc" /><circle cx="425" cy="75" r="32" fill="#ebd1a5" />
      <path d="M0 202L86 106L187 199L291 78L432 201L520 156V360H0Z" fill="#abc6bd" />
      <path d="M0 255Q150 135 310 231T520 229V360H0Z" fill="#6e9e86" />
      <path d="M292 166C144 238 427 254 192 360" fill="none" stroke="#f5f7fa" strokeWidth="92" />
      <path d="M292 166C144 238 427 254 192 360" fill="none" stroke="#001c42" strokeWidth="72" />
      <path d="M292 166C144 238 427 254 192 360" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="13 12" />
      <path d="M65 255L83 216H156L177 255Z" fill="#1077e3" /><path d="M88 225H119V248H77ZM126 225H150L161 248H126Z" fill="#cde3f5" />
      <rect x="55" y="249" width="133" height="44" rx="13" fill="#1077e3" /><circle cx="82" cy="291" r="17" fill="#001c42" /><circle cx="158" cy="291" r="17" fill="#001c42" /><circle cx="82" cy="291" r="8" fill="#d7eaf3" /><circle cx="158" cy="291" r="8" fill="#d7eaf3" />
      <rect x="58" y="259" width="15" height="8" rx="3" fill="#fff" /><rect x="172" y="259" width="12" height="8" rx="3" fill="#efd4a7" />
    </svg>
  );
}
