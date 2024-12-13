import { SizableText, YStack } from "tamagui";
import { Image, Platform } from "react-native";
import images from "@assets/images/images";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import ErrorBoundary from "@modules/shared/components/error-boundary";
import {
  staticAPPLE_STORE_ID,
  staticAndroidPackageName,
  staticAppOpenAd,
  staticAppStoreLink,
  staticBannerAd,
  staticInterstitialAd,
  staticInterstitialAdIntervalClicks,
  staticInterstitialAdIntervalSeconds,
  staticPoweredBy,
  staticPrivacyPolicy,
  staticRewardAd,
  staticSupportEmail,
} from "@modules/shared/components/helpers";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  signInAnonymously,
  getReactNativePersistence,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  getDocs,
  Firestore,
  orderBy,
} from "firebase/firestore";
import { AppManifest } from "../../app-manifest";
import LocalStorage from "@utils/local-storage";
import {
  VERB_FORMS_KEY,
  LAST_SYNCED_AT_KEY,
  VERB_EXAMPLES_KEY,
  PREPOSITIONS_LIST_KEY,
  PREPOSITIONS_KEY,
  COMMON_CONTRACTIONS_KEY,
} from "@modules/shared/components/constants";
import contents from "@assets/contents/contents";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { DeviceType, deviceType } from "expo-device";

