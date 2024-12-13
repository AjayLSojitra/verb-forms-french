import React from "react";
import { YStack, SizableText } from "tamagui";
import ErrorIcon from "../../../assets/svgs/error-icon";
import ResponsiveContent from "./responsive-content";
import SecondaryButton from "@design-system/components/buttons/secondary-button";
import { DeviceType, deviceType } from "expo-device";

type ErrorPlaceholderProps = {
  title: string;
  description: string;
  buttonTitle: string;
  onPress: () => void;
};

function ErrorPlaceholder(props: ErrorPlaceholderProps) {
  const { title, description, buttonTitle, onPress } = props;
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <ResponsiveContent flex={1}>
      <YStack mx={"$8"} flex={1} justifyContent="center" alignItems="center">
        <ErrorIcon height={32} width={32} fill={"blueGray.500"} />
        <SizableText
          fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
          lineHeight={isPhoneDevice ? 22 : 30}
          color={"$blueGray.500"}
          fontWeight={"$semibold"}
          textAlign="center"
        >
          {title}
        </SizableText>
        <SizableText
          fontSize={isPhoneDevice ? "$xs" : "$lg"}
          lineHeight={isPhoneDevice ? 18 : 26}
          color={"$blueGray.500"}
          fontWeight={"$medium"}
          textAlign="center"
        >
          {description}
        </SizableText>
        <YStack h={"$4"} />
        <SecondaryButton width={140} onPress={onPress}>
          {buttonTitle}
        </SecondaryButton>
      </YStack>
    </ResponsiveContent>
  );
}

export default ErrorPlaceholder;
