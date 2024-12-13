import {
  Label,
  RadioGroup,
  SizableText,
  SizeTokens,
  XStack,
  YStack,
} from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import BasicButton from "@design-system/components/buttons/basic-button";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "@modules/shared/components/form-input/form-input";
import { showErrorToast, showNormalToast } from "@utils/toast-handler";
import DeviceInfo from "react-native-device-info";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { AppManifest } from "../../../app-manifest";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import { HIT_SLOP } from "@utils/theme";
import { Image, ImageProps, Platform, ScrollView } from "react-native";
import images from "@assets/images/images";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { router } from "expo-router";
import useKeyboardAnimatedHeight from "@modules/shared/hooks/use-keyboard-animated-height";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import InputAccessoryViewiOS from "@modules/shared/components/input-accessory-view-details";
import { DeviceType, deviceType } from "expo-device";

const feedbackTypes = [
  { title: "General feedback" },
  { title: "Features & suggestions" },
  { title: "Technical help" },
];

function AddContentsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedFeedbackType, setSelectedFeedbackType] = useState<
    "GENERAL" | "FEATURES_SUGGESTIONS" | "TECHNICAL_HELP" | ""
  >("GENERAL");
  const [selectedFeedbackRating, setSelectedFeedbackRating] =
    useState<number>(-1);
  const uniqueDeviceId = DeviceInfo.getUniqueIdSync();
  const responsiveWidth = useResponsiveWidth();
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  //For Firestore
  const firebaseConfig = AppManifest.extra.firebaseWeb;
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const { control, watch, setValue } = useForm({
    defaultValues: { feedback: "" },
  });

  const keyboardAnimatedHeight = useKeyboardAnimatedHeight();
  const keyboardAnimatedStyle = useAnimatedStyle(() => ({
    height: keyboardAnimatedHeight.value,
  }));

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
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
          >
            {"Feedback & Support"}
          </SizableText>
        }
        backgroundColor={"$primary"}
      />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
      >
        <ResponsiveContent flex={1}>
          <YStack h={isPhoneDevice ? "$4" : "$6"} />
          <SizableText
            fontSize={isPhoneDevice ? "$md" : "$2xl"}
            lineHeight={isPhoneDevice ? 22 : 34}
            color={"$secondPrimaryColor"}
            fontWeight={"$semibold"}
            textAlign="center"
          >
            {"Your review will help us to give you a better experience!"}
          </SizableText>
          <YStack h={"$8"} />
          <RadioGroup
            defaultValue={selectedFeedbackType}
            native={true}
            onValueChange={(value) => {
              switch (value) {
                case "GENERAL":
                  setSelectedFeedbackType("GENERAL");
                  break;

                case "FEATURES_SUGGESTIONS":
                  setSelectedFeedbackType("FEATURES_SUGGESTIONS");
                  break;

                case "TECHNICAL_HELP":
                  setSelectedFeedbackType("TECHNICAL_HELP");
                  break;
              }
            }}
          >
            <YStack alignItems="center">
              <RadioGroupItemWithLabel
                isSelected={selectedFeedbackType === "GENERAL"}
                width={responsiveWidth - (isPhoneDevice ? 40 : 0)}
                size={isPhoneDevice ? "$5" : "$9"}
                value={"GENERAL"}
                label={feedbackTypes[0].title}
                isPhoneDevice={isPhoneDevice}
              />
              <YStack h={isPhoneDevice ? "$5" : "$9"} />
              <RadioGroupItemWithLabel
                isSelected={selectedFeedbackType === "FEATURES_SUGGESTIONS"}
                width={responsiveWidth - (isPhoneDevice ? 40 : 0)}
                size={isPhoneDevice ? "$5" : "$9"}
                value={"FEATURES_SUGGESTIONS"}
                label={feedbackTypes[1].title}
                isPhoneDevice={isPhoneDevice}
              />
              <YStack h={isPhoneDevice ? "$5" : "$9"} />
              <RadioGroupItemWithLabel
                isSelected={selectedFeedbackType === "TECHNICAL_HELP"}
                width={responsiveWidth - (isPhoneDevice ? 40 : 0)}
                size={isPhoneDevice ? "$5" : "$9"}
                value={"TECHNICAL_HELP"}
                label={feedbackTypes[2].title}
                isPhoneDevice={isPhoneDevice}
              />
            </YStack>
          </RadioGroup>
          <YStack h={isPhoneDevice ? "$5" : "$9"} />
          <YStack mx={isPhoneDevice ? "$4" : 0}>
            <FormInput
              name="feedback"
              control={control}
              type={"text"}
              textInputProps={{
                placeholder: "Your valuable feedback!",
                focusable: true,
                autoFocus: false,
                fontSize: isPhoneDevice ? "$hxs" : "$xl",
                autoCapitalize: "sentences",
                hideShadow: false,
                numberOfLines: 5,
                maxLength: 250,
                multiline: true,
                textAlign: "left",
                textAlignVertical: "top",
              }}
              testID="feedback-input"
            />
          </YStack>
          <YStack h={isPhoneDevice ? "$5" : "$9"} />
          <XStack
            mx={isPhoneDevice ? "$4" : 0}
            justifyContent="center"
            alignItems="center"
          >
            <RatingItem
              onPress={() => {
                setSelectedFeedbackRating(1);
              }}
              image={images.mood1}
              selectedFeedbackRating={selectedFeedbackRating}
              index={1}
              selectedColor="#ef4444"
              isPhoneDevice={isPhoneDevice}
            />
            <YStack flex={1} />
            <RatingItem
              onPress={() => {
                setSelectedFeedbackRating(2);
              }}
              image={images.mood2}
              selectedFeedbackRating={selectedFeedbackRating}
              index={2}
              selectedColor="#f97316"
              isPhoneDevice={isPhoneDevice}
            />
            <YStack flex={1} />
            <RatingItem
              onPress={() => {
                setSelectedFeedbackRating(3);
              }}
              image={images.mood3}
              selectedFeedbackRating={selectedFeedbackRating}
              index={3}
              selectedColor="#eab308"
              isPhoneDevice={isPhoneDevice}
            />
            <YStack flex={1} />
            <RatingItem
              onPress={() => {
                setSelectedFeedbackRating(4);
              }}
              image={images.mood4}
              selectedFeedbackRating={selectedFeedbackRating}
              index={4}
              selectedColor="#3b82f6"
              isPhoneDevice={isPhoneDevice}
            />
            <YStack flex={1} />
            <RatingItem
              onPress={() => {
                setSelectedFeedbackRating(5);
              }}
              image={images.mood5}
              selectedFeedbackRating={selectedFeedbackRating}
              index={5}
              selectedColor="#22c55e"
              isPhoneDevice={isPhoneDevice}
            />
          </XStack>
          <YStack h={isPhoneDevice ? "$6" : "$9"} />
          <YStack mx={isPhoneDevice ? "$4" : 0} mb={"$5"}>
            <BasicButton
              height={isPhoneDevice ? 48 : 72}
              disabledLinearGradientProps={{ colors: ["#a1a1aa", "#a1a1aa"] }}
              linearGradientProps={{ colors: ["#AA151B", "#AA151B"] }}
              onPress={async () => {
                const feedback = watch("feedback") ?? "";
                if (feedback.length > 0) {
                  if (selectedFeedbackRating > 0) {
                    try {
                      addDoc(collection(db, "feedback"), {
                        "device-id": uniqueDeviceId,
                        feedback: feedback,
                        "feedback-rating": selectedFeedbackRating,
                        "feedback-type": selectedFeedbackType.toString(),
                      });

                      showNormalToast("Thank you for your valuable feedback!");
                      try {
                        if (router.canGoBack()) {
                          router.back();
                        } else {
                          router.replace("/");
                        }
                      } catch {}
                    } catch (err) {
                      alert(err);
                    }
                  } else {
                    showErrorToast("Please choose feedback rating!");
                  }
                } else {
                  showErrorToast("Please write your feedback!");
                }
              }}
            >
              <SizableText
                fontSize={isPhoneDevice ? "$md" : "$2xl"}
                color={"$white"}
                fontWeight={"$bold700"}
                textAlign="center"
                lineHeight={isPhoneDevice ? 22 : 34}
              >
                Send Feedback
              </SizableText>
            </BasicButton>
          </YStack>
        </ResponsiveContent>
      </ScrollView>
      <YStack>
        <AdmobBanner />
        <Animated.View style={keyboardAnimatedStyle} />
      </YStack>
      <YStack h={insets.bottom} />
      {Platform.OS === "ios" && <InputAccessoryViewiOS title={"Done"} />}
    </YStack>
  );
}

