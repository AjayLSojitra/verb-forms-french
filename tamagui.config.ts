import { Platform } from "react-native";
import { config } from "@tamagui/config";
import { tokens } from "@tamagui/themes";
import { createFont, createTamagui } from "tamagui";

const defaultFont = createFont({
  ...config.fonts.body,
  family: "Poppins",
  size: {
    ...config.fonts.body.size,
    default: 14,
    hxs: 14,
    hsm: 16,
    hmd: 20,
    hml: 28,
    hlg: 30,
    hxl: 36,
    "2xs": 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
    "7xl": 72,
    "8xl": 96,
    "9xl": 128,
  },
  weight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold700: "700",
    bold900: "900"
  },
  face: {
    ...config.fonts.body.face,
    300: {
      normal: "Poppins_300Light",
    },
    400: {
      normal: "Poppins_400Regular",
    },
    500: {
      normal: "Poppins_500Medium",
      italic: "Poppins_500Medium_Italic",
    },
    600: {
      normal: "Poppins_600SemiBold",
    },
    700: {
      normal: "Poppins_700Bold",
    },
    900: {
      normal: "Poppins_900Black",
    },
  },
});

const defaultTokens = {
  ...config.tokens,
  size: {
    ...config.tokens.size,
    "-10": -40,
    "-9": -36,
    "-8": -32,
    "-7": -28,
    "-6": -24,
    "-5": -20,
    "-4": -16,
    "-3": -12,
    "-2": -8,
    "-1": -4,
    "-0.5": -2,
    "0": 0,
    "0.5": 2,
    "1": 4,
    "2": 8,
    "3": 12,
    "4": 16,
    "5": 20,
    "6": 24,
    "7": 28,
    "8": 32,
    "9": 36,
    "10": 40,
    "12": 48,
  },
  space: {
    ...config.tokens.space,
    default: 4,
    "-10": -40,
    "-9": -36,
    "-8": -32,
    "-7": -28,
    "-6": -24,
    "-5": -20,
    "-4": -16,
    "-3": -12,
    "-2": -8,
    "-1": -4,
    "-0.5": -2,
    "0": 0,
    "0.5": 2,
    "1": 4,
    "2": 8,
    "3": 12,
    "4": 16,
    "5": 20,
    "6": 24,
    "7": 28,
    "8": 32,
    "9": 36,
    "10": 40,
    "12": 48,
  },
  color: {
    ...config.tokens.color,
    "amber.50": "#fffbeb",
    "amber.100": "#fef3c7",
    "amber.200": "#fde68a",
    "amber.300": "#fcd34d",
    "amber.400": "#fbbf24",
    "amber.500": "#f59e0b",
    "amber.600": "#d97706",
    "amber.700": "#b45309",
    "amber.800": "#92400e",
    "amber.900": "#78350f",
    black: "#000000",
    "blue.50": "#eff6ff",
    "blue.100": "#dbeafe",
    "blue.200": "#bfdbfe",
    "blue.300": "#93c5fd",
    "blue.400": "#60a5fa",
    "blue.500": "#3b82f6",
    "blue.600": "#2563eb",
    "blue.700": "#1d4ed8",
    "blue.800": "#1e40af",
    "blue.900": "#1e3a8a",
    "blueGray.50": "#F6FAFD",
    "blueGray.100": "#E9F3F8",
    "blueGray.200": "#DAEAF1",
    "blueGray.300": "#CDDEE7",
    "blueGray.400": "#A5BCCE",
    "blueGray.500": "#7C9AB5",
    "blueGray.600": "#62758B",
    "blueGray.700": "#495A6E",
    "blueGray.800": "#344255",
    "blueGray.900": "#1E293B",
    contrastThreshold: 7,
    "coolGray.50": "#f9fafb",
    "coolGray.100": "#f3f4f6",
    "coolGray.200": "#e5e7eb",
    "coolGray.300": "#d1d5db",
    "coolGray.400": "#9ca3af",
    "coolGray.500": "#6b7280",
    "coolGray.600": "#4b5563",
    "coolGray.700": "#374151",
    "coolGray.800": "#1f2937",
    "coolGray.900": "#111827",
    "cyan.50": "#ecfeff",
    "cyan.100": "#cffafe",
    "cyan.200": "#a5f3fc",
    "cyan.300": "#67e8f9",
    "cyan.400": "#22d3ee",
    "cyan.500": "#06b6d4",
    "cyan.600": "#0891b2",
    "cyan.700": "#0e7490",
    "cyan.800": "#155e75",
    "cyan.900": "#164e63",
    "danger.50": "#fff1f2",
    "danger.100": "#ffe4e6",
    "danger.200": "#fecdd3",
    "danger.300": "#fda4af",
    "danger.400": "#fb7185",
    "danger.500": "#f43f5e",
    "danger.600": "#e11d48",
    "danger.700": "#be123c",
    "danger.800": "#9f1239",
    "danger.900": "#881337",
    "dark.50": "#18181b",
    "dark.100": "#27272a",
    "dark.200": "#3f3f46",
    "dark.300": "#52525b",
    "dark.400": "#71717a",
    "dark.500": "#a1a1aa",
    "dark.600": "#d4d4d8",
    "dark.700": "#e4e4e7",
    "dark.800": "#f4f4f5",
    "dark.900": "#fafafa",
    "darkBlue.50": "#dbf4ff",
    "darkBlue.100": "#addbff",
    "darkBlue.200": "#7cc2ff",
    "darkBlue.300": "#4aa9ff",
    "darkBlue.400": "#1a91ff",
    "darkBlue.500": "#0077e6",
    "darkBlue.600": "#005db4",
    "darkBlue.700": "#004282",
    "darkBlue.800": "#002851",
    "darkBlue.900": "#000e21",
    darkText: "#AA151B",
    "emerald.50": "#ecfdf5",
    "emerald.100": "#d1fae5",
    "emerald.200": "#a7f3d0",
    "emerald.300": "#6ee7b7",
    "emerald.400": "#34d399",
    "emerald.500": "#10b981",
    "emerald.600": "#059669",
    "emerald.700": "#047857",
    "emerald.800": "#065f46",
    "emerald.900": "#064e3b",
    "error.50": "#ffe5e5",
    "error.100": "#fabbbb",
    "error.200": "#f09090",
    "error.300": "#e86464",
    "error.400": "#e03838",
    "error.500": "#c71f1f",
    "error.600": "#9b1617",
    "error.700": "#6f0e10",
    "error.800": "#450607",
    "error.900": "#1e0000",
    "fuchsia.50": "#fdf4ff",
    "fuchsia.100": "#fae8ff",
    "fuchsia.200": "#f5d0fe",
    "fuchsia.300": "#f0abfc",
    "fuchsia.400": "#e879f9",
    "fuchsia.500": "#d946ef",
    "fuchsia.600": "#c026d3",
    "fuchsia.700": "#a21caf",
    "fuchsia.800": "#86198f",
    "fuchsia.900": "#701a75",
    "google.50": "#e2efff",
    "google.100": "#b4d0ff",
    "google.200": "#86b1f9",
    "google.300": "#5692f5",
    "google.400": "#2973f1",
    "google.500": "#135ad8",
    "google.600": "#0a46a9",
    "google.700": "#033279",
    "google.800": "#001e4b",
    "google.900": "#000a1e",
    "gray.50": "#fafafa",
    "gray.100": "#f4f4f5",
    "gray.200": "#e4e4e7",
    "gray.300": "#d4d4d8",
    "gray.400": "#a1a1aa",
    "gray.500": "#71717a",
    "gray.600": "#52525b",
    "gray.700": "#3f3f46",
    "gray.800": "#27272a",
    "gray.900": "#18181b",
    "green.50": "#f0fdf4",
    "green.100": "#dcfce7",
    "green.200": "#bbf7d0",
    "green.300": "#86efac",
    "green.400": "#4ade80",
    "green.500": "#22c55e",
    "green.600": "#16a34a",
    "green.700": "#15803d",
    "green.800": "#166534",
    "green.900": "#14532d",
    "indigo.50": "#eef2ff",
    "indigo.100": "#e0e7ff",
    "indigo.200": "#c7d2fe",
    "indigo.300": "#a5b4fc",
    "indigo.400": "#818cf8",
    "indigo.500": "#6366f1",
    "indigo.600": "#4f46e5",
    "indigo.700": "#4338ca",
    "indigo.800": "#3730a3",
    "indigo.900": "#312e81",
    "info.50": "#f0f9ff",
    "info.100": "#e0f2fe",
    "info.200": "#bae6fd",
    "info.300": "#7dd3fc",
    "info.400": "#38bdf8",
    "info.500": "#0ea5e9",
    "info.600": "#0284c7",
    "info.700": "#0369a1",
    "info.800": "#075985",
    "info.900": "#0c4a6e",
    "light.50": "#fafaf9",
    "light.100": "#f5f5f4",
    "light.200": "#e7e5e4",
    "light.300": "#d6d3d1",
    "light.400": "#a8a29e",
    "light.500": "#78716c",
    "light.600": "#57534e",
    "light.700": "#44403c",
    "light.800": "#292524",
    "light.900": "#1c1917",
    "lightBlue.50": "#f0f9ff",
    "lightBlue.100": "#e0f2fe",
    "lightBlue.200": "#bae6fd",
    "lightBlue.300": "#7dd3fc",
    "lightBlue.400": "#38bdf8",
    "lightBlue.500": "#0ea5e9",
    "lightBlue.600": "#0284c7",
    "lightBlue.700": "#0369a1",
    "lightBlue.800": "#075985",
    "lightBlue.900": "#0c4a6e",
    lightText: "#FFFFFF",
    "lime.50": "#f7fee7",
    "lime.100": "#ecfccb",
    "lime.200": "#d9f99d",
    "lime.300": "#bef264",
    "lime.400": "#a3e635",
    "lime.500": "#84cc16",
    "lime.600": "#65a30d",
    "lime.700": "#4d7c0f",
    "lime.800": "#3f6212",
    "lime.900": "#365314",
    "muted.50": "#fafafa",
    "muted.100": "#f5f5f5",
    "muted.200": "#e5e5e5",
    "muted.300": "#d4d4d4",
    "muted.400": "#a3a3a3",
    "muted.500": "#737373",
    "muted.600": "#525252",
    "muted.700": "#404040",
    "muted.800": "#262626",
    "muted.900": "#171717",
    "orange.50": "#fff7ed",
    "orange.100": "#ffedd5",
    "orange.200": "#fed7aa",
    "orange.300": "#fdba74",
    "orange.400": "#fb923c",
    "orange.500": "#f97316",
    "orange.600": "#ea580c",
    "orange.700": "#c2410c",
    "orange.800": "#9a3412",
    "orange.900": "#7c2d12",
    "pink.50": "#fdf2f8",
    "pink.100": "#fce7f3",
    "pink.200": "#fbcfe8",
    "pink.300": "#f9a8d4",
    "pink.400": "#f472b6",
    "pink.500": "#ec4899",
    "pink.600": "#db2777",
    "pink.700": "#be185d",
    "pink.800": "#9d174d",
    "pink.900": "#831843",
    "primary.50": "#d9fcff",
    "primary.100": "#afeffe",
    "primary.200": "#81e4fa",
    "primary.300": "#52d8f6",
    "primary.400": "#26cdf2",
    "primary.500": "#0db4d9",
    "primary.600": "#008caa",
    "primary.700": "#00647a",
    "primary.800": "#003d4b",
    "primary.900": "#00161d",
    "purple.50": "#faf5ff",
    "purple.100": "#f3e8ff",
    "purple.200": "#e9d5ff",
    "purple.300": "#d8b4fe",
    "purple.400": "#c084fc",
    "purple.500": "#a855f7",
    "purple.600": "#9333ea",
    "purple.700": "#7e22ce",
    "purple.800": "#6b21a8",
    "purple.900": "#581c87",
    "red.50": "#fef2f2",
    "red.100": "#fee2e2",
    "red.200": "#fecaca",
    "red.300": "#fca5a5",
    "red.400": "#f87171",
    "red.500": "#ef4444",
    "red.600": "#dc2626",
    "red.700": "#b91c1c",
    "red.800": "#991b1b",
    "red.900": "#7f1d1d",
    "rose.50": "#fff1f2",
    "rose.100": "#ffe4e6",
    "rose.200": "#fecdd3",
    "rose.300": "#fda4af",
    "rose.400": "#fb7185",
    "rose.500": "#f43f5e",
    "rose.600": "#e11d48",
    "rose.700": "#be123c",
    "rose.800": "#9f1239",
    "rose.900": "#881337",
    "secondary.50": "#fdf2f8",
    "secondary.100": "#fce7f3",
    "secondary.200": "#fbcfe8",
    "secondary.300": "#f9a8d4",
    "secondary.400": "#f472b6",
    "secondary.500": "#ec4899",
    "secondary.600": "#db2777",
    "secondary.700": "#be185d",
    "secondary.800": "#9d174d",
    "secondary.900": "#831843",
    "success.50": "#f0fdf4",
    "success.100": "#dcfce7",
    "success.200": "#bbf7d0",
    "success.300": "#86efac",
    "success.400": "#4ade80",
    "success.500": "#22c55e",
    "success.600": "#16a34a",
    "success.700": "#15803d",
    "success.800": "#166534",
    "success.900": "#14532d",
    "teal.50": "#f0fdfa",
    "teal.100": "#ccfbf1",
    "teal.200": "#99f6e4",
    "teal.300": "#5eead4",
    "teal.400": "#2dd4bf",
    "teal.500": "#14b8a6",
    "teal.600": "#0d9488",
    "teal.700": "#0f766e",
    "teal.800": "#115e59",
    "teal.900": "#134e4a",
    "tertiary.50": "#ecfdf5",
    "tertiary.100": "#d1fae5",
    "tertiary.200": "#a7f3d0",
    "tertiary.300": "#6ee7b7",
    "tertiary.400": "#34d399",
    "tertiary.500": "#10b981",
    "tertiary.600": "#059669",
    "tertiary.700": "#047857",
    "tertiary.800": "#065f46",
    "tertiary.900": "#064e3b",
    "text.50": "#fafafa",
    "text.100": "#f5f5f5",
    "text.200": "#e5e5e5",
    "text.300": "#d4d4d4",
    "text.400": "#a3a3a3",
    "text.500": "#737373",
    "text.600": "#525252",
    "text.700": "#404040",
    "text.800": "#262626",
    "text.900": "#171717",
    "trueGray.50": "#fafafa",
    "trueGray.100": "#f5f5f5",
    "trueGray.200": "#e5e5e5",
    "trueGray.300": "#d4d4d4",
    "trueGray.400": "#a3a3a3",
    "trueGray.500": "#737373",
    "trueGray.600": "#525252",
    "trueGray.700": "#404040",
    "trueGray.800": "#262626",
    "trueGray.900": "#171717",
    "violet.50": "#f5f3ff",
    "violet.100": "#ede9fe",
    "violet.200": "#ddd6fe",
    "violet.300": "#c4b5fd",
    "violet.400": "#a78bfa",
    "violet.500": "#8b5cf6",
    "violet.600": "#7c3aed",
    "violet.700": "#6d28d9",
    "violet.800": "#5b21b6",
    "violet.900": "#4c1d95",
    "warmGray.50": "#fafaf9",
    "warmGray.100": "#f5f5f4",
    "warmGray.200": "#e7e5e4",
    "warmGray.300": "#d6d3d1",
    "warmGray.400": "#a8a29e",
    "warmGray.500": "#78716c",
    "warmGray.600": "#57534e",
    "warmGray.700": "#44403c",
    "warmGray.800": "#292524",
    "warmGray.900": "#1c1917",
    "warning.50": "#fff7ed",
    "warning.100": "#ffedd5",
    "warning.200": "#fed7aa",
    "warning.300": "#fdba74",
    "warning.400": "#fb923c",
    "warning.500": "#f97316",
    "warning.600": "#ea580c",
    "warning.700": "#c2410c",
    "warning.800": "#9a3412",
    "warning.900": "#7c2d12",
    white: "#FFFFFF",
    "yellow.50": "#fefce8",
    "yellow.100": "#fef9c3",
    "yellow.200": "#fef08a",
    "yellow.300": "#fde047",
    "yellow.400": "#facc15",
    "yellow.500": "#eab308",
    "yellow.600": "#ca8a04",
    "yellow.700": "#a16207",
    "yellow.800": "#854d0e",
    "yellow.900": "#713f12",
    primary: "#ffe4e6",
    secondPrimaryColor: "#AA151B",
    thirdPrimaryColor: "#F1BF00",
    borderColor: "#E3F1E9",
    disableColor: "#B3B3B3",
    orangeColor: "#F5A520",
    colorText: "#282828",
    headerColor: "#F1F1F1",
    referAndEarnColor: "#FFE2AA",
    topicTitleColor: "#292D32",
    colorRewardsPointText: "#212121",
  },
};

const appConfig = createTamagui({
  ...config,
  fonts: {
    body: defaultFont,
    heading: defaultFont,
    mono: defaultFont,
    silkscreen: defaultFont,
    default: defaultFont,
  },
  themes: {
    light: {
      ...config.themes.light,
      ...defaultTokens.color,
      background: "white",
    },
  },
  tokens: {
    ...defaultTokens,
    ...tokens,
    size: {
      "0": {
        isVar: true,
        key: "$0",
        name: "size-1",
        val: 0,
        variable: "var(--size-1)",
      },
      0.5: {
        isVar: true,
        key: "$0.5",
        name: "size-3",
        val: 2,
        variable: "var(--size-3)",
      },
      0.25: {
        isVar: true,
        key: "$0.25",
        name: "size-2",
        val: 1,
        variable: "var(--size-2)",
      },
      0.75: {
        isVar: true,
        key: "$0.75",
        name: "size-4",
        val: 4 * 0.75,
        variable: "var(--size-4)",
      },
      1: {
        isVar: true,
        key: "$1",
        name: "size-5",
        val: 4,
        variable: "var(--size-5)",
      },
      1.5: {
        isVar: true,
        key: "$1.5",
        name: "size-6",
        val: 4 * 1.5,
        variable: "var(--size-6)",
      },
      2: {
        isVar: true,
        key: "$2",
        name: "size-7",
        val: 8,
        variable: "var(--size-7)",
      },
      2.5: {
        isVar: true,
        key: "$2.5",
        name: "size-8",
        val: 4 * 2.5,
        variable: "var(--size-8)",
      },
      3: {
        isVar: true,
        key: "$3",
        name: "size-9",
        val: 12,
        variable: "var(--size-9)",
      },
      3.5: {
        isVar: true,
        key: "$3.5",
        name: "size-10",
        val: 4 * 3.5,
        variable: "var(--size-10)",
      },
      4: {
        isVar: true,
        key: "$4",
        name: "size-11",
        val: 16,
        variable: "var(--size-11)",
      },
      4.5: {
        isVar: true,
        key: "$4.5",
        name: "size-13",
        val: 4 * 4.5,
        variable: "var(--size-13)",
      },
      5: {
        isVar: true,
        key: "$5",
        name: "size-14",
        val: 20,
        variable: "var(--size-14)",
      },
      6: {
        isVar: true,
        key: "$6",
        name: "size-15",
        val: 24,
        variable: "var(--size-15)",
      },
      7: {
        isVar: true,
        key: "$7",
        name: "size-16",
        val: 28,
        variable: "var(--size-16)",
      },
      8: {
        isVar: true,
        key: "$8",
        name: "size-17",
        val: 32,
        variable: "var(--size-17)",
      },
      9: {
        isVar: true,
        key: "$9",
        name: "size-18",
        val: 36,
        variable: "var(--size-18)",
      },
      10: {
        isVar: true,
        key: "$10",
        name: "size-19",
        val: 40,
        variable: "var(--size-19)",
      },
      11: {
        isVar: true,
        key: "$11",
        name: "size-20",
        val: 44,
        variable: "var(--size-20)",
      },
      12: {
        isVar: true,
        key: "$12",
        name: "size-21",
        val: 48,
        variable: "var(--size-21)",
      },
      13: {
        isVar: true,
        key: "$13",
        name: "size-22",
        val: 52,
        variable: "var(--size-22)",
      },
      14: {
        isVar: true,
        key: "$14",
        name: "size-23",
        val: 56,
        variable: "var(--size-23)",
      },
      15: {
        isVar: true,
        key: "$15",
        name: "size-24",
        val: 60,
        variable: "var(--size-24)",
      },
      16: {
        isVar: true,
        key: "$16",
        name: "size-25",
        val: 64,
        variable: "var(--size-25)",
      },
      17: {
        isVar: true,
        key: "$17",
        name: "size-26",
        val: 68,
        variable: "var(--size-26)",
      },
      18: {
        isVar: true,
        key: "$18",
        name: "size-27",
        val: 72,
        variable: "var(--size-27)",
      },
      19: {
        isVar: true,
        key: "$19",
        name: "size-28",
        val: 76,
        variable: "var(--size-28)",
      },
      20: {
        isVar: true,
        key: "$20",
        name: "size-29",
        val: 78,
        variable: "var(--size-29)",
      },
      true: {
        isVar: true,
        key: "$true",
        name: "size-12",
        val: 16,
        variable: "var(--size-12)",
      },
    },
  },
});

export const SHADOW = {
  basicCard:
    Platform.OS === "android"
      ? { elevation: 5 }
      : {
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
      },
  clarity:
    Platform.OS === "android"
      ? { elevation: 10 }
      : {
        shadowColor: "rgba(0, 0, 0, 0.32)",
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 16,
      },
  button:
    Platform.OS === "android"
      ? { elevation: 5 }
      : {
        shadowColor: "rgba(0, 0, 0, 0.16)",
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
      },
  input:
    Platform.OS === "android"
      ? { elevation: 5 }
      : {
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
      },
};

export type AppConfig = typeof appConfig;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends AppConfig { }
}

export default appConfig;