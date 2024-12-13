import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useFocusEffect, useGlobalSearchParams } from "expo-router";
import images from "@assets/images/images";
import { Image, FlatList, useWindowDimensions } from "react-native";
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
  SOUND_KEY,
  VERB_FORMS_KEY,
} from "@modules/shared/components/constants";
import { HIT_SLOP } from "@utils/theme";
import AdsNotifyDialog from "@modules/shared/components/confirmation-dialog/ads-notify-dialog";
import VerbFormDetailsItemCard from "./verb-form-details-item-card";
import AppAnimation from "@modules/shared/suspense-loader/app-animation";
import EmptyStateNormal from "@design-system/components/shared/empty-state-normal";
import { deviceType, DeviceType } from "expo-device";

function VerbFormDetailsScreen() {
  const { selectedVerb = undefined }: { selectedVerb?: string } =
    useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    __DEV__
      ? TestIds.INTERSTITIAL_VIDEO
      : global?.interstitialAd ?? staticInterstitialAd
  );
  const scrollViewRef = useRef<any>(null);
  const { width } = useWindowDimensions();
  const soundPlayTo = useRef<string>("");
  const [verbItems, setVerbItems] = useState<
    {
      id: string;
      verb: string;
      v1: string;
      v2: string;
      v3: string;
      v4: string;
      english_meaning: string;
    }[]
  >(undefined);

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
      playSelectedVerbAfterAdmobInterstitial();
    }
  }, [isClosed]);

  useEffect(() => {
    LocalStorage.getItemDefault(VERB_FORMS_KEY).then((val) => {
      let ruffStoredContents = val ? JSON.parse(val) : [];
      const storedContents =
        ruffStoredContents?.filter(
          ({ verb }) =>
            (verb ?? "").toLowerCase() === (selectedVerb ?? "").toLowerCase() ||
            (selectedVerb ?? "").toLowerCase() === "all"
        ) ?? [];
      setVerbItems(storedContents);
    });
  }, []);

  const playSelectedVerbAfterAdmobInterstitial = () => {
    if (soundPlayTo.current) {
      speakWord(soundPlayTo.current);
    }
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
        <VerbFormDetailsItemCard
          key={item?.item?.id ?? ""}
          item={item?.item}
          onPress={(content) => {
            if (isSoundEnabled.current) {
              soundPlayTo.current = content;
              if (isLoaded && canShowAdmobInteratitial()) {
                showInterstitial();
              } else {
                // No advert ready to show yet
                playSelectedVerbAfterAdmobInterstitial();
              }
            }
          }}
        />
      );
    },
    [isSoundEnabled.current, canShowAdmobInteratitial, isLoaded]
  );

  const renderSeparator = useCallback(() => {
    return <></>;
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <YStack width={width} flex={1}>
        <YStack width={width} h={0.5} bg={"$black"} />
        <XStack width={width} flex={1} bg={"$secondPrimaryColor"}>
          <YStack w={0.5} bg={"$black"} />
          <HeaderItem content={"V1"} />
          <YStack w={0.5} bg={"$black"} />
          <HeaderItem content={`English Meaning`} />
          <YStack w={0.5} bg={"$black"} />
          <HeaderItem content={"V2"} />
          <YStack w={0.5} bg={"$black"} />
          <HeaderItem content={"V3"} />
          <YStack w={0.5} bg={"$black"} />
          <HeaderItem content={"V4"} />
          <YStack w={0.5} bg={"$black"} />
        </XStack>
      </YStack>
    );
  }, []);

  const renderFooter = useCallback(() => {
    return (
      <>
        {verbItems?.length > 0 && <YStack h={0.5} bg={"$black"} />}
        <YStack h={isPhoneDevice ? "$6" : "$9"} />
      </>
    );
  }, [verbItems?.length]);

  const renderEmptyState = useCallback(() => {
    return (
      <YStack>
        <YStack h={0.5} bg={"$black"} />
        <EmptyStateNormal title="Verb forms not found!" />
      </YStack>
    );
  }, []);

  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        title="Verbs Forms"
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
            {`Verb - (${selectedVerb})`}
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
      <YStack flex={1}>
        <YStack alignItems="center" justifyContent="center">
          <AdsNotifyDialog
            showDialog={showAdsConfirmationPopup}
            content={`Ad is loading...`}
          />
        </YStack>
        <YStack flex={1} alignItems="center" justifyContent="center">
          {verbItems !== undefined ? (
            <FlatList
              ref={scrollViewRef}
              keyboardShouldPersistTaps={"handled"}
              showsVerticalScrollIndicator={false}
              stickyHeaderIndices={[0]}
              ItemSeparatorComponent={renderSeparator}
              ListHeaderComponent={renderHeader}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={renderEmptyState}
              data={verbItems}
              initialNumToRender={20}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          ) : (
            <AppAnimation size={isPhoneDevice ? 100 : 150} />
          )}
        </YStack>
      </YStack>
      <AdmobBanner />
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default VerbFormDetailsScreen;

export function HeaderItem(
  props: Readonly<{
    content: string;
  }>
) {
  const { content } = props;
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack
      py={isPhoneDevice ? "$2" : "$3"}
      px={isPhoneDevice ? 4 : 6}
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <SizableText
        fontSize={isPhoneDevice ? "$sm" : "$2xl"}
        lineHeight={isPhoneDevice ? 18 : 34}
        color={"$white"}
        fontWeight={"$semibold"}
        textAlign="center"
        adjustsFontSizeToFit
        numberOfLines={2}
      >
        {content}
      </SizableText>
      <YStack h={"$1"} />
      <Image
        key={"soundOnWhite"}
        source={images.soundOnWhite}
        style={{
          height: isPhoneDevice ? 14 : 21,
          width: isPhoneDevice ? 14 : 21,
          tintColor: "#ffffff",
          alignSelf: "center",
        }}
        alt={"soundOnWhite"}
      />
    </YStack>
  );
}