export default AddContentsScreen;

export function RadioGroupItemWithLabel(
  props: Readonly<{
    size: SizeTokens;
    value: string;
    label: string;
    width: number;
    isSelected: boolean;
    isPhoneDevice: boolean;
  }>
) {
  const id = `radiogroup-${props.value}`;
  return (
    <XStack width={props.width} alignItems="center">
      <RadioGroup.Item
        borderColor={props.isSelected ? "$secondPrimaryColor" : "$black"}
        value={props.value}
        id={id}
        hitSlop={HIT_SLOP}
        size={props.isPhoneDevice ? "$11" : "$16"}
      >
        <RadioGroup.Indicator backgroundColor={"$secondPrimaryColor"} />
      </RadioGroup.Item>
      <YStack w={props.isPhoneDevice ? "$4" : "$6"} />
      <Label
        size={props.size}
        color={"$thirdPrimaryColor"}
        fontWeight={"$semibold"}
        htmlFor={id}
      >
        {props.label}
      </Label>
    </XStack>
  );
}

export function RatingItem(
  props: Readonly<{
    onPress: () => void;
    index: number;
    selectedFeedbackRating: number;
    selectedColor: string;
    image: Readonly<ImageProps>;
    isPhoneDevice: boolean;
  }>
) {
  const {
    onPress,
    selectedFeedbackRating,
    image,
    index,
    selectedColor,
    isPhoneDevice,
  } = props;
  const iconSize = isPhoneDevice ? 32 : 44;
  return (
    <YStack
      borderColor={selectedFeedbackRating === index ? "$white" : selectedColor}
      borderWidth={
        selectedFeedbackRating === index
          ? isPhoneDevice
            ? 2
            : 3
          : isPhoneDevice
          ? 1
          : 1.5
      }
      bg={selectedFeedbackRating === index ? selectedColor : "$black"}
      borderRadius={8}
      p={isPhoneDevice ? "$2" : "$3"}
    >
      <TouchableScale onPress={onPress}>
        <Image
          key={`mood-${index}`}
          source={image}
          style={{
            height: iconSize,
            width: iconSize,
            resizeMode: "center",
            tintColor: "#ffffff",
          }}
          alt={`mood-${index}`}
        />
      </TouchableScale>
    </YStack>
  );
}
