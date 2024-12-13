import images from "@assets/images/images";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { DeviceType, deviceType } from "expo-device";
import React from "react";
import { Image } from "react-native";
import { SizableText, XStack, YStack } from "tamagui";

function ContractionsItemCard({
  item,
  onPress,
}: Readonly<{
  item: {
    id: string;
    preposition: string;
    preposition_english: string;
    article: string;
    article_english: string;
    contraction: string;
    contraction_english: string;
    exampleSentence: string;
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
          onPress(item?.contraction ?? "");
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
                {`${item?.contraction ?? ""} (${
                  item?.contraction_english ?? ""
                })`}
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
            onPress(item?.preposition ?? "");
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
                    width: isPhoneDevice ? 14 : 21,
                    height: isPhoneDevice ? 14 : 21,
                    resizeMode: "contain",
                    tintColor: "#000000",
                  }}
                  source={images.soundOnWhite}
                />
                <YStack w={isPhoneDevice ? "$1" : "$2"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$sm" : "$lg"}
                  lineHeight={isPhoneDevice ? 18 : 26}
                  color={"$black"}
                  fontWeight={"$medium"}
                  adjustsFontSizeToFit
                  numberOfLines={4}
                >
                  {`${item?.preposition ?? ""} (${
                    item?.preposition_english ?? ""
                  })`}
                </SizableText>

                <YStack flex={1} />
                <SizableText
                  fontSize={isPhoneDevice ? "$xs" : "$lg"}
                  lineHeight={isPhoneDevice ? 16 : 30}
                  color={"$black"}
                  fontWeight={"$normal"}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                >
                  {` - Preposition`}
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
            onPress(item?.article ?? "");
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
                    width: isPhoneDevice ? 14 : 21,
                    height: isPhoneDevice ? 14 : 21,
                    resizeMode: "contain",
                    tintColor: "#000000",
                  }}
                  source={images.soundOnWhite}
                />
                <YStack w={isPhoneDevice ? "$1" : "$2"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$sm" : "$lg"}
                  lineHeight={isPhoneDevice ? 18 : 26}
                  color={"$black"}
                  fontWeight={"$medium"}
                  adjustsFontSizeToFit
                  numberOfLines={4}
                >
                  {`${item?.article ?? ""} (${item?.article_english ?? ""})`}
                </SizableText>

                <YStack flex={1} />
                <SizableText
                  fontSize={isPhoneDevice ? "$xs" : "$lg"}
                  lineHeight={isPhoneDevice ? 16 : 30}
                  color={"$black"}
                  fontWeight={"$normal"}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                >
                  {` - Article`}
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
            onPress(item?.exampleSentence ?? "");
          }}
          unstable_pressDelay={100}
        >
          {({ pressed, hovered }) => {
            return (
              <XStack
                p={isPhoneDevice ? "$2" : "$3"}
                borderRadius={isPhoneDevice ? 8 : 12}
                bg={"$green.100"}
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
                  {item?.exampleSentence ?? ""}
                </SizableText>
              </XStack>
            );
          }}
        </TouchableScale>
      </YStack>
    </YStack>
  );
}

export default ContractionsItemCard;
