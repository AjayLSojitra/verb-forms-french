import { InputAccessoryView, Keyboard } from "react-native";
import React from "react";
import { SizableText, YStack } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { DeviceType, deviceType } from "expo-device";

export type InputAccessoryViewiOSProps = {
  title: string;
};

function InputAccessoryViewiOS(props: Readonly<InputAccessoryViewiOSProps>) {
  const { title } = props;
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <InputAccessoryView nativeID="inputAccessoryView">
      <YStack
        borderWidth={1}
        borderColor={"$thirdPrimaryColor"}
        h={"$10"}
        bg={"white"}
        alignItems={"flex-end"}
        justifyContent={"center"}
      >
        <TouchableScale onPress={Keyboard.dismiss}>
          <YStack
            mr={"$2"}
            paddingVertical={4}
            paddingHorizontal={10}
            borderRadius={52}
            backgroundColor={"$thirdPrimaryColor"}
          >
            <SizableText
              fontSize={isPhoneDevice ? "$sm" : "$lg"}
              lineHeight={isPhoneDevice ? 18 : 26}
              color={"$white"}
              fontWeight={"$medium"}
            >
              {title}
            </SizableText>
          </YStack>
        </TouchableScale>
      </YStack>
    </InputAccessoryView>
  );
}

export default InputAccessoryViewiOS;
