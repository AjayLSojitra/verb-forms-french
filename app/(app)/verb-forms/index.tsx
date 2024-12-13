import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useFocusEffect, useGlobalSearchParams, useRouter } from "expo-router";
import images from "@assets/images/images";
import { Image, FlatList, Keyboard } from "react-native";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import {
  canShowAdmobInteratitial,
  staticInterstitialAd,
} from "@modules/shared/components/helpers";
import { useCallback, useEffect, useRef, useState } from "react";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import LocalStorage from "@utils/local-storage";
import {
  SOUND_KEY,
  WELCOME_SCREEN_REDIRECT_TO,
} from "@modules/shared/components/constants";
import { HIT_SLOP } from "@utils/theme";
import AdsNotifyDialog from "@modules/shared/components/confirmation-dialog/ads-notify-dialog";
import { verbs } from "@utils/helper";
import VerbItemCard from "./verb-item-card";
import { DeviceType, deviceType } from "expo-device";

function VerbFormsScreen() {
  const { type = undefined }: { type?: string } = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    __DEV__
      ? TestIds.INTERSTITIAL_VIDEO
      : global?.interstitialAd ?? staticInterstitialAd
  );
  const scrollViewRef = useRef<any>(null);
  const redirectTo = useRef<string>();

  const redirectToNextScreen = () => {
    const verb = redirectTo.current;
    if (verb) {
      if (type === WELCOME_SCREEN_REDIRECT_TO.VERB_FORMS) {
        router.push(`./verb-form-details?selectedVerb=${verb}`);
      } else if (type === WELCOME_SCREEN_REDIRECT_TO.VERB_EXAMPLES) {
        router.push(`./verb-examples?selectedVerb=${verb}`);
      }
    }
  };

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

      // Action after the ad is closed
      setShowAdsConfirmationPopup(false);
      redirectToNextScreenAfterAdmobInterstitial();
    }
  }, [isClosed]);

  const redirectToNextScreenAfterAdmobInterstitial = () => {
    redirectToNextScreen();
  };

  const isSoundEnabled = useRef(true);
  const [isSoundSwitchEnabled, setIsSoundSwitchEnabled] = useState(true);
  const toggleSound = () => (isSoundEnabled.current = !isSoundEnabled.current);
  const toggleSoundSwitch = () =>
    setIsSoundSwitchEnabled((previousState) => !previousState);
  useFocusEffect(
    useCallback(() => {
      LocalStorage.getItemDefault(SOUND_KEY).then((val) => {
        isSoundEnabled.current = val == null || val === "Yes";
        setIsSoundSwitchEnabled(val == null || val === "Yes");
      });
    }, [])
  );

  const [showAdsConfirmationPopup, setShowAdsConfirmationPopup] =
    useState(false);
  const showInterstitial = () => {
    setShowAdsConfirmationPopup(true);
    setTimeout(() => {
      show();
    }, 2000);
  };

  const keyExtractor = useCallback(
    (item, index) => (item?.item ?? "") + (index ?? 0),
    []
  );

  const renderItem = useCallback(
    (item) => {
      return (
        <VerbItemCard
          key={item?.item ?? ""}
          item={item?.item ?? ""}
          onPress={() => {
            redirectTo.current = item?.item ?? "";
            if (isLoaded && canShowAdmobInteratitial()) {
              showInterstitial();
            } else {
              // No advert ready to show yet
              redirectToNextScreenAfterAdmobInterstitial();
            }
          }}
        />
      );
    },
    [canShowAdmobInteratitial, isLoaded, type]
  );

  const renderSeparator = useCallback(() => {
    return <></>;
  }, []);

  const renderFooter = useCallback(() => {
    return <YStack h={"$6"} />;
  }, []);

  const renderEmptyState = useCallback(() => {
    return <></>;
  }, []);

  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        title=""
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
            {`${
              type === WELCOME_SCREEN_REDIRECT_TO.VERB_FORMS
                ? "Verbs Forms"
                : "Verb Examples"
            }`}
          </SizableText>
        }
        backgroundColor={"$primary"}
        rightElement={
          <XStack alignItems="center">
            <TouchableScale
              style={{
                paddingHorizontal: isPhoneDevice ? 4 : 6,
                paddingVertical: isPhoneDevice ? 4 : 6,
                backgroundColor: "#000091",
                borderRadius: isPhoneDevice ? 8 : 12,
              }}
              hitSlop={HIT_SLOP}
              onPress={() => {
                LocalStorage.setItemDefault(
                  SOUND_KEY,
                  isSoundEnabled.current ? "No" : "Yes",
                  () => {
                    redirectTo.current = "";
                    toggleSound();
                    toggleSoundSwitch();
                    if (isLoaded && canShowAdmobInteratitial()) {
                      showInterstitial();
                    }
                  }
                );
              }}
            >
              <YStack
                alignItems="center"
                justifyContent="center"
                height={isPhoneDevice ? 24 : 36}
                width={isPhoneDevice ? 24 : 36}
              >
                <Image
                  key={"sound"}
                  source={
                    isSoundSwitchEnabled ? images.soundOnWhite : images.soundOff
                  }
                  style={{
                    height: isPhoneDevice ? 24 : 36,
                    width: isPhoneDevice ? 24 : 36,
                    alignSelf: "center",
                  }}
                  alt={"sound"}
                />
              </YStack>
            </TouchableScale>
          </XStack>
        }
      />
      <ResponsiveContent flex={1}>
        <YStack alignItems="center" justifyContent="center">
          <AdsNotifyDialog
            showDialog={showAdsConfirmationPopup}
            content={`Ad is loading...`}
          />
        </YStack>
        <YStack
          flex={1}
          alignItems="center"
          justifyContent="center"
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <FlatList
            scrollEnabled={true}
            ref={scrollViewRef}
            horizontal={false}
            keyboardShouldPersistTaps={"handled"}
            numColumns={100}
            initialNumToRender={30}
            columnWrapperStyle={{ flexWrap: "wrap", flex: 1 }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={renderSeparator}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmptyState}
            data={verbs}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </YStack>
      </ResponsiveContent>
      <AdmobBanner />
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default VerbFormsScreen;