function SplashScreen() {
  const router = useRouter();
  const isRedirectedToNextScreen = useRef<boolean>(false);

  function fetchStaticVerbFormsOnFallback() {
    LocalStorage.setItemDefault(
      VERB_FORMS_KEY,
      JSON.stringify(contents.verbForms),
      () => {}
    );
  }

  function fetchStaticVerbExamplesOnFallback() {
    LocalStorage.setItemDefault(
      VERB_EXAMPLES_KEY,
      JSON.stringify(contents.verbExamples),
      () => {}
    );
  }

  function fetchStaticPrepositionsListOnFallback() {
    LocalStorage.setItemDefault(
      PREPOSITIONS_LIST_KEY,
      JSON.stringify(contents.prepositionsList),
      () => {}
    );
  }

  function fetchStaticPrepositionsOnFallback() {
    LocalStorage.setItemDefault(
      PREPOSITIONS_KEY,
      JSON.stringify(contents.prepositions),
      () => {}
    );
  }

  function fetchStaticCommonContractionsOnFallback() {
    LocalStorage.setItemDefault(
      COMMON_CONTRACTIONS_KEY,
      JSON.stringify(contents.commonContractions),
      () => {}
    );
  }

  function fetchContents(db: Firestore, forceUpdateData: boolean) {
    //FOR VERB FORMS
    LocalStorage.getItemDefault(VERB_FORMS_KEY).then(async (val) => {
      if (!val || JSON.parse(val ?? "[]").length <= 0 || forceUpdateData) {
        const qVerbForms = query(collection(db, "verb_forms"), orderBy("verb"));
        let verbFormItems = [];
        try {
          const verbFormsQuerySnapshot = await getDocs(qVerbForms);
          verbFormsQuerySnapshot?.forEach((doc) => {
            const vDoc = doc?.data() ?? {};
            const verb = vDoc["verb"];
            const v1 = vDoc["v1"];
            const v2 = vDoc["v2"];
            const v3 = vDoc["v3"];
            const v4 = vDoc["v4"];
            const english_meaning = vDoc["english_meaning"];
            const type = vDoc["type"];
            const vId = doc?.id ?? "";

            verbFormItems.push({
              verb: verb,
              v1: v1,
              v2: v2,
              v3: v3,
              v4: v4,
              english_meaning: english_meaning,
              id: vId,
              type: type,
            });
          });
          LocalStorage.setItemDefault(
            VERB_FORMS_KEY,
            JSON.stringify(verbFormItems),
            () => {}
          );

          if ((verbFormsQuerySnapshot?.docs?.length ?? 0) <= 0) {
            if (!forceUpdateData) {
              //If Admin try to force to blank the data,then let it be. Otherwise we will set static fallback data!
              fetchStaticVerbFormsOnFallback();
            }
          }
        } catch (error) {
          console.error("Error fetching verb forms:", error);

          //Add custom contents after fallback, if it not by Admin!
          if (!forceUpdateData) {
            fetchStaticVerbFormsOnFallback();
          }
        }
      }
    });

    //FOR VERB EXAMPLES
    LocalStorage.getItemDefault(VERB_EXAMPLES_KEY).then(async (val) => {
      if (!val || JSON.parse(val ?? "[]").length <= 0 || forceUpdateData) {
        const qVerbExamples = query(
          collection(db, "verb_examples"),
          orderBy("verb")
        );
        let verbExampleItems = [];
        try {
          const verbExamplesQuerySnapshot = await getDocs(qVerbExamples);
          verbExamplesQuerySnapshot?.forEach((doc) => {
            const vDoc = doc?.data() ?? {};
            const verb = vDoc["verb"];
            const title = vDoc["title"];
            const example = vDoc["example"];
            const englishTitle = vDoc["english_title"];
            const englishExample = vDoc["english_example"];
            const vId = doc?.id ?? "";
            verbExampleItems.push({
              verb: verb,
              title: title,
              example: example,
              english_title: englishTitle,
              english_example: englishExample,
              id: vId,
            });
          });
          LocalStorage.setItemDefault(
            VERB_EXAMPLES_KEY,
            JSON.stringify(verbExampleItems),
            () => {}
          );

          if ((verbExamplesQuerySnapshot?.docs?.length ?? 0) <= 0) {
            if (!forceUpdateData) {
              //If Admin try to force to blank the data,then let it be. Otherwise we will set static fallback data!
              fetchStaticVerbExamplesOnFallback();
            }
          }
        } catch (error) {
          console.error("Error fetching verb examples:", error);

          //Add custom contents after fallback, if it not by Admin!
          if (!forceUpdateData) {
            fetchStaticVerbExamplesOnFallback();
          }
        }
      }
    });

    //FOR PREPOSITIONS LIST
    LocalStorage.getItemDefault(PREPOSITIONS_LIST_KEY).then(async (val) => {
      if (!val || JSON.parse(val ?? "[]").length <= 0 || forceUpdateData) {
        const qVerbPrepositions = query(
          collection(db, "prepositions_list"),
          orderBy("slug")
        );
        let prepositionsItems = [];
        try {
          const verbPrepositionsQuerySnapshot = await getDocs(
            qVerbPrepositions
          );
          verbPrepositionsQuerySnapshot?.forEach((doc) => {
            const vDoc = doc?.data() ?? {};
            const prepositionsName = vDoc["prepositionsName"];
            const slug = vDoc["slug"];
            const vId = doc?.id ?? "";
            prepositionsItems.push({
              prepositionsName: prepositionsName,
              slug: slug,
              id: vId,
            });
          });
          LocalStorage.setItemDefault(
            PREPOSITIONS_LIST_KEY,
            JSON.stringify(prepositionsItems),
            () => {}
          );

          if ((verbPrepositionsQuerySnapshot?.docs?.length ?? 0) <= 0) {
            if (!forceUpdateData) {
              //If Admin try to force to blank the data,then let it be. Otherwise we will set static fallback data!
              fetchStaticPrepositionsListOnFallback();
            }
          }
        } catch (error) {
          console.error("Error fetching prepositions list:", error);

          //Add custom contents after fallback, if it not by Admin!
          if (!forceUpdateData) {
            fetchStaticPrepositionsListOnFallback();
          }
        }
      }
    });

    //FOR PREPOSITIONS
    LocalStorage.getItemDefault(PREPOSITIONS_KEY).then(async (val) => {
      if (!val || JSON.parse(val ?? "[]").length <= 0 || forceUpdateData) {
        const qVerbPrepositions = query(
          collection(db, "prepositions"),
          orderBy("slug")
        );
        let prepositionsItems = [];
        try {
          const verbPrepositionsQuerySnapshot = await getDocs(
            qVerbPrepositions
          );
          verbPrepositionsQuerySnapshot?.forEach((doc) => {
            const vDoc = doc?.data() ?? {};
            const description = vDoc["description"];
            const example = vDoc["example"];
            const title = vDoc["title"];
            const slug = vDoc["slug"];
            const vId = doc?.id ?? "";
            prepositionsItems.push({
              description: description,
              example: example,
              title: title,
              slug: slug,
              id: vId,
            });
          });
          LocalStorage.setItemDefault(
            PREPOSITIONS_KEY,
            JSON.stringify(prepositionsItems),
            () => {}
          );

          if ((verbPrepositionsQuerySnapshot?.docs?.length ?? 0) <= 0) {
            if (!forceUpdateData) {
              //If Admin try to force to blank the data,then let it be. Otherwise we will set static fallback data!
              fetchStaticPrepositionsOnFallback();
            }
          }
        } catch (error) {
          console.error("Error fetching prepositions:", error);

          //Add custom contents after fallback, if it not by Admin!
          if (!forceUpdateData) {
            fetchStaticPrepositionsOnFallback();
          }
        }
      }
    });

    //FOR COMMON CONTRACTIONS
    LocalStorage.getItemDefault(COMMON_CONTRACTIONS_KEY).then(async (val) => {
      if (!val || JSON.parse(val ?? "[]").length <= 0 || forceUpdateData) {
        const qCommonContractions = query(
          collection(db, "common_contractions"),
          orderBy("contraction")
        );
        let commonContractionsItems = [];
        try {
          const commonContractionsQuerySnapshot = await getDocs(
            qCommonContractions
          );
          commonContractionsQuerySnapshot?.forEach((doc) => {
            const vDoc = doc?.data() ?? {};
            const preposition = vDoc["preposition"];
            const prepositionEnglish = vDoc["preposition_english"];
            const article = vDoc["article"];
            const articleEnglish = vDoc["article_english"];
            const contraction = vDoc["contraction"];
            const contractionEnglish = vDoc["contraction_english"];
            const exampleSentence = vDoc["exampleSentence"];
            const vId = doc?.id ?? "";
            commonContractionsItems.push({
              preposition: preposition,
              preposition_english: prepositionEnglish,
              article: article,
              article_english: articleEnglish,
              contraction: contraction,
              contraction_english: contractionEnglish,
              exampleSentence: exampleSentence,
              id: vId,
            });
          });
          LocalStorage.setItemDefault(
            COMMON_CONTRACTIONS_KEY,
            JSON.stringify(commonContractionsItems),
            () => {}
          );

          if ((commonContractionsQuerySnapshot?.docs?.length ?? 0) <= 0) {
            if (!forceUpdateData) {
              //If Admin try to force to blank the data,then let it be. Otherwise we will set static fallback data!
              fetchStaticCommonContractionsOnFallback();
            }
          }
        } catch (error) {
          console.error("Error fetching commonContractions:", error);

          //Add custom contents after fallback, if it not by Admin!
          if (!forceUpdateData) {
            fetchStaticCommonContractionsOnFallback();
          }
        }
      }
    });
  }

  function updateLastDataSyncDate(lastUpdatedAt) {
    LocalStorage.setItemDefault(
      LAST_SYNCED_AT_KEY,
      `${lastUpdatedAt.toMillis()}`,
      () => {}
    );
  }

  async function loadFirebaseApp() {
    // Initialize Firebase
    const firebaseConfig = AppManifest.extra.firebaseWeb;
    const app = initializeApp(firebaseConfig);

    //Authentication
    try {
      const auth = getAuth(app);
      await setPersistence(
        auth,
        getReactNativePersistence(ReactNativeAsyncStorage)
      );
      await signInAnonymously(auth);
    } catch (error) {
      console.log(error);
    }

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    fetchContents(db, false);

    //WARNING -------- FOR TEST ONLY -------- WARNING
    // fetchStaticPrepositionsListOnFallback();
    // fetchStaticPrepositionsOnFallback();
    // fetchStaticVerbExamplesOnFallback();
    // fetchStaticVerbFormsOnFallback();
    // fetchStaticCommonContractionsOnFallback();

    //For fetch the configurations
    const verbFormsConfigRef = collection(db, `verb_forms_config`);
    const isAndroid = Platform.OS === "android";
    onSnapshot(verbFormsConfigRef, (snapshot) => {
      const releaseModeAndroid = snapshot?.docs[0];
      const releaseModeiOS = snapshot?.docs[1];
      const releaseMode = isAndroid ? releaseModeAndroid : releaseModeiOS;
      const serverConfigEnable = releaseMode?.get("serverConfigEnable") ?? true;
      const showAds = releaseMode?.get("showAds") ?? false;

      const appOpenAd = serverConfigEnable
        ? releaseMode?.get("appOpenAd") ?? ""
        : staticAppOpenAd;
      const bannerAd = serverConfigEnable
        ? releaseMode?.get("bannerAd") ?? ""
        : staticBannerAd;
      const interstitialAd = serverConfigEnable
        ? releaseMode?.get("interstitialAd") ?? ""
        : staticInterstitialAd;
      const rewardInterstitialAd = serverConfigEnable
        ? releaseMode?.get("rewardInterstitialAd") ?? ""
        : staticRewardAd;
      const interstitialAdIntervalClicks = serverConfigEnable
        ? releaseMode?.get("interstitialAdIntervalClicks") ??
          staticInterstitialAdIntervalClicks
        : staticInterstitialAdIntervalClicks;
      const interstitialAdIntervalSeconds = serverConfigEnable
        ? releaseMode?.get("interstitialAdIntervalSeconds") ??
          staticInterstitialAdIntervalSeconds
        : staticInterstitialAdIntervalSeconds;

      const privacy_policy = serverConfigEnable
        ? releaseMode?.get("privacy_policy") ?? ""
        : staticPrivacyPolicy;
      const supportEmail = serverConfigEnable
        ? releaseMode?.get("supportEmail") ?? ""
        : staticSupportEmail;
      const poweredBy = serverConfigEnable
        ? releaseMode?.get("poweredBy") ?? ""
        : staticPoweredBy;
      const appStoreLink = serverConfigEnable
        ? releaseMode?.get("appStoreLink") ?? ""
        : staticAppStoreLink;
      const APPLE_STORE_ID = serverConfigEnable
        ? releaseMode?.get("APPLE_STORE_ID") ?? ""
        : staticAPPLE_STORE_ID;
      const androidPackageName = serverConfigEnable
        ? releaseMode?.get("androidPackageName") ?? ""
        : staticAndroidPackageName;
      const show_review_popup = serverConfigEnable
        ? releaseMode?.get("show_review_popup") ?? false
        : false;

      //MANAGE CONTENTS DATA SYNC
      const lastUpdatedAt = releaseMode?.get("last_updated_at");
      if (lastUpdatedAt) {
        LocalStorage.getItemDefault(LAST_SYNCED_AT_KEY).then(async (val) => {
          if (val) {
            const isContentDataNeedsToUpdate =
              lastUpdatedAt.toMillis() > parseInt(val);
            if (isContentDataNeedsToUpdate) {
              fetchContents(db, true);
              updateLastDataSyncDate(lastUpdatedAt);
            }
          } else {
            updateLastDataSyncDate(lastUpdatedAt);
          }
        });
      }

      global.appOpenAd = appOpenAd;
      global.bannerAd = bannerAd;
      global.interstitialAd = interstitialAd;
      global.interstitialAdIntervalClicks = interstitialAdIntervalClicks;
      global.interstitialAdIntervalSeconds = interstitialAdIntervalSeconds;
      global.rewardInterstitialAd = rewardInterstitialAd;
      global.serverConfigEnable = serverConfigEnable;
      global.showAds = showAds;
      global.privacy_policy = privacy_policy;
      global.show_review_popup = show_review_popup;
      global.supportEmail = supportEmail;
      global.poweredBy = poweredBy;
      global.appStoreLink = appStoreLink;
      global.APPLE_STORE_ID = APPLE_STORE_ID;
      global.androidPackageName = androidPackageName;

      redirectToWelcomeScreen();
    });
  }

  useEffect(() => {
    setTimeout(() => {
      redirectToWelcomeScreen();
    }, 3000);
  }, []);

  useEffect(() => {
    loadFirebaseApp();
  }, []);

  const redirectToWelcomeScreen = () => {
    if (!isRedirectedToNextScreen.current) {
      isRedirectedToNextScreen.current = true;

      router.replace(`./welcome`);
    }
  };

  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack
      flex={1}
      bg={"#000091"}
      alignItems="center"
      justifyContent="center"
    >
      <Image
        key={"icon"}
        source={images.icon}
        style={{
          height: isPhoneDevice ? 200 : 300,
          width: isPhoneDevice ? 200 : 300,
          resizeMode: "center",
        }}
        alt={"icon"}
      />

      <YStack zIndex={1} pos="absolute" bottom={isPhoneDevice ? "$4" : "$6"}>
        <SizableText
          fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
          lineHeight={isPhoneDevice ? 22 : 30}
          color={"$thirdPrimaryColor"}
          fontWeight={"700"}
          textAlign="center"
        >
          {`Powered by ${global?.poweredBy ?? staticPoweredBy}`}
        </SizableText>
      </YStack>
    </YStack>
  );
}

export default () => (
  <ErrorBoundary>
    <SplashScreen />
  </ErrorBoundary>
);
