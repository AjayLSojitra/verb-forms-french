import React from "react";
import { YStack } from "tamagui";
import HeaderItemsWrapper from "./header-items-wrapper";
import SubItemsWrapper from "./sub-items-wrapper";

function TableWrapper({
  headerArray,
  subItemsArray,
  onPress,
}: Readonly<{
  headerArray: string[];
  subItemsArray: { subDataArray: string[] }[];
  onPress: (content: string) => void;
}>) {
  return (
    <YStack>
      <HeaderItemsWrapper dataArray={headerArray} />
      <SubItemsWrapper dataArray={subItemsArray} onPress={onPress} />
    </YStack>
  );
}

export default TableWrapper;
