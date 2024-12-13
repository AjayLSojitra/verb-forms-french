import React from "react";
import { XStack, YStack } from "tamagui";
import HeaderItem from "./header-item";
import { DeviceType, deviceType } from "expo-device";

function HeaderItemsWrapper({
  dataArray,
}: Readonly<{
  dataArray: string[];
}>) {
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack>
      <YStack h={isPhoneDevice ? 1 : 1.5} bg={"$black"} />
      <XStack justifyContent="center">
        {dataArray.map((data, index) => (
          <XStack key={(data ?? "") + index} flex={1}>
            <YStack w={isPhoneDevice ? 1 : 1.5} bg={"$black"} />
            <HeaderItem val={data} />
            {index === (dataArray?.length ?? 1) - 1 && (
              <YStack w={isPhoneDevice ? 1 : 1.5} bg={"$black"} />
            )}
          </XStack>
        ))}
      </XStack>
      <YStack h={isPhoneDevice ? 1 : 1.5} bg={"$black"} />
    </YStack>
  );
}

export default HeaderItemsWrapper;
