import * as WebBrowser from "expo-web-browser";
import { Linking, Platform, Share } from "react-native";
import * as Speech from "expo-speech";

export function getSubstring(
  value: string,
  endSubstringNumber: number
): string {
  if (value.length >= endSubstringNumber) {
    return value.substring(0, endSubstringNumber);
  }

  return value;
}

export async function openBrowser(
  url: string
): Promise<WebBrowser.WebBrowserResultType> {
  const pattern = /^((http|https|ftp):\/\/)/;
  if (pattern.test(url)) {
    const result = await WebBrowser.openBrowserAsync(url);
    return result.type;
  }

  return WebBrowser.WebBrowserResultType.CANCEL;
}

export async function shareMyApp() {
  try {
    Share.share({
      message: `Download Verb Forms - French today and start your journey to French fluency!
      \nGoogle Play Store link: https://play.google.com/store/apps/details?id=${
        global?.androidPackageName ?? staticAndroidPackageName
      }
      \nApp Store link: ${global?.appStoreLink ?? staticAppStoreLink}`,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function rateMyApp() {
  try {
    if (Platform.OS === "android") {
      //To open the Google Play Store
      Linking.openURL(
        `market://details?id=${
          global?.androidPackageName ?? staticAndroidPackageName
        }`
      ).catch((err) => console.log(err));
    } else if (Platform.OS === "ios") {
      //To open the Apple App Store
      Linking.openURL(
        `itms-apps://itunes.apple.com.app/${
          global?.APPLE_STORE_ID ?? staticAPPLE_STORE_ID
        }`
      ).catch((err) => console.log(err));
    }
  } catch (e) {
    console.log(e);
  }
}

//STATIC CONFIGURATIONS
const isAndroid = Platform.OS === "android";
export const staticAppOpenAd = isAndroid ? "" : "";
export const staticBannerAd = isAndroid
  ? "ca-app-pub-1802560534115589/4804974855"
  : "ca-app-pub-1802560534115589/7981802535";
export const staticInterstitialAd = isAndroid
  ? "ca-app-pub-1802560534115589/2489631263"
  : "ca-app-pub-1802560534115589/2402172798";
export const staticRewardAd = isAndroid
  ? "ca-app-pub-1802560534115589/3491893182"
  : "ca-app-pub-1802560534115589/8863467921";
export const staticInterstitialAdIntervalClicks = 10;
export const staticInterstitialAdIntervalSeconds = 60;
export const staticPrivacyPolicy =
  "https://doc-hosting.flycricket.io/srkwebstudio-privacy-policy/64f68df3-4304-4de0-84b6-8b293a40f23b/privacy";
export const staticAppStoreLink =
  "https://apps.apple.com/app/verb-forms-french/id6739424081";
export const staticAPPLE_STORE_ID = "id6739424081";
export const staticSupportEmail = "srkwebstudio@gmail.com";
export const staticPoweredBy = "SRKWebstudio";
export const staticAndroidPackageName =
  "shreeramkrishna.verbforms.french.verbs.forms";

export const canShowAdmobInteratitial = () => {
  if (global?.showAds) {
    if (
      (global.interstitialAdIntervalClicks ??
        staticInterstitialAdIntervalClicks) ===
      (global.interstitialAdIntervalCurrentClicks ?? 0)
    ) {
      global.interstitialAdIntervalCurrentClicks = 0;
      return true;
    } else {
      global.interstitialAdIntervalCurrentClicks =
        (global.interstitialAdIntervalCurrentClicks ?? 0) + 1;
      return false;
    }
  }

  return false;
};

export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const speakWord = (wordToSpeak: string) => {
  Speech.stop();
  Speech.speak(wordToSpeak);
};
