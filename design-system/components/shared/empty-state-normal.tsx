import React from "react";
import { SizableText, YStack } from "tamagui";
import { Image } from "react-native";
import images from "@assets/images/images";
import { DeviceType, deviceType } from "expo-device";

function EmptyStateNormal({
  title,
}: Readonly<{
  title: string;
}>) {
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack my={"$6"}>
      <Image
        key={"noData"}
        source={images.noData}
        style={{
          height: 32,
          width: 32,
          alignSelf: "center",
          tintColor: "#F1BF00",
        }}
        alt={"noData"}
      />
      <YStack h={"$2"} />
      <SizableText
        fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
        lineHeight={isPhoneDevice ? 22 : 34}
        color={"$thirdPrimaryColor"}
        fontWeight={"$medium"}
        textAlign="center"
        textShadowColor={"$secondPrimaryColor"}
      >
        {title}
      </SizableText>
    </YStack>
  );
}

export default EmptyStateNormal;