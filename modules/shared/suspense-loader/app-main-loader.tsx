import React, { useRef } from "react";
import { XStack } from "tamagui";
import lotties from "@assets/lotties/lotties";
import LottieView from "lottie-react-native";

type AppMainLoaderProps = {
  size?: number,
  my?: string | 0
}

function AppMainLoader(props: Readonly<AppMainLoaderProps>) {
  const { size = 48, my = "$10" } = props;
  const animation = useRef(null);

  return (
    <XStack
      alignContent="center"
      justifyContent="center"
      my={my}
    >
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: size,
          height: size,
        }}
        source={lotties.appLoader}
      />
    </XStack>
  );
}

export default AppMainLoader;
