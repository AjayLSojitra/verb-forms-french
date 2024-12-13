import images from "@assets/images/images";
import BasicButton from "@design-system/components/buttons/basic-button";
import { staticAndroidPackageName } from "@modules/shared/components/helpers";
import React, { useEffect, useState } from "react";
import { Image, Linking, Platform } from "react-native";
import DeviceInfo, { getInstallerPackageName } from "react-native-device-info";
import { SizableText, YStack } from "tamagui";
import { AppManifest } from "../../app-manifest";
import { DeviceType, deviceType } from "expo-device";

type JailbreakCheckProps = {
  children?: JSX.Element;
};

function CodeTamperingCheck(props: JailbreakCheckProps) {
  const [codeTampered, setCodeTampered] = useState(false);
  const { children } = props;
  const appMode = AppManifest.extra.mode;
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  useEffect(() => {
    if (Platform.OS === "android" && appMode === "prod") {
      (async () => {
        const installerName = await getInstallerPackageName();
        setCodeTampered(
          installerName !== "com.android.vending" ||
            DeviceInfo.getBundleId() !== staticAndroidPackageName
        );
      })();
    }
  }, []);

  return codeTampered ? (
    <YStack
      flex={1}
      px={"$4"}
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
        fontSize={isPhoneDevice ? "$xl" : "$3xl"}
        lineHeight={isPhoneDevice ? 30 : 50}
        color={"$red.600"}
        fontWeight={"700"}
        textAlign="center"
      >
        {`Please reinstall Verb Forms - French`}
      </SizableText>
      <SizableText
        fontSize={"$md"}
        color={"$white"}
        fontWeight={"700"}
        textAlign="center"
      >
        Something went wrong, please delete this version of the app and
        reinstall it.
      </SizableText>
      <YStack h={"$4"} />
      <BasicButton
        height={38}
        width={100}
        linearGradientProps={{ colors: ["#000091", "#000091"] }}
        onPress={() => {
          Linking.openURL(
            `https://play.google.com/store/apps/details?id=${staticAndroidPackageName}`
          );
        }}
      >
        <SizableText
          fontSize={"$md"}
          color={"$white"}
          fontWeight={"700"}
          textAlign="center"
        >
          Reinstall
        </SizableText>
      </BasicButton>
    </YStack>
  ) : (
    children
  );
}

export default CodeTamperingCheck;
