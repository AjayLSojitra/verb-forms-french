import React from "react";
import { XStack, YStack } from "tamagui";
import SubItem from "./sub-item";
import { DeviceType, deviceType } from "expo-device";

function SubItemsWrapper({
  dataArray,
  onPress,
  flexs,
}: Readonly<{
  dataArray: { subDataArray: string[] }[];
  onPress: (content: string) => void;
  flexs?: number[];
}>) {
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack>
      {dataArray.map(({ subDataArray }, index) => (
        <YStack key={(subDataArray[0] ?? "") + index}>
          <XStack justifyContent="center">
            {subDataArray.map((subData, index) => (
              <XStack
                key={(subData ?? "") + index}
                flex={flexs ? flexs[index] : 1}
              >
                <YStack w={isPhoneDevice ? 1 : 1.5} bg={"$black"} />
                <SubItem val={subData} onPress={onPress} />
                {index === (subDataArray?.length ?? 1) - 1 && (
                  <YStack w={isPhoneDevice ? 1 : 1.5} bg={"$black"} />
                )}
              </XStack>
            ))}
          </XStack>
          <YStack h={isPhoneDevice ? 1 : 1.5} bg={"$black"} />
        </YStack>
      ))}
    </YStack>
  );
}

export default SubItemsWrapper;
