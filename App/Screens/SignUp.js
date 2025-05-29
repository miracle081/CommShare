import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Theme } from '../Components/Theme'
import { Formik } from 'formik'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../Firebase/settings'
import { errorMessage } from '../Components/formatErrorMessage'
import { doc, setDoc } from 'firebase/firestore'
import { AppContext } from '../Components/globalVariables'

export function SignUp({ navigation }) {
    const { setPreloader, setUserUID } = useContext(AppContext)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Join us today</Text>

                <Formik
                    initialValues={{ firstname: "", lastname: "", email: "", password: "", confirmPassword: "" }}
                    onSubmit={(values) => {
                        // console.log(values)
                        setPreloader(true)
                        createUserWithEmailAndPassword(auth, values.email, values.password)
                            .then((data) => {
                                const { uid } = data.user;
                                // addDoc
                                setDoc(doc(db, "users", uid), {
                                    firstname: values.firstname,
                                    lastname: values.lastname,
                                    email: values.email,
                                    image: null,
                                    phone: null,
                                    createdAt: new Date().getTime(),
                                    balance: 0,
                                    bio: "",
                                    role: "user",
                                }).then(() => {
                                    setPreloader(false)
                                    setUserUID(uid)
                                    navigation.replace("HomeScreen");
                                }).catch((error) => {
                                    setPreloader(false)
                                    console.log("Error signing up:", error);
                                    Alert.alert("Sign Up Error", errorMessage(error.code));
                                });
                            })
                            .catch((error) => {
                                setPreloader(false)
                                console.log("Error signing up:", error);
                                Alert.alert("Sign Up Error", errorMessage(error.code));
                            });
                    }}
                >
                    {({ handleChange, handleSubmit, values }) => (
                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                placeholderTextColor={Theme.colors.text2}
                                autoCapitalize="words"
                                autoCorrect={false}
                                onChangeText={handleChange("firstname")}
                                value={values.firstname}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                placeholderTextColor={Theme.colors.text2}
                                autoCapitalize="words"
                                autoCorrect={false}
                                onChangeText={handleChange("lastname")}
                                value={values.lastname}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor={Theme.colors.text2}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={handleChange("email")}
                                value={values.email}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor={Theme.colors.text2}
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry
                                onChangeText={handleChange("password")}
                                value={values.password}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                placeholderTextColor={Theme.colors.text2}
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry
                                onChangeText={handleChange("confirmPassword")}
                                value={values.confirmPassword}
                            />

                            <TouchableOpacity
                                style={styles.signupButton}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.signupButtonText}>Sign Up</Text>
                            </TouchableOpacity>

                            <View style={styles.loginContainer}>
                                <Text style={styles.loginText}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
                                    <Text style={styles.loginLink}>Log In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.bg,
    },
    content: {
        flex: 1,
        padding: Theme.sizes.padding * 1.5,
        justifyContent: 'center',
    },
    title: {
        fontSize: Theme.sizes.xxl * 1.4,
        fontFamily: Theme.fonts.text700,
        color: Theme.colors.text1,
        textAlign: 'center',
        marginBottom: Theme.sizes.xs,
    },
    subtitle: {
        fontSize: Theme.sizes.lg,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text2,
        textAlign: 'center',
        marginBottom: Theme.sizes.padding * 2,
    },
    form: {
        gap: Theme.sizes.lg,
    },
    input: {
        borderWidth: 1,
        borderColor: Theme.colors.line,
        borderRadius: Theme.sizes.borderRadius * 1.5,
        padding: Theme.sizes.padding,
        fontSize: Theme.sizes.lg,
        fontFamily: Theme.fonts.text400,
        backgroundColor: Theme.colors.layer,
    },
    signupButton: {
        backgroundColor: Theme.colors.primary,
        borderRadius: Theme.sizes.borderRadius * 1.5,
        padding: Theme.sizes.padding,
        alignItems: 'center',
        marginTop: Theme.sizes.lg,
    },
    signupButtonText: {
        fontSize: Theme.sizes.lg,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.bg,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Theme.sizes.xl,
    },
    loginText: {
        fontSize: Theme.sizes.md,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text2,
    },
    loginLink: {
        fontSize: Theme.sizes.md,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.primary,
    },
})