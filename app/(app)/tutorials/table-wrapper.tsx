import React from "react";
import { YStack } from "tamagui";
import HeaderItemsWrapper from "./header-items-wrapper";
import SubItemsWrapper from "./sub-items-wrapper";

function TableWrapper({
  headerArray,
  subItemsArray,
  flexs,
  onPress,
}: Readonly<{
  headerArray: string[];
  subItemsArray: { subDataArray: string[] }[];
  onPress: (content: string) => void;
  flexs?: number[];
}>) {
  return (
    <YStack>
      <HeaderItemsWrapper dataArray={headerArray} flexs={flexs} />
      <SubItemsWrapper
        dataArray={subItemsArray}
        onPress={onPress}
        flexs={flexs}
      />
    </YStack>
  );
}

export default TableWrapper;
