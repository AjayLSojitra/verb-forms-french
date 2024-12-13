import React from "react";
import { SizableText, XStack, YStack } from "tamagui";
import { DeviceType, deviceType } from "expo-device";
import { Image } from "react-native";
import images from "@assets/images/images";

function HeaderItem({
  val,
}: Readonly<{
  val: string;
}>) {
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <XStack
      mx={isPhoneDevice ? "$1" : "$1.5"}
      my={isPhoneDevice ? "$2" : "$3"}
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <SizableText
        fontSize={isPhoneDevice ? "$sm" : "$2xl"}
        lineHeight={isPhoneDevice ? 24 : 34}
        color={"$secondPrimaryColor"}
        fontWeight={"$semibold"}
        adjustsFontSizeToFit
        textAlign="center"
        alignSelf="center"
        numberOfLines={2}
      >
        {val + ` 📢`}
      </SizableText>
     
    </XStack>
  );
}

export default HeaderItem;
