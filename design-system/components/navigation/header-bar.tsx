import React from "react";
import { SizableText, XStack, YStack } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import Close from "@assets/svgs/close";
import images from "@assets/images/images";
import { Image } from "react-native";
import { deviceType, DeviceType } from "expo-device";

export type HeaderBarProps = {
  title?: string;
  subTitle?: string;
  titleLeftIcon?: JSX.Element;
  subTitleLeftIcon?: JSX.Element;
  back?: boolean;
  cross?: boolean;
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  goBack?: () => void;
  titleSize?: "$hsm" | "$hmd" | string;
  profileElement?: JSX.Element;
  titleNumberOfLines?: number;
  titleEllipsizeMode?: "head" | "tail" | "middle" | "clip";
  customTitle?: JSX.Element;
};

function HeaderBar(props: HeaderBarProps) {
  const isPhoneDevice = deviceType === DeviceType.PHONE;
  const {
    title,
    customTitle,
    titleLeftIcon,
    leftElement,
    rightElement,
    back = true,
    cross,
    goBack,
    titleSize = isPhoneDevice ? "$hsm" : "$2xl",
    subTitle,
    subTitleLeftIcon,
    profileElement,
    titleNumberOfLines,
    titleEllipsizeMode,
  } = props;
  const iconSize = isPhoneDevice ? 18 : 26;
  const closeIconSize = isPhoneDevice ? 24 : 34;

  const renderCross = cross ? (
    <TouchableScale onPress={goBack}>
      <YStack
        bg={"$secondPrimaryColor"}
        paddingHorizontal={isPhoneDevice ? 8 : 12}
        paddingVertical={isPhoneDevice ? 8 : 12}
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={isPhoneDevice ? 8 : 12}
        borderTopRightRadius={isPhoneDevice ? 8 : 12}
        alignItems="center"
        justifyContent="center"
      >
        <Close height={closeIconSize} width={closeIconSize} fill={"white"} />
      </YStack>
    </TouchableScale>
  ) : (
    <></>
  );

  const renderBackOrCross = back ? (
    <TouchableScale onPress={goBack}>
      <YStack
        bg={"$secondPrimaryColor"}
        paddingLeft={isPhoneDevice ? 8 : 12}
        paddingRight={isPhoneDevice ? 16 : 24}
        paddingVertical={isPhoneDevice ? 8 : 12}
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={isPhoneDevice ? 8 : 12}
        borderTopRightRadius={isPhoneDevice ? 8 : 12}
        alignItems="center"
        justifyContent="center"
      >
        <Image
          key={"backArrow"}
          source={images.backArrow}
          style={{
            height: iconSize,
            width: iconSize,
            margin: isPhoneDevice ? 3 : 4.5,
          }}
          alt={"back arrow"}
        />
      </YStack>
    </TouchableScale>
  ) : (
    renderCross
  );

  return (
    <XStack alignItems={profileElement ? "flex-start" : "center"}>
      <YStack minWidth={isPhoneDevice ? 40 : 60} alignItems="flex-start">
        {leftElement ? leftElement : renderBackOrCross}
      </YStack>
      <YStack flex={1} alignItems="center" mt={profileElement ? "$-2" : 0}>
        {profileElement}
        <XStack
          alignItems="center"
          alignSelf="center"
          justifyContent="center"
          mx={isPhoneDevice ? "$2" : "$3"}
        >
          {titleLeftIcon}
          {customTitle ? (
            <>{customTitle}</>
          ) : (
            <SizableText
              fontSize={titleSize}
              fontWeight={"$semibold"}
              color={"$white"}
              lineHeight={isPhoneDevice ? 24 : 30}
              numberOfLines={titleNumberOfLines}
              ellipsizeMode={titleEllipsizeMode}
            >
              {title}
            </SizableText>
          )}
        </XStack>
        <XStack alignItems="center">
          {subTitleLeftIcon ? subTitleLeftIcon : <></>}
          {subTitle && subTitleLeftIcon && <YStack w={"$1"} />}
          {subTitle ? (
            <SizableText
              fontSize={isPhoneDevice ? "$xs" : "$lg"}
              lineHeight={isPhoneDevice ? 18 : 24}
              fontWeight={"$medium"}
              color={"$blueGray.500"}
            >
              {subTitle}
            </SizableText>
          ) : (
            <></>
          )}
        </XStack>
      </YStack>
      <YStack minWidth={isPhoneDevice ? 40 : 60} alignItems="flex-end">
        {rightElement ? rightElement : <></>}
      </YStack>
    </XStack>
  );
}

export default HeaderBar;
