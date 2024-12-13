import React from "react";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { staticBannerAd } from "@modules/shared/components/helpers";
import { YStack } from "tamagui";

function AdmobBanner({
    bannerSize = BannerAdSize.BANNER,
}: {
    bannerSize?: string;
}) {
    return (
        <YStack alignItems="center">
            {(global?.showAds) && (
                <YStack>
                    <YStack h={1} bg={"$black"} />
                    <BannerAd
                        unitId={__DEV__ ? TestIds.ADAPTIVE_BANNER : (global?.bannerAd ?? staticBannerAd)}
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    // requestOptions={{
                    //     networkExtras: {
                    //         collapsible: 'bottom',
                    //     },
                    // }}
                    />
                    <YStack h={1} bg={"$black"} />
                </YStack>
            )}
        </YStack>
    );
}

export default AdmobBanner;
