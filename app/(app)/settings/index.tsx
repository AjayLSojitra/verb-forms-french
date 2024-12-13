import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { Linking, ScrollView, Switch, Image } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import images from "@assets/images/images";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import DeviceInfo from "react-native-device-info";
import LocalStorage from "@utils/local-storage";
import { useFocusEffect, useRouter } from "expo-router";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import {
  canShowAdmobInteratitial,
  rateMyApp,
  shareMyApp,
  staticInterstitialAd,
  staticPrivacyPolicy,
  staticSupportEmail,
} from "@modules/shared/components/helpers";
import { SOUND_KEY } from "@modules/shared/components/constants";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import AdsNotifyDialog from "@modules/shared/components/confirmation-dialog/ads-notify-dialog";
import { DeviceType, deviceType } from "expo-device";

function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isSoundEnabled = useRef(true);
  const [isSoundSwitchEnabled, setIsSoundSwitchEnabled] = useState(true);
  const toggleSound = () => (isSoundEnabled.current = !isSoundEnabled.current);
  const toggleSoundSwitch = () =>
    setIsSoundSwitchEnabled((previousState) => !previousState);

  const privacyPolicyURL = global.privacy_policy ?? staticPrivacyPolicy;
  const supportEmail = global?.supportEmail ?? staticSupportEmail;

  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    __DEV__
      ? TestIds.INTERSTITIAL_VIDEO
      : global?.interstitialAd ?? staticInterstitialAd
  );

  useFocusEffect(
    useCallback(() => {
      LocalStorage.getItemDefault(SOUND_KEY).then((val) => {
        isSoundEnabled.current = val == null || val === "Yes";
        setIsSoundSwitchEnabled(val == null || val === "Yes");
      });
    }, [])
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (error) {
      setShowAdsConfirmationPopup(false);
    }
  }, [error]);

  useEffect(() => {
    if (isClosed) {
      load();

      setShowAdsConfirmationPopup(false);
      // Action after the ad is closed
    }
  }, [isClosed]);

  const [showAdsConfirmationPopup, setShowAdsConfirmationPopup] =
    useState(false);
  const showInterstitial = () => {
    setShowAdsConfirmationPopup(true);
    setTimeout(() => {
      show();
    }, 2000);
  };

  const isPhoneDevice = deviceType === DeviceType.PHONE;
  const iconSize = isPhoneDevice ? 24 : 36;

  return (
    <YStack flex={1} backgroundColor={"$primary"}>
      <ScrollHeader
        title={`Settings`}
        customTitle={
          <SizableText
            fontSize={isPhoneDevice ? "$2xl" : "$4xl"}
            lineHeight={isPhoneDevice ? 30 : 50}
            color={"$secondPrimaryColor"}
            fontWeight={"700"}
            textAlign="center"
            rotateY={"15deg"}
            textShadowOffset={{ width: 0, height: 4 }}
            textShadowColor={"$thirdPrimaryColor"}
            textShadowRadius={8}
          >
            {`Settings`}
          </SizableText>
        }
        backgroundColor={"$primary"}
      />

      <ResponsiveContent flex={1}>
        <YStack alignItems="center" justifyContent="center">
          <AdsNotifyDialog
            showDialog={showAdsConfirmationPopup}
            content={`Ad is loading...`}
          />
        </YStack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack
            mx={isPhoneDevice ? "$4" : 0}
            mb={isPhoneDevice ? "$4" : "$6"}
          >
            <TouchableScale
              onPress={() => {
                LocalStorage.setItemDefault(
                  SOUND_KEY,
                  isSoundEnabled.current ? "No" : "Yes",
                  () => {
                    toggleSound();
                    toggleSoundSwitch();
                    if (isLoaded && canShowAdmobInteratitial()) {
                      showInterstitial();
                    }
                  }
                );
              }}
            >
              <XStack alignItems="center" py={isPhoneDevice ? "$4" : "$6"}>
                <Image
                  key={"sound"}
                  source={
                    isSoundSwitchEnabled ? images.soundOnWhite : images.soundOff
                  }
                  style={{
                    height: iconSize,
                    width: iconSize,
                    tintColor: "#AA151B",
                  }}
                  alt={"sound"}
                />
                <YStack w={isPhoneDevice ? "$2" : "$3"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                  lineHeight={isPhoneDevice ? 22 : 34}
                  color={"$secondPrimaryColor"}
                  fontWeight={"700"}
                >
                  Sound
                </SizableText>
                <YStack flex={1} />
                <Switch
                  trackColor={{ false: "#595959", true: "#AA151B" }}
                  thumbColor={isSoundSwitchEnabled ? "#ffffff" : "#B3B3B3"}
                  ios_backgroundColor="#AA151B"
                  onValueChange={() => {
                    LocalStorage.setItemDefault(
                      SOUND_KEY,
                      isSoundEnabled.current ? "No" : "Yes",
                      () => {
                        toggleSound();
                        toggleSoundSwitch();
                        if (isLoaded && canShowAdmobInteratitial()) {
                          showInterstitial();
                        }
                      }
                    );
                  }}
                  value={isSoundSwitchEnabled}
                />
              </XStack>
            </TouchableScale>

            <TouchableScale
              onPress={async () => {
                router.push("./tutorials?isFromSettings=True");
              }}
            >
              <XStack alignItems="center" py={isPhoneDevice ? "$4" : "$6"}>
                <Image
                  key={"help"}
                  source={images.help}
                  style={{
                    height: iconSize,
                    width: iconSize,
                    tintColor: "#AA151B",
                  }}
                  alt={"help"}
                />
                <YStack w={isPhoneDevice ? "$2" : "$3"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                  lineHeight={isPhoneDevice ? 22 : 34}
                  color={"$secondPrimaryColor"}
                  fontWeight={"700"}
                >
                  Basics of French Language
                </SizableText>
              </XStack>
            </TouchableScale>

            <TouchableScale
              onPress={async () => {
                const supported = await Linking.canOpenURL(privacyPolicyURL);
                if (supported) {
                  await Linking.openURL(privacyPolicyURL);
                }
              }}
            >
              <XStack alignItems="center" py={isPhoneDevice ? "$4" : "$6"}>
                <Image
                  key={"privacyPolicy"}
                  source={images.privacyPolicy}
                  style={{
                    height: iconSize,
                    width: iconSize,
                    tintColor: "#AA151B",
                  }}
                  alt={"privacyPolicy"}
                />
                <YStack w={isPhoneDevice ? "$2" : "$3"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                  lineHeight={isPhoneDevice ? 22 : 34}
                  color={"$secondPrimaryColor"}
                  fontWeight={"700"}
                >
                  Privacy Policy
                </SizableText>
              </XStack>
            </TouchableScale>

            <TouchableScale
              onPress={() => {
                shareMyApp();
              }}
            >
              <XStack alignItems="center" py={isPhoneDevice ? "$4" : "$6"}>
                <Image
                  key={"share"}
                  source={images.share}
                  style={{
                    height: iconSize,
                    width: iconSize,
                    tintColor: "#AA151B",
                  }}
                  alt={"share"}
                />
                <YStack w={isPhoneDevice ? "$2" : "$3"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                  lineHeight={isPhoneDevice ? 22 : 34}
                  color={"$secondPrimaryColor"}
                  fontWeight={"700"}
                >
                  Share Game
                </SizableText>
              </XStack>
            </TouchableScale>

            <TouchableScale
              onPress={() => {
                rateMyApp();
              }}
            >
              <XStack alignItems="center" py={isPhoneDevice ? "$4" : "$6"}>
                <Image
                  key={"rating"}
                  source={images.rating}
                  style={{
                    height: iconSize,
                    width: iconSize,
                    tintColor: "#AA151B",
                  }}
                  alt={"rating"}
                />
                <YStack w={isPhoneDevice ? "$2" : "$3"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                  lineHeight={isPhoneDevice ? 22 : 34}
                  color={"$secondPrimaryColor"}
                  fontWeight={"700"}
                >
                  Rate Us
                </SizableText>
              </XStack>
            </TouchableScale>

            <TouchableScale
              onPress={() => {
                Linking.openURL(`mailto:${supportEmail}`);
              }}
            >
              <XStack alignItems="center" py={isPhoneDevice ? "$4" : "$6"}>
                <Image
                  key={"contactUs"}
                  source={images.contactUs}
                  style={{
                    height: iconSize,
                    width: iconSize,
                    tintColor: "#AA151B",
                  }}
                  alt={"contactUs"}
                />
                <YStack w={isPhoneDevice ? "$2" : "$3"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                  lineHeight={isPhoneDevice ? 22 : 34}
                  color={"$secondPrimaryColor"}
                  fontWeight={"700"}
                >
                  Contact Us
                  <SizableText
                    fontSize={isPhoneDevice ? "$xs" : "$lg"}
                    lineHeight={isPhoneDevice ? 18 : 26}
                    color={"$thirdPrimaryColor"}
                    fontWeight={"$medium"}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {` (${supportEmail})`}
                  </SizableText>
                </SizableText>
              </XStack>
            </TouchableScale>

            <TouchableScale
              onPress={() => {
                router.push("./feedback");
              }}
            >
              <XStack alignItems="center" py={isPhoneDevice ? "$4" : "$6"}>
                <Image
                  key={"contactUs"}
                  source={images.feedback}
                  style={{
                    height: iconSize,
                    width: iconSize,
                    tintColor: "#AA151B",
                  }}
                  alt={"contactUs"}
                />
                <YStack w={"$2"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                  lineHeight={isPhoneDevice ? 22 : 34}
                  color={"$secondPrimaryColor"}
                  fontWeight={"700"}
                >
                  Send Feedback
                </SizableText>
              </XStack>
            </TouchableScale>
          </YStack>
        </ScrollView>

        <YStack flex={1} />
        <SizableText
          m={isPhoneDevice ? "$4" : "$6"}
          textAlign="center"
          fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
          lineHeight={isPhoneDevice ? 22 : 34}
          color={"$thirdPrimaryColor"}
          fontWeight={"700"}
        >
          {`Version: ${DeviceInfo.getBuildNumber()} (${DeviceInfo.getVersion()})`}
        </SizableText>
      </ResponsiveContent>
      <AdmobBanner />
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default SettingsScreen;
