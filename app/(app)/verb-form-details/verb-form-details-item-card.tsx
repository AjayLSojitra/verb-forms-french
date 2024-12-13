import React from "react";
import { SizableText, useWindowDimensions, XStack, YStack } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { deviceType, DeviceType } from "expo-device";

function VerbFormDetailsItemCard({
  item,
  onPress,
}: Readonly<{
  item: {
    id: string;
    v1: string;
    v2: string;
    v3: string;
    v4: string;
    english_meaning: string;
  };
  onPress: (content: string) => void;
}>) {
  const { width } = useWindowDimensions();

  return (
    <YStack width={width} flex={1}>
      <YStack h={0.5} width={width} bg={"$black"} />
      <XStack width={width} flex={1}>
        <YStack w={0.5} bg={"$black"} />
        <SubItem content={item?.v1 ?? ""} onPress={onPress} />
        <YStack w={0.5} bg={"$black"} />
        <SubItem content={item?.english_meaning ?? ""} onPress={onPress} />
        <YStack w={0.5} bg={"$black"} />
        <SubItem content={item?.v2 ?? ""} onPress={onPress} />
        <YStack w={0.5} bg={"$black"} />
        <SubItem content={item?.v3 ?? ""} onPress={onPress} />
        <YStack w={0.5} bg={"$black"} />
        <SubItem content={item?.v4 ?? ""} onPress={onPress} />
        <YStack w={0.5} bg={"$black"} />
      </XStack>
    </YStack>
  );
}

export default VerbFormDetailsItemCard;

export function SubItem(
  props: Readonly<{
    onPress: (content: string) => void;
    content: string;
  }>
) {
  const { onPress, content } = props;
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <TouchableScale
      style={{ flex: 1 }}
      onPress={() => {
        onPress(content);
      }}
      unstable_pressDelay={100}
    >
      {({ pressed, hovered }) => {
        return (
          <SizableText
            bg={pressed || hovered ? "$secondPrimaryColor" : "$primary"}
            px={"$1"}
            py={isPhoneDevice ? "$4" : "$6"}
            fontSize={isPhoneDevice ? "$sm" : 22}
            lineHeight={isPhoneDevice ? 18 : 30}
            color={pressed || hovered ? "$white" : "$black"}
            fontWeight={"$medium"}
            textAlign="center"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {content}
          </SizableText>
        );
      }}
    </TouchableScale>
  );
}
