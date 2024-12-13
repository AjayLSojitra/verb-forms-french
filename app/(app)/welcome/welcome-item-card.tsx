import React from "react";
import { SizableText, YStack } from "tamagui";
import BasicButton from "@design-system/components/buttons/basic-button";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import { DeviceType, deviceType } from "expo-device";

function WelcomeItemCard({
  item,
  onPress,
}: Readonly<{
  item: { title: string; id: string };
  onPress: () => void;
}>) {
  const responsiveWidth = useResponsiveWidth();
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack
      my={isPhoneDevice ? "$2" : "$3"}
      alignItems="center"
      width={responsiveWidth}
    >
      <BasicButton
        height={isPhoneDevice ? 74 : 111}
        width={responsiveWidth - (isPhoneDevice ? 48 : 12)}
        linearGradientProps={{ colors: ["#AA151B", "#AA151B"] }}
        onPress={onPress}
      >
        <YStack
          px={isPhoneDevice ? "$2" : "$3"}
          justifyContent="center"
          alignItems="center"
        >
          <SizableText
            fontSize={isPhoneDevice ? "$hmd" : "$hml"}
            lineHeight={isPhoneDevice ? 30 : 40}
            color={"$white"}
            fontWeight={"700"}
            textAlign="center"
            numberOfLines={3}
          >
            {item?.title ?? ""}
          </SizableText>
        </YStack>
      </BasicButton>
    </YStack>
  );
}

export default WelcomeItemCard;
