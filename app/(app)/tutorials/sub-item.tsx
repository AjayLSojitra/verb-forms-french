import React from "react";
import { SizableText } from "tamagui";
import { DeviceType, deviceType } from "expo-device";
import TouchableScale from "@design-system/components/shared/touchable-scale";

function SubItem({
  val,
  onPress,
}: Readonly<{
  val: string;
  onPress: (content: string) => void;
}>) {
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <TouchableScale
      style={{ flex: 1 }}
      onPress={() => {
        onPress(val);
      }}
      unstable_pressDelay={100}
    >
      {({ pressed, hovered }) => {
        return (
          <SizableText
            bg={pressed || hovered ? "$secondPrimaryColor" : "$primary"}
            mx={isPhoneDevice ? "$1" : "$1.5"}
            my={isPhoneDevice ? "$2" : "$3"}
            flex={1}
            fontSize={isPhoneDevice ? "$xs" : "$xl"}
            lineHeight={isPhoneDevice ? 18 : 30}
            color={"$black"}
            fontWeight={"$medium"}
            adjustsFontSizeToFit
            textAlign="center"
            alignSelf="center"
            numberOfLines={2}
          >
            {val}
          </SizableText>
        );
      }}
    </TouchableScale>
  );
}

export default SubItem;
