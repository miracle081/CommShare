import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, } from 'react'
import { Theme } from '../Components/Theme';
import { Button, } from 'react-native-paper';
import { Formik, } from 'formik';
import * as yup from "yup"


// const validation = yup.object({
//     email: yup.string().email().required(),
//     password: yup.string().min(8).max(20).required()
// })

export function LogIn({ navigation }) {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.container}>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(value) => {
                        console.log(value);
                        Alert.alert("Login", "Login functionality is not implemented yet.")
                    }}
                >
                    {(prop) => {
                        return (
                            <View style={{ flex: 1, justifyContent: "center", }}>
                                <Text style={{ fontSize: 35, textAlign: "center", fontFamily: Theme.fonts.text600 }}>LogIn</Text>
                                <View style={styles.label}>
                                    <Text style={{ fontFamily: Theme.fonts.text500 }}>Email:</Text>
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        style={styles.input}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={prop.handleChange("email")}
                                        value={prop.values.email}
                                    />
                                    {/* <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.email && prop.errors.email}</Text> */}
                                </View>
                                <View>
                                    <Text style={{ fontFamily: Theme.fonts.text500 }}>Password :</Text>
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        style={styles.input}
                                        autoCapitalize='none'
                                        autoComplete='off'
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                        keyboardType='default'
                                        onChangeText={prop.handleChange("password")}
                                        value={prop.values.password}
                                    />
                                    {/* <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.password && prop.errors.password}</Text> */}
                                </View>
                                <Button mode='text' style={{ fontSize: 12, alignSelf: "flex-end" }} onPress={() => { navigation.navigate("ForgotPassword") }}>Forgot Password?</Button>

                                <Button onPress={prop.handleSubmit}
                                    mode='contained-tonal'
                                    style={{ marginVertical: 15 }}
                                    buttonColor={Theme.colors.primary + 30}
                                > Log In</Button>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 15, marginVertical: 30, fontFamily: Theme.fonts.text300 }}>Im a new user</Text>
                                    <Button mode='text' onPress={() => { navigation.navigate("SignUp") }}>Sign Up</Button>
                                </View>
                            </View>
                        )
                    }}
                </Formik>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        marginTop: StatusBar.currentHeight,
        backgroundColor: "#ffffff00",
    },
    input: {
        borderColor: Theme.colors.primary,
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 30,
        fontSize: 15,
        marginTop: 10

    },
    label: {
        marginBottom: 7
    }
})