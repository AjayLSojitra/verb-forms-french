import { useTheme } from "tamagui";

function useGetSvgFillColor(fill: string) {
  const theme = useTheme();

  return theme[fill]?.val;
}

export default useGetSvgFillColor;
