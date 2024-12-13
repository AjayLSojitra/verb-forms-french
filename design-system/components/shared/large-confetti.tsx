import lotties from "@assets/lotties/lotties";
import React from "react";
import { YStack, useWindowDimensions } from "tamagui";
import LottieWrapper from "@modules/shared/components/lottie-wrapper";
import {
  useConfettiStateValue,
  useResetConfettiState,
} from "@modules/shared/atoms/confetti-atom";
import ResponsiveContent from "@modules/shared/components/responsive-content";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";

function LargeConfetti() {
  const width = useResponsiveWidth();
  const { height: screenHeight } = useWindowDimensions();
  const { value: showConfetti, mode } = useConfettiStateValue();
  const resetConfettiState = useResetConfettiState();

  return (
    <>
      {showConfetti && mode === "large" && (
        <YStack
          position="absolute"
          zIndex={1}
          left={0}
          right={0}
          bottom={0}
          flex={1}
          testID="large-confetti"
        >
          <ResponsiveContent flex={1}>
            <LottieWrapper
              webProps={{
                options: {
                  loop: false,
                  autoplay: true,
                  animationData: lotties.confettiLarge,
                },
                width,
                height: screenHeight,
                speed: 0.224,
                eventListeners: [
                  {
                    eventName: "complete",
                    callback: resetConfettiState,
                  },
                ],
              }}
              height={screenHeight}
              width={width}
              source={lotties.confettiLarge}
              loop={false}
              onAnimationFinisha={resetConfettiState}
              duration={2000}
            />
          </ResponsiveContent>
        </YStack>
      )}
    </>
  );
}

export default LargeConfetti;
