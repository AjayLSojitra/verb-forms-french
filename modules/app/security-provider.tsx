import React, { useEffect, useState } from "react";
import * as Device from "expo-device";
import { SizableText, YStack } from "tamagui";
import { BackHandler, Image, Platform } from "react-native";
import images from "@assets/images/images";
import BasicButton from "@design-system/components/buttons/basic-button";
import { deviceType, DeviceType } from "expo-device";

function SecurityProvider(props: {
  children: (
    result: "CHECKING" | "UN_SECURED" | "SECURED",
    fallback: JSX.Element
  ) => any;
}) {
  const [securityResult, setSecurityResult] = useState<
    "CHECKING" | "UN_SECURED" | "SECURED"
  >("CHECKING");

  async function securityCheck() {
    const isRootedOrJaiilbroken = await Device.isRootedExperimentalAsync();
    setSecurityResult(isRootedOrJaiilbroken ? "UN_SECURED" : "SECURED");
  }

  useEffect(() => {
    securityCheck();
  }, []);

  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return props.children(
    securityResult,
    securityResult === "CHECKING" ? (
      <></>
    ) : securityResult === "UN_SECURED" ? (
      <YStack
        flex={1}
        bg={"$black"}
        alignItems="center"
        justifyContent="center"
      >
        <Image
          key={"icon"}
          source={images.mood1}
          style={{
            height: 65,
            width: 65,
            resizeMode: "contain",
            tintColor: "#dc2626",
          }}
          alt={"icon"}
        />
        <YStack h={"$2"} />
        <SizableText
          fontSize={isPhoneDevice ? "$2xl" : "$4xl"}
          lineHeight={isPhoneDevice ? 30 : 50}
          color={"$red.600"}
          fontWeight={"700"}
          textAlign="center"
        >
          {`Warning`}
        </SizableText>
        <SizableText
          fontSize={isPhoneDevice ? "$xl" : "$3xl"}
          lineHeight={isPhoneDevice ? 30 : 50}
          color={"$white"}
          fontWeight={"700"}
          textAlign="center"
        >
          {`${
            Platform.OS === "ios" ? "Jailbroken" : "Rooted"
          } device detected!`}
        </SizableText>
        <YStack h={"$4"} />
        <BasicButton
          height={38}
          width={100}
          linearGradientProps={{ colors: ["#000091", "#000091"] }}
          onPress={() => {
            try {
              BackHandler.exitApp();
            } catch {}
          }}
        >
          <SizableText
            mb={-5}
            fontSize={isPhoneDevice ? "$hmd" : "$hml"}
            lineHeight={isPhoneDevice ? 30 : 40}
            color={"$white"}
            fontWeight={"700"}
            textAlign="center"
          >
            Close
          </SizableText>
        </BasicButton>
      </YStack>
    ) : (
      <></>
    )
  );
}

export default SecurityProvider;
