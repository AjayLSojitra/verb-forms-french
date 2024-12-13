import React from "react";
import { SizableText, YStack } from "tamagui";
import BasicButton from "@design-system/components/buttons/basic-button";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import { DeviceType, deviceType } from "expo-device";

function VerbItemCard({
  item,
  onPress,
}: Readonly<{
  item: string;
  onPress: () => void;
}>) {
  const responsiveWidth = useResponsiveWidth();
  const width = (responsiveWidth - 80) / 4;
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack mt={16} ml={16}>
      <BasicButton
        height={width}
        width={width}
        linearGradientProps={{ colors: ["#AA151B", "#AA151B"] }}
        unstable_pressDelay={100}
        onPress={onPress}
      >
        <YStack
          width={width}
          px={"$2"}
          justifyContent="center"
          alignItems="center"
        >
          <SizableText
            size={isPhoneDevice ? "$hlg" : "$5xl"}
            lineHeight={isPhoneDevice ? 45 : 65}
            color={"$white"}
            fontWeight={"700"}
            textAlign="center"
            numberOfLines={3}
          >
            {item}
          </SizableText>
        </YStack>
      </BasicButton>
    </YStack>
  );
}

export default VerbItemCard;
