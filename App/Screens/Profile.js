import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Modal } from 'react-native';
import { Theme } from '../Components/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faComment, faGear, faLanguage, faLocation, faLock, faPenToSquare, faRetweet, faSquarePlus, faThumbsUp, faUser, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { AppButton } from '../Components/AppButton';

// import { Icon } from 'react-native-vector-icons/Icon';


// // import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";

export function Profile() {
    const [visibility, setVisibility] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.primary }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[styles.header, { backgroundColor: Theme.colors.primary }]}>
                    <Image source={{ uri: 'https://i.imgur.com/R66g1Pe.jpg' }} style={styles.avatar} />
                    <Text style={styles.username}>username@email.com</Text>
                </View>

                <View style={{ padding: 20 }}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}><Text style={styles.label}>Full Name:</Text> John Doe</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Phone:</Text> +123456789</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Email:</Text> username@email.com</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Address:</Text> 123 Street, City</Text>
                    </View>

                    <View style={[styles.iconRow, { marginTop: 20 }]}>
                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesomeIcon icon={faLock} />
                            <Text >Change Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <Text style={styles.iconLabel}>Edit Profile</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesomeIcon icon={faUserXmark} />
                            <Text style={styles.iconLabel}>Delete Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesomeIcon icon={faAddressBook} />
                            <Text style={styles.iconLabel}>Contact Us</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesomeIcon icon={faSquarePlus} />
                            <Text style={styles.iconLabel}>Create Estate</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesomeIcon icon={faLanguage} />
                            <Text style={styles.iconLabel}>Language</Text>
                        </TouchableOpacity>
                    </View>

                    <AppButton onPress={() => setVisibility(true)}
                        style={{ marginTop: 10, borderWidth: 1, borderColor: Theme.colors.red }}
                        textColor={Theme.colors.red}
                        buttonColor={"transparent"}>Log Out</AppButton>
                </View>

                <Modal
                    visible={visibility}
                    animationType='slide'
                    transparent
                >
                    <View style={{ backgroundColor: "#000000ac", flex: 1, }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ backgroundColor: "#ffffff", padding: 20, paddingBottom: 30, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                            <Text>Log Out</Text>
                            <Text>Are you sure you want to log out of this app?</Text>
                            <AppButton onPress={() => setVisibility(false)}
                                style={{ marginTop: 50, borderWidth: 1, borderColor: Theme.colors.red }}
                                textColor={Theme.colors.red}
                                buttonColor={"transparent"}>Yes</AppButton>
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        // paddingVertical: 40,
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        alignItems: 'center',

        width: '100%',
        paddingVertical: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },
    username: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        gap: 20
    },
    iconBox: {
        alignItems: 'center',
        justifyContent: "center",
        paddingVertical: 20,
        height: 90,
        backgroundColor: '#ecf0f1',
        borderRadius: 15,
        flex: 1
    },
    iconLabel: {
        fontSize: 14,
        color: '#333',
    },
    infoBox: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        marginTop: 10
    },
    infoText: {
        fontSize: 16,
        marginVertical: 5,
    },
    label: {
        fontWeight: 'bold',
    },
    editButton: {
        backgroundColor: '#27ae60',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginTop: 20,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});