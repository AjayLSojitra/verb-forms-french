import images from "@assets/images/images";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { DeviceType, deviceType } from "expo-device";
import React from "react";
import { Image } from "react-native";
import { SizableText, XStack, YStack } from "tamagui";

function PrepositionsDetailsItemCard({
  item,
  onPress,
}: Readonly<{
  item: {
    id: string;
    description: string;
    example: string;
    title: string;
    slug: string;
  };
  onPress: (content: string) => void;
}>) {
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack
      bg={"$white"}
      mx={isPhoneDevice ? "$3" : 0}
      px={isPhoneDevice ? "$3" : "$5"}
      py={isPhoneDevice ? "$4" : "$6"}
      borderRadius={isPhoneDevice ? 8 : 12}
    >
      <TouchableScale
        onPress={() => {
          onPress(item?.title ?? "");
        }}
        unstable_pressDelay={100}
      >
        {({ pressed, hovered }) => {
          return (
            <XStack borderRadius={isPhoneDevice ? 8 : 12} alignItems="center">
              <SizableText
                flex={1}
                fontSize={isPhoneDevice ? "$2xl" : "$4xl"}
                lineHeight={isPhoneDevice ? 30 : 50}
                color={"$secondPrimaryColor"}
                fontWeight={"$semibold"}
                numberOfLines={4}
                adjustsFontSizeToFit
              >
                {item?.title ?? ""}
              </SizableText>
              <YStack w={isPhoneDevice ? "$2" : "$3"} />
              <Image
                style={{
                  width: isPhoneDevice ? 18 : 27,
                  height: isPhoneDevice ? 18 : 27,
                  resizeMode: "contain",
                  tintColor: "#000091",
                }}
                source={images.soundOnWhite}
              />
            </XStack>
          );
        }}
      </TouchableScale>
      <YStack h={isPhoneDevice ? "$2" : "$3"} />
      <YStack borderRadius={isPhoneDevice ? 8 : 12}>
        <TouchableScale
          onPress={() => {
            onPress(item?.example ?? "");
          }}
          unstable_pressDelay={100}
        >
          {({ pressed, hovered }) => {
            return (
              <XStack
                p={isPhoneDevice ? "$2" : "$3"}
                borderRadius={isPhoneDevice ? 8 : 12}
                bg={"$yellow.100"}
                alignItems="center"
              >
                <Image
                  style={{
                    width: isPhoneDevice ? 18 : 27,
                    height: isPhoneDevice ? 18 : 27,
                    resizeMode: "contain",
                    tintColor: "#000000",
                  }}
                  source={images.soundOnWhite}
                />
                <YStack w={isPhoneDevice ? "$2" : "$3"} />
                <SizableText
                  flex={1}
                  fontSize={isPhoneDevice ? "$sm" : "$lg"}
                  lineHeight={isPhoneDevice ? 18 : 26}
                  color={"$black"}
                  fontWeight={"$medium"}
                  numberOfLines={4}
                  adjustsFontSizeToFit
                >
                  {`"${item?.example ?? ""}"`}
                </SizableText>
              </XStack>
            );
          }}
        </TouchableScale>
      </YStack>
      <YStack h={isPhoneDevice ? "$2" : "$3"} />
      <YStack borderRadius={isPhoneDevice ? 8 : 12}>
        <TouchableScale
          onPress={() => {
            onPress(item?.description ?? "");
          }}
          unstable_pressDelay={100}
        >
          {({ pressed, hovered }) => {
            return (
              <XStack
                p={isPhoneDevice ? "$2" : "$3"}
                borderRadius={isPhoneDevice ? 8 : 12}
                bg={"$gray.100"}
                alignItems="center"
              >
                <Image
                  style={{
                    width: isPhoneDevice ? 18 : 27,
                    height: isPhoneDevice ? 18 : 27,
                    resizeMode: "contain",
                    tintColor: "#000000",
                  }}
                  source={images.soundOnWhite}
                />
                <YStack w={isPhoneDevice ? "$2" : "$3"} />
                <SizableText
                  flex={1}
                  fontSize={isPhoneDevice ? "$sm" : "$lg"}
                  lineHeight={isPhoneDevice ? 18 : 26}
                  color={"$black"}
                  fontWeight={"$medium"}
                  numberOfLines={4}
                  adjustsFontSizeToFit
                >
                  {item?.description ?? ""}
                </SizableText>
              </XStack>
            );
          }}
        </TouchableScale>
      </YStack>
    </YStack>
  );
}

export default PrepositionsDetailsItemCard;
