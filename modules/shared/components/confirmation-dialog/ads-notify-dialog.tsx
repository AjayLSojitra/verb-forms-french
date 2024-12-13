import React from "react";
import { SizableText, XStack, YStack } from "tamagui";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import { Modal } from "react-native";
import ResponsiveContent from "@modules/shared/responsive-content";
import lotties from "@assets/lotties/lotties";
import LottieWrapper from "../lottie-wrapper";
import { deviceType, DeviceType } from "expo-device";

type AdsNotifyDialogProps = {
  showDialog: boolean;
  content: string;
};
function AdsNotifyDialog(props: Readonly<AdsNotifyDialogProps>) {
  const { showDialog = false, content } = props;
  const responsiveWidth = useResponsiveWidth();
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <Modal animationType="slide" transparent={true} visible={showDialog}>
      <YStack backgroundColor={"#rgba(33, 33, 33, 0.25)"} flex={1}>
        <ResponsiveContent
          alignItems="center"
          justifyContent="center"
          width={responsiveWidth}
          flex={1}
        >
          <YStack
            backgroundColor={"$white"}
            width={responsiveWidth - 40}
            p={"$4"}
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
          >
            <XStack alignContent="center" justifyContent="center">
              <LottieWrapper
                webProps={{
                  options: {
                    loop: true,
                    autoplay: true,
                    animationData: lotties.watchVideo,
                  },
                  height: 100,
                  width: 100,
                }}
                width={100}
                height={100}
                source={lotties.watchVideo}
                loop={true}
              />
            </XStack>
            <SizableText
              color={"$black"}
              fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
              lineHeight={isPhoneDevice ? 22 : 34}
              fontWeight={"$bold900"}
              textAlign="center"
            >
              {content}
            </SizableText>
          </YStack>
        </ResponsiveContent>
      </YStack>
    </Modal>
  );
}

export default AdsNotifyDialog;
