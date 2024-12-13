import images from "@assets/images/images";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { DeviceType, deviceType } from "expo-device";
import React from "react";
import { Image } from "react-native";
import { SizableText, XStack, YStack } from "tamagui";

function PrepositionsItemCard({
  item,
  onPress,
}: Readonly<{
  item: { id: string; prepositionsName: string; slug: string };
  onPress: (slug: string, prepositionsName: string) => void;
}>) {
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <TouchableScale
      onPress={() => {
        onPress(item?.slug ?? "", item?.prepositionsName ?? "");
      }}
      unstable_pressDelay={100}
    >
      <XStack
        bg={"$secondPrimaryColor"}
        borderRadius={isPhoneDevice ? 8 : 12}
        mx={isPhoneDevice ? "$3" : 0}
        px={isPhoneDevice ? "$3" : "$5"}
        py={isPhoneDevice ? "$4" : "$6"}
        alignItems="center"
      >
        <SizableText
          flex={1}
          fontSize={isPhoneDevice ? "$xl" : "$3xl"}
          lineHeight={isPhoneDevice ? 30 : 50}
          color={"$white"}
          fontWeight={"$semibold"}
          numberOfLines={3}
        >
          {item?.prepositionsName ?? ""}
        </SizableText>
        <YStack w={isPhoneDevice ? "$1" : "$2"} />
        <Image
          style={{
            width: isPhoneDevice ? 18 : 27,
            height: isPhoneDevice ? 18 : 27,
            resizeMode: "contain",
            transform: [{ rotate: "180deg" }],
          }}
          source={images.backArrow}
        />
      </XStack>
    </TouchableScale>
  );
}

export default PrepositionsItemCard;
