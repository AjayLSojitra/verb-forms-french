import React from "react";
import { YStack } from "tamagui";
import lotties from "@assets/lotties/lotties";
import LottieWrapper from "../components/lottie-wrapper";

function AppAnimation({ size }: { readonly size: number }) {
  return (
    <YStack flex={1} justifyContent={"center"} alignItems={"center"}>
      <YStack
        height={size}
        width={size}
        bg={"$thirdPrimaryColor"}
        borderRadius={size / 2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LottieWrapper
          webProps={{
            options: {
              loop: true,
              autoplay: true,
              animationData: lotties.appLoader,
            },
            height: size,
            width: size,
          }}
          width={size}
          height={size}
          source={lotties.appLoader}
          loop={true}
        />
      </YStack>
    </YStack>
  );
}

export default AppAnimation;
