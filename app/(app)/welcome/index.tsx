import { XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackHandler, Image } from "react-native";
import images from "@assets/images/images";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import ResponsiveContent from "@modules/shared/components/responsive-content";
import ErrorBoundary from "@modules/shared/components/error-boundary";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { HIT_SLOP } from "@utils/theme";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import {
  canShowAdmobInteratitial,
  rateMyApp,
  shareMyApp,
  staticInterstitialAd,
} from "@modules/shared/components/helpers";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import InAppReview from "react-native-in-app-review";
import { OneSignal } from "react-native-onesignal";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import { WELCOME_SCREEN_REDIRECT_TO } from "@modules/shared/components/constants";
import { useConfirmationDialog } from "@modules/shared/atoms/confirmation-dialog-atom";
import AdsNotifyDialog from "@modules/shared/components/confirmation-dialog/ads-notify-dialog";
import WelcomeItemCard from "./welcome-item-card";
import { DeviceType, deviceType } from "expo-device";

function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    __DEV__
      ? TestIds.INTERSTITIAL_VIDEO
      : global?.interstitialAd ?? staticInterstitialAd
  );
  const redirectTo = useRef<WELCOME_SCREEN_REDIRECT_TO>();
  const responsiveWidth = useResponsiveWidth();
  const isPhoneDevice = deviceType === DeviceType.PHONE;
  const welcomeItems: {
    title: string;
    id: string;
    redirectTo: WELCOME_SCREEN_REDIRECT_TO;
  }[] = [
    {
      id: "0",
      title: "Verb Forms",
      redirectTo: WELCOME_SCREEN_REDIRECT_TO.VERB_FORMS,
    },
    {
      id: "1",
      title: "Prepositions",
      redirectTo: WELCOME_SCREEN_REDIRECT_TO.PREPOSITIONS,
    },
    {
      id: "2",
      title: "Verb Examples",
      redirectTo: WELCOME_SCREEN_REDIRECT_TO.VERB_EXAMPLES,
    },
    {
      id: "3",
      title: "Common Contractions",
      redirectTo: WELCOME_SCREEN_REDIRECT_TO.COMMON_CONTRACTIONS,
    },
  ];

  useEffect(() => {
    OneSignal.Notifications.requestPermission(true);
  }, []);

  useEffect(() => {
    if (global?.show_review_popup) {
      if (InAppReview.isAvailable()) {
        InAppReview.RequestInAppReview()
          .then((hasFlowFinishedSuccessfully) => {
            if (hasFlowFinishedSuccessfully) {
              // do something for ios
              // do something for android
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, []);

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
    if (redirectTo.current === WELCOME_SCREEN_REDIRECT_TO.VERB_FORMS) {
      router.push(`./verb-forms?type=${WELCOME_SCREEN_REDIRECT_TO.VERB_FORMS}`);
    }

    if (redirectTo.current === WELCOME_SCREEN_REDIRECT_TO.BASICS_OF_FRENCH) {
      router.push("./tutorials?isFromSettings=False");
    }

    if (redirectTo.current === WELCOME_SCREEN_REDIRECT_TO.VERB_EXAMPLES) {
      router.push(
        `./verb-forms?type=${WELCOME_SCREEN_REDIRECT_TO.VERB_EXAMPLES}`
      );
    }

    if (redirectTo.current === WELCOME_SCREEN_REDIRECT_TO.COMMON_CONTRACTIONS) {
      router.push("./common-contractions");
    }

    if (redirectTo.current === WELCOME_SCREEN_REDIRECT_TO.PREPOSITIONS) {
      router.push("./prepositions");
    }

    if (redirectTo.current === WELCOME_SCREEN_REDIRECT_TO.SETTING_SCREEN) {
      router.push("./settings");
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (!isRatingPopupViewed.current) {
          isRatingPopupViewed.current = true;
          goBack();
        } else {
          return false;
        }
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  const isRatingPopupViewed = useRef(false);
  const confirmationDialog = useConfirmationDialog();
  const goBack = useCallback(() => {
    confirmationDialog.open({
      title: "Share your valuable experience!",
      description:
        "We'd love to hear from you! Share your valuable experiences with us and help us improve. Your insights and feedback are greatly appreciated.",
      buttons: [
        {
          buttonType: "Secondary",
          children: "Not now",
          onPress() {
            try {
              BackHandler.exitApp();
            } catch {}
          },
        },
        {
          buttonType: "Primary",
          danger: false,
          onPress: () => {
            setTimeout(() => {
              rateMyApp();
            }, 500);
          },
          children: "Rate Us",
        },
      ],
      icon: (
        <YStack bg={"$black"} borderRadius={16} p={5}>
          <Image
            style={{
              width: isPhoneDevice ? 64 : 96,
              height: isPhoneDevice ? 64 : 96,
              resizeMode: "contain",
              tintColor: "#000091",
            }}
            source={images.fiveStarRating}
          />
        </YStack>
      ),
    });
  }, []);

  const [showAdsConfirmationPopup, setShowAdsConfirmationPopup] =
    useState(false);
  const showInterstitial = () => {
    setShowAdsConfirmationPopup(true);
    setTimeout(() => {
      show();
    }, 2000);
  };

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        backgroundColor={"$primary"}
        back={false}
        customTitle={
          <XStack width={responsiveWidth / 2 - (isPhoneDevice ? 58 : 70)}>
            <TouchableScale
              style={{
                paddingHorizontal: isPhoneDevice ? 8 : 12,
                paddingVertical: isPhoneDevice ? 8 : 12,
                backgroundColor: "#000091",
                borderRadius: isPhoneDevice ? 12 : 18,
              }}
              hitSlop={HIT_SLOP}
              onPress={() => {
                shareMyApp();
              }}
            >
              <YStack
                alignItems="center"
                justifyContent="center"
                height={isPhoneDevice ? 24 : 36}
                width={isPhoneDevice ? 24 : 36}
              >
                <Image
                  key={"share"}
                  source={images.share}
                  style={{
                    height: isPhoneDevice ? 20 : 30,
                    width: isPhoneDevice ? 20 : 30,
                    alignSelf: "center",
                    tintColor: "#FFFFFF",
                  }}
                  alt={"share"}
                />
              </YStack>
            </TouchableScale>
            <YStack flex={1} />
            <TouchableScale
              style={{
                paddingHorizontal: isPhoneDevice ? 8 : 12,
                paddingVertical: isPhoneDevice ? 8 : 12,
                backgroundColor: "#000091",
                borderRadius: isPhoneDevice ? 8 : 12,
              }}
              hitSlop={HIT_SLOP}
              onPress={() => {
                redirectTo.current = WELCOME_SCREEN_REDIRECT_TO.SETTING_SCREEN;
                if (isLoaded && canShowAdmobInteratitial()) {
                  showInterstitial();
                } else {
                  // No advert ready to show yet
                  redirectToNextScreenAfterAdmobInterstitial();
                }
              }}
            >
              <Image
                key={"settings"}
                source={images.settings}
                style={{
                  height: isPhoneDevice ? 24 : 36,
                  width: isPhoneDevice ? 24 : 36,
                  alignSelf: "center",
                  tintColor: "#FFFFFF",
                }}
                alt={"settings"}
              />
            </TouchableScale>
          </XStack>
        }
        rightElement={
          <XStack>
            <TouchableScale
              style={{
                paddingHorizontal: isPhoneDevice ? 8 : 12,
                paddingVertical: isPhoneDevice ? 8 : 12,
                backgroundColor: "#000091",
                borderRadius: isPhoneDevice ? 8 : 12,
              }}
              hitSlop={HIT_SLOP}
              onPress={() => {
                redirectTo.current =
                  WELCOME_SCREEN_REDIRECT_TO.BASICS_OF_FRENCH;
                if (isLoaded && canShowAdmobInteratitial()) {
                  showInterstitial();
                } else {
                  // No advert ready to show yet
                  redirectToNextScreenAfterAdmobInterstitial();
                }
              }}
            >
              <Image
                key={"help"}
                source={images.help}
                style={{
                  height: isPhoneDevice ? 24 : 36,
                  width: isPhoneDevice ? 24 : 36,
                  alignSelf: "center",
                  tintColor: "#FFFFFF",
                }}
                alt={"help"}
              />
            </TouchableScale>
            <YStack w={isPhoneDevice ? "$3" : "$5"} />
          </XStack>
        }
        leftElement={
          <XStack>
            <YStack w={isPhoneDevice ? "$6" : "$9"} />
            <TouchableScale
              style={{
                paddingHorizontal: isPhoneDevice ? 8 : 12,
                paddingVertical: isPhoneDevice ? 8 : 12,
                backgroundColor: "#000091",
                borderRadius: isPhoneDevice ? 12 : 18,
              }}
              hitSlop={HIT_SLOP}
              onPress={() => {
                rateMyApp();
              }}
            >
              <YStack
                alignItems="center"
                justifyContent="center"
                height={isPhoneDevice ? 24 : 36}
                width={isPhoneDevice ? 24 : 36}
              >
                <Image
                  key={"rating"}
                  source={images.rating}
                  style={{
                    height: isPhoneDevice ? 24 : 36,
                    width: isPhoneDevice ? 24 : 36,
                    alignSelf: "center",
                    tintColor: "#FFFFFF",
                  }}
                  alt={"rating"}
                />
              </YStack>
            </TouchableScale>
          </XStack>
        }
      />

      <ResponsiveContent flex={1} backgroundColor={"$primary"}>
        <YStack alignItems="center" justifyContent="center">
          <AdsNotifyDialog
            showDialog={showAdsConfirmationPopup}
            content={`Ad is loading...`}
          />
        </YStack>
        <YStack flex={1} justifyContent="center">
          <Image
            key={"icon"}
            source={images.icon}
            style={{
              height: isPhoneDevice ? 144 : 216,
              width: isPhoneDevice ? 144 : 216,
              alignSelf: "center",
              resizeMode: "center",
              borderRadius: 12,
            }}
            alt={"icon"}
          />
        </YStack>
        <YStack mb={isPhoneDevice ? "$4" : "$6"}>
          <XStack
            mr={isPhoneDevice ? 24 : 36}
            alignItems="center"
            width={responsiveWidth}
            flexWrap="wrap"
          >
            {welcomeItems.map((item) => (
              <WelcomeItemCard
                key={item?.id ?? ""}
                item={item}
                onPress={() => {
                  redirectTo.current = item.redirectTo;
                  if (isLoaded && canShowAdmobInteratitial()) {
                    showInterstitial();
                  } else {
                    // No advert ready to show yet
                    redirectToNextScreenAfterAdmobInterstitial();
                  }
                }}
              />
            ))}
          </XStack>
        </YStack>
      </ResponsiveContent>

      {global?.showAds && (
        <YStack justifyContent="flex-end">
          <AdmobBanner />
        </YStack>
      )}
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default () => (
  <ErrorBoundary>
    <WelcomeScreen />
  </ErrorBoundary>
);
