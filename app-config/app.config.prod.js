module.exports = {
  name: "Verb Forms - French",
  scheme: "verb-forms-french",
  icon: "./assets/icon.test.png",
  web: { favicon: "./assets/favicon.test.png" },
  extra: {
    mode: "prod",
    firebaseWeb: {
      apiKey: "AIzaSyAWiHgfrM0tPdzc7dzNjA8cLg8Yx6q_6Kk",
      authDomain: "verb-forms-french.firebaseapp.com",
      projectId: "verb-forms-french",
      storageBucket: "verb-forms-french.firebasestorage.app",
      messagingSenderId: "8532305573",
      appId: "1:8532305573:web:c43bed8a008bfcea668f4c",
      measurementId: "G-35Q04N431T",
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
