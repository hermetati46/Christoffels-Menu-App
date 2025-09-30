import React, { useEffect } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { WelcomeScreenProps } from "../types";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home", {});
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
          source={require("../../assets/logo2.png")}
          style={styles.backgroundImage}
          resizeMode="contain"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ECE1CB",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;