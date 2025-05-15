import React, { useContext, useRef, useState } from "react";
import { Animated, Easing, Pressable, Alert } from "react-native";
import { AppContext } from "../../global/globalVariables";

export function AnimatedBTN({ children, onPress, checkSignIn }) {
    const { userUID } = useContext(AppContext);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        // Animate button press
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.3,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();

        // Check if user needs to be signed in
        if (checkSignIn && (userUID === null || userUID === "")) {
            // Show sign-in notification
            Alert.alert(
                "Sign In Required",
                "Please sign in to perform this action.",
                [{ text: "OK" }]
            );
            return;
        }

        // Execute original onPress if provided
        if (onPress) {
            onPress();
        }
    };

    return (
        <Pressable
            onPress={handlePress}
        // disabled={checkSignIn && (userUID === null || userUID === "")}
        >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                {children}
            </Animated.View>
        </Pressable>
    );
}