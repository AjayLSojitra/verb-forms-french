import images from "@assets/images/images";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { DeviceType, deviceType } from "expo-device";
import React from "react";
import { Image } from "react-native";
import { SizableText, XStack, YStack } from "tamagui";

function VerbExamplesItemCard({
  item,
  onPress,
}: Readonly<{
  item: {
    id: string;
    title: string;
    english_title: string;
    example: string;
    english_example: string;
  };
  onPress: (content: string) => void;
}>) {
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack
      bg={"$white"}
      borderRadius={isPhoneDevice ? 8 : 12}
      mx={isPhoneDevice ? "$3" : 0}
      px={isPhoneDevice ? "$3" : "$5"}
      py={isPhoneDevice ? "$3" : "$5"}
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
                fontSize={isPhoneDevice ? "$xl" : "$3xl"}
                lineHeight={isPhoneDevice ? 30 : 50}
                color={"$secondPrimaryColor"}
                fontWeight={"$semibold"}
                numberOfLines={4}
              >
                {`${item?.title ?? ""} (${item?.english_title ?? ""})`}
              </SizableText>
              <YStack w={isPhoneDevice ? "$2" : "$3"} />
              <Image
                style={{
                  width: isPhoneDevice ? 18 : 27,
                  height: isPhoneDevice ? 18 : 27,
                  resizeMode: "contain",
                  tintColor: "#AA151B",
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
                  adjustsFontSizeToFit
                  numberOfLines={4}
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
            onPress(item?.english_example ?? "");
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
                  fontWeight={"$normal"}
                  adjustsFontSizeToFit
                  numberOfLines={4}
                >
                  {item?.english_example ?? ""}
                </SizableText>
              </XStack>
            );
          }}
        </TouchableScale>
      </YStack>
    </YStack>
  );
}

export default VerbExamplesItemCard;
