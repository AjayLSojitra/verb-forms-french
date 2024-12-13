import ScrollHeader from "@design-system/components/navigation/scroll-header";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import { deviceType, DeviceType } from "expo-device";
import { useFocusEffect, useGlobalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SizableText, XStack, YStack } from "tamagui";
import images from "@assets/images/images";
import {
  alphabetsHeaders,
  alphabetsSubItems,
  basicNeedWordsHeaders,
  basicNeedWordsSubItems,
  basicQuestionsHeaders,
  basicQuestionsSubItems,
  numbersHeaders,
  numbersSubItems,
  phrasesHeaders,
  phrasesSubItems,
  frenchVerbsHeaders,
  frenchVerbsSubItems,
} from "@utils/helper";
import TableWrapper from "./table-wrapper";
import LocalStorage from "@utils/local-storage";
import { SOUND_KEY } from "@modules/shared/components/constants";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import {
  canShowAdmobInteratitial,
  speakWord,
  staticInterstitialAd,
} from "@modules/shared/components/helpers";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { HIT_SLOP } from "@utils/theme";
import AdsNotifyDialog from "@modules/shared/components/confirmation-dialog/ads-notify-dialog";
import AppAnimation from "@modules/shared/suspense-loader/app-animation";

export default function TutorialsScreen() {
  const { isFromSettings = "No" }: { isFromSettings?: string } =
    useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const isPhoneDevice = deviceType === DeviceType.PHONE;
  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    __DEV__
      ? TestIds.INTERSTITIAL_VIDEO
      : global?.interstitialAd ?? staticInterstitialAd
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

      // Action after the ad is closed
      setShowAdsConfirmationPopup(false);
      playSelectedVerbAfterAdmobInterstitial();
    }
  }, [isClosed]);

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
  const soundPlayTo = useRef<string>("");

  const playSelectedVerbAfterAdmobInterstitial = () => {
    if (soundPlayTo.current) {
      speakWord(soundPlayTo.current);
    }
  };

  const [showAdsConfirmationPopup, setShowAdsConfirmationPopup] =
    useState(false);
  const showInterstitial = () => {
    setShowAdsConfirmationPopup(true);
    setTimeout(() => {
      show();
    }, 2000);
  };

  const headerItem = (text: string) => {
    return (
      <SizableText
        mx={isPhoneDevice ? "$2" : "$3"}
        fontSize={isPhoneDevice ? "$md" : "$2xl"}
        lineHeight={isPhoneDevice ? 24 : 34}
        color={"$thirdPrimaryColor"}
        fontWeight={"$semibold"}
        adjustsFontSizeToFit
      >
        {text}
      </SizableText>
    );
  };

  const subItem = (text: string) => {
    return (
      <SizableText
        mx={isPhoneDevice ? "$2" : "$3"}
        fontSize={isPhoneDevice ? "$xs" : "$xl"}
        lineHeight={isPhoneDevice ? 18 : 30}
        color={"$black"}
        fontWeight={"$medium"}
        adjustsFontSizeToFit
      >
        {text}
      </SizableText>
    );
  };

  const [loadAllData, setLoadAllData] = useState(false);
  useEffect(() => {
    if (!loadAllData) {
      setLoadAllData(true);
    }
  }, [loadAllData]);

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        title=""
        customTitle={
          <SizableText
            fontSize={isPhoneDevice ? "$2xl" : "$4xl"}
            lineHeight={isPhoneDevice ? 24 : 50}
            color={"$secondPrimaryColor"}
            fontWeight={"700"}
            textAlign="center"
            rotateY={"15deg"}
            textShadowOffset={{ width: 0, height: 4 }}
            textShadowColor={"$thirdPrimaryColor"}
            textShadowRadius={8}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {`Basics of French Language`}
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
      <YStack flex={1}>
        <YStack alignItems="center" justifyContent="center">
          <AdsNotifyDialog
            showDialog={showAdsConfirmationPopup}
            content={`Ad is loading...`}
          />
        </YStack>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <YStack my={isPhoneDevice ? "$4" : "$6"} justifyContent="center">
            {headerItem(`Alphabets in French Language`)}
            <YStack h={isPhoneDevice ? "$1" : "$1.5"} />
            {subItem(
              `There are 27 alphabets in the French Language and each of them has a distinct pronunciation. The following French alphabets have been given along with their pronunciations in English for a better understanding:`
            )}
            <YStack h={isPhoneDevice ? "$3" : "$4"} />
            <TableWrapper
              headerArray={alphabetsHeaders}
              subItemsArray={alphabetsSubItems}
              onPress={(content: string) => {
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
            <YStack h={isPhoneDevice ? "$3" : "$4"} />
            {subItem(
              `The ‘H’ is silent in French language, so Hola is not /hola:/ it is /ola/. There are other alphabets too which will vary with the pronunciations if used before certain words. `
            )}

            {loadAllData ? (
              <YStack>
                <YStack h={isPhoneDevice ? "$6" : "$9"} />
                {headerItem(`Numbers in French Language`)}
                <YStack h={isPhoneDevice ? "$1" : "$1.5"} />
                {subItem(
                  `The numbers in French language are very different from English numbers. There is no resemblance in pronunciations whatsoever. Here is 1-10 in French:`
                )}
                <YStack h={isPhoneDevice ? "$3" : "$4"} />
                <TableWrapper
                  headerArray={numbersHeaders}
                  subItemsArray={numbersSubItems}
                  onPress={(content: string) => {
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

                <YStack h={isPhoneDevice ? "$6" : "$9"} />
                {headerItem(`Greetings & Introductions in French to English`)}
                <YStack h={isPhoneDevice ? "$1" : "$1.5"} />
                {subItem(
                  `Hola! But don’t know beyond this to strike a conversation? Here’s a list of greetings and introductions in French with English meanings:`
                )}
                <YStack h={isPhoneDevice ? "$3" : "$4"} />
                <TableWrapper
                  headerArray={phrasesHeaders}
                  subItemsArray={phrasesSubItems}
                  onPress={(content: string) => {
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

                <YStack h={isPhoneDevice ? "$6" : "$9"} />
                {headerItem(`Top 10 Basic French Verbs`)}
                <YStack h={isPhoneDevice ? "$1" : "$1.5"} />
                {subItem(
                  `Any language is incomplete without its verbs. There are 50+ verbs in French language, but we have summarised commonly used 10 French verbs with English meanings for students in the table below:`
                )}
                <YStack h={isPhoneDevice ? "$3" : "$4"} />
                <TableWrapper
                  headerArray={frenchVerbsHeaders}
                  subItemsArray={frenchVerbsSubItems}
                  onPress={(content: string) => {
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

                <YStack h={isPhoneDevice ? "$6" : "$9"} />
                {headerItem(`Basic Need Words in French to English`)}
                <YStack h={isPhoneDevice ? "$1" : "$1.5"} />
                {subItem(
                  `While students get around Spain, they may need to use these words in French. Check out the basic need words in French to English in the following table:`
                )}
                <YStack h={isPhoneDevice ? "$3" : "$4"} />
                <TableWrapper
                  headerArray={basicNeedWordsHeaders}
                  subItemsArray={basicNeedWordsSubItems}
                  onPress={(content: string) => {
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

                <YStack h={isPhoneDevice ? "$6" : "$9"} />
                {headerItem(`Questions in French Language`)}
                <YStack h={isPhoneDevice ? "$1" : "$1.5"} />
                {subItem(
                  `Just like any other language, French also has a set of questions that are asked. Students who are going to study in Spain will ask a lot of questions and here’s how they can do it:`
                )}
                <YStack h={isPhoneDevice ? "$3" : "$4"} />
                <TableWrapper
                  headerArray={basicQuestionsHeaders}
                  subItemsArray={basicQuestionsSubItems}
                  onPress={(content: string) => {
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
                <YStack h={isPhoneDevice ? "$3" : "$4"} />
                {subItem(
                  `These are 21 questions that are typically asked in Spain and can be useful for Indian students to note. Some of the most common French words have also been mentioned above, along with translations. Students who are able to follow basic words in French with English translation can easily use the French language daily. 

Thus, with the help of these words in French language, students who are non-French speakers will be able to get around Spain with ease. However, it is still better to learn the language and try to be fluent so that you don’t face issues because of the language barrier.`
                )}
              </YStack>
            ) : (
              <YStack my={isPhoneDevice ? "$4" : "$6"}>
                <AppAnimation size={isPhoneDevice ? 24 : 48} />
              </YStack>
            )}
          </YStack>
        </ScrollView>
      </YStack>
      <AdmobBanner />
      <YStack h={insets.bottom} />
    </YStack>
  );
}
