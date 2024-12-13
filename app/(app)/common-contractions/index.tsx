import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useFocusEffect } from "expo-router";
import images from "@assets/images/images";
import { Image, FlatList, Keyboard } from "react-native";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import {
  canShowAdmobInteratitial,
  speakWord,
  staticInterstitialAd,
} from "@modules/shared/components/helpers";
import { useCallback, useEffect, useRef, useState } from "react";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import LocalStorage from "@utils/local-storage";
import {
  COMMON_CONTRACTIONS_KEY,
  SOUND_KEY,
} from "@modules/shared/components/constants";
import { HIT_SLOP } from "@utils/theme";
import AdsNotifyDialog from "@modules/shared/components/confirmation-dialog/ads-notify-dialog";
import AppAnimation from "@modules/shared/suspense-loader/app-animation";
import EmptyStateNormal from "@design-system/components/shared/empty-state-normal";
import ContractionsItemCard from "./contractions-item-card";
import { DeviceType, deviceType } from "expo-device";

function CommonContractionScreen() {
  const insets = useSafeAreaInsets();
  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    __DEV__
      ? TestIds.INTERSTITIAL_VIDEO
      : global?.interstitialAd ?? staticInterstitialAd
  );
  const isPhoneDevice = deviceType === DeviceType.PHONE;
  const soundPlayTo = useRef<string>("");
  const [commonContractionItems, setCommonContractionsItems] = useState<
    {
      id: string;
      preposition: string;
      prepositionEnglish: string;
      article: string;
      articleEnglish: string;
      contraction: string;
      contractionEnglish: string;
      exampleSentence: string;
    }[]
  >(undefined);

  const playSelectedContractionAfterAdmobInterstitial = () => {
    if (soundPlayTo.current) {
      speakWord(soundPlayTo.current);
    }
  };

  useEffect(() => {
    LocalStorage.getItemDefault(COMMON_CONTRACTIONS_KEY).then((val) => {
      let ruffStoredContents = val ? JSON.parse(val) : [];
      const storedContents = ruffStoredContents ?? [];
      setCommonContractionsItems(storedContents);
    });
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
    playSelectedContractionAfterAdmobInterstitial();
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
    (item, index) => (item?.item?.id ?? "") + (index ?? 0),
    []
  );

  const renderItem = useCallback(
    (item) => {
      return (
        <ContractionsItemCard
          key={item?.item?.id ?? ""}
          item={
            item?.item ?? {
              id: "",
              preposition: "",
              prepositio_english: "",
              article: "",
              article_english: "",
              contraction: "",
              contraction_english: "",
              exampleSentence: "",
            }
          }
          onPress={(content: string) => {
            if (isSoundEnabled.current) {
              soundPlayTo.current = content;
              if (isLoaded && canShowAdmobInteratitial()) {
                showInterstitial();
              } else {
                // No advert ready to show yet
                redirectToNextScreenAfterAdmobInterstitial();
              }
            }
          }}
        />
      );
    },
    [isSoundEnabled.current, canShowAdmobInteratitial, isLoaded]
  );

  const renderSeparator = useCallback(() => {
    return <YStack h={isPhoneDevice ? "$3" : "$5"} />;
  }, []);

  const renderFooter = useCallback(() => {
    return <YStack h={isPhoneDevice ? "$6" : "$9"} />;
  }, []);

  const renderEmptyState = useCallback(() => {
    return <EmptyStateNormal title="Contractions not found!" />;
  }, []);

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        title=""
        customTitle={
          <SizableText
            fontSize={isPhoneDevice ? "$hmd" : "$hlg"}
            lineHeight={isPhoneDevice ? 32 : 48}
            color={"$secondPrimaryColor"}
            fontWeight={"700"}
            textAlign="center"
            rotateY={"15deg"}
            textShadowOffset={{ width: 0, height: 4 }}
            textShadowColor={"$thirdPrimaryColor"}
            textShadowRadius={8}
            numberOfLines={1}
          >
            {`Common Contractions`}
          </SizableText>
        }
        backgroundColor={"$primary"}
        rightElement={
          <XStack alignItems="center">
            <TouchableScale
              style={{
                paddingHorizontal: isPhoneDevice ? 4 : 6,
                paddingVertical: isPhoneDevice ? 4 : 6,
                backgroundColor: "#AA151B",
                borderRadius: isPhoneDevice ? 8 : 12,
              }}
              hitSlop={HIT_SLOP}
              onPress={() => {
                LocalStorage.setItemDefault(
                  SOUND_KEY,
                  isSoundEnabled.current ? "No" : "Yes",
                  () => {
                    toggleSound();
                    toggleSoundSwitch();
                    if (isLoaded && canShowAdmobInteratitial()) {
                      soundPlayTo.current = "";
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
          justifyContent="center"
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          {commonContractionItems !== undefined ? (
            <FlatList
              keyboardShouldPersistTaps={"handled"}
              initialNumToRender={20}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={renderSeparator}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={renderEmptyState}
              data={commonContractionItems}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          ) : (
            <AppAnimation size={isPhoneDevice ? 100 : 150} />
          )}
        </YStack>
      </ResponsiveContent>
      <AdmobBanner />
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default CommonContractionScreen;
