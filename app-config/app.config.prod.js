module.exports = {
  name: "Verb Forms - Spanish",
  scheme: "verb-forms-spanish",
  icon: "./assets/icon.test.png",
  web: { favicon: "./assets/favicon.test.png" },
  extra: {
    mode: "prod",
    firebaseWeb: {
      apiKey: "AIzaSyAuAtZ_TBNGau0E-8ILytbLupsPBZh7mPo",
      authDomain: "verbforms-spanish.firebaseapp.com",
      projectId: "verbforms-spanish",
      storageBucket: "verbforms-spanish.firebasestorage.app",
      messagingSenderId: "90725291137",
      appId: "1:90725291137:web:58001bdce64d888763a980",
      measurementId: "G-Q1G73MG8JY",
    },
  },
  android: {
    googleServicesFile: "./firebase-configs/google-services.dev.json",
    package: "shreeramkrishna.verbforms.spanish.verbs.forms",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.test.png",
      backgroundColor: "#FFFFFF",
    },
  },
  ios: {
    googleServicesFile: "./firebase-configs/GoogleService-Info.dev.plist",
    bundleIdentifier: "shreeramkrishna.verbforms.spanish.verbs.forms",
  },
};