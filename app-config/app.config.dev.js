module.exports = {
  name: "Verb Forms - French",
  scheme: "verb-forms-french",
  icon: "./assets/icon.test.png",
  web: { favicon: "./assets/favicon.test.png" },
  extra: {
    mode: "dev",
    firebaseWeb: {
      apiKey: "AIzaSyAuAtZ_TBNGau0E-8ILytbLupsPBZh7mPo",
      authDomain: "verbforms-french.firebaseapp.com",
      projectId: "verbforms-french",
      storageBucket: "verbforms-french.firebasestorage.app",
      messagingSenderId: "90725291137",
      appId: "1:90725291137:web:58001bdce64d888763a980",
      measurementId: "G-Q1G73MG8JY",
    },
  },
  android: {
    googleServicesFile: "./firebase-configs/google-services.dev.json",
    package: "shreeramkrishna.verbforms.french.verbs.forms",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.test.png",
      backgroundColor: "#FFFFFF",
    },
  },
  ios: {
    googleServicesFile: "./firebase-configs/GoogleService-Info.dev.plist",
    bundleIdentifier: "shreeramkrishna.verbforms.french.verbs.forms",
  },
};
