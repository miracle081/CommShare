import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Theme } from "../Components/Theme";
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Profile } from './Profile';
import GroupList from './GroupList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppContext } from '../Components/globalVariables';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../Firebase/settings';

const recentTransactions = [
    {
        id: '1',
        estate: 'Green Valley Estate',
        service: 'Security Fee',
        amount: '₦15,000',
        date: 'Today, 10:45 AM',
        icon: 'shield'
    },
    {
        id: '2',
        estate: 'Sunrise Apartments',
        service: 'Maintenance',
        amount: '₦8,500',
        date: 'Yesterday, 2:30 PM',
        icon: 'wrench'
    },
    {
        id: '3',
        estate: 'Sunrise Apartments',
        service: 'Electricity Bill',
        amount: '₦12,000',
        date: 'Oct 12, 9:15 AM',
        icon: 'bolt'
    },
];

const username = "John Doe";
const totalTransactions = 24;
const totalAmount = "₦1,156,800,400";
const joinedEstates = 3;

function Home({ navigation }) {
    const { userUID, userInfo, setUserInfo, setCreatedEstates, createdEstates,
        communities, setCommunities,
    } = useContext(AppContext);

    function fetchCreatedEstates() {
        const ref = collection(db, "estates");
        const q = query(ref, where("createdBy", "==", userUID));
        onSnapshot(q, (snapshot) => {
            const qd = [];
            snapshot.forEach(item => {
                qd.push({ ...item.data(), docID: item.id })
            })
            // console.log(JSON.stringify(qd, null, 2));
            setCreatedEstates(qd.sort((a, b) => b.createdAt - a.createdAt));
        })
    }

    function fetchCommunities() {
        const ref = collection(db, "estates");
        const q = query(ref, where("users", "array-contains", userUID));
        onSnapshot(q, (snapshot) => {
            const qd = [];
            snapshot.forEach(item => {
                qd.push({ ...item.data(), docID: item.id })
            })
            // console.log(JSON.stringify(qd, null, 2));
            setCommunities(qd);
        })
    }

    useEffect(() => {
        // getDoc(doc(db, "users", userUID))
        //     .then(user => {
        //         setUserInfo(user.data())
        //     })

        onSnapshot(doc(db, "users", userUID), (user) => {
            setUserInfo(user.data())
        })
        fetchCreatedEstates()
        fetchCommunities()
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                    <Image
                        source={userInfo?.image ? { uri: userInfo?.image } : require('../../assets/user.png')}
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.greetingText}>Hi, {userInfo?.firstname} {userInfo?.lastname}</Text>
                        <Text style={styles.welcomeText}>Welcome to Commshare</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.inboxIcon}>
                    <FontAwesome name="inbox" size={24} color={Theme.colors.text1} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.summaryCard}>
                <Text style={styles.sectionHeader}>Transaction Summary</Text>
                <View style={styles.summaryRow}>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryNumber}>{totalTransactions}</Text>
                        <Text style={styles.summaryLabel}>Total Transactions</Text>
                    </View>
                    <View style={styles.verticalDivider} />
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryNumber}>{totalAmount}</Text>
                        <Text style={styles.summaryLabel}>Total Amount</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.card, { marginTop: 10 }]} onPress={() => navigation.navigate('Estates')}>
                {/* <TouchableOpacity style={[styles.card, { marginTop: 10 }]} onPress={() => navigation.navigate('CreatedEstates', { location: "Kubwa, NYSC" })}> */}
                <View style={styles.cardContent}>
                    <View >
                        <View style={styles.sectionTitleRow}>
                            <Text style={styles.cardTitle}>Created Estate Groups</Text>
                            <Text style={styles.estateCount}> ({createdEstates.length})</Text>
                        </View>
                        <Text style={styles.cardSubtext}>Manage or create estate groups</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color={Theme.colors.text2} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate("Communities") }} style={styles.card}>
                <View style={styles.cardContent}>
                    <View>
                        <View style={styles.sectionTitleRow}>
                            <Text style={styles.cardTitle}>Your Communities</Text>
                            <Text style={styles.estateCount}> ({communities.length})</Text>
                        </View>
                        <Text style={styles.cardSubtext}>Tap to view details</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color={Theme.colors.text2} />
                </View>
            </TouchableOpacity>

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Recent Transactions</Text>
            <FlatList
                scrollEnabled={false}
                data={recentTransactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.card, styles.transactionCard]}>
                        <View style={styles.transactionIconContainer}>
                            <FontAwesome name={item.icon} size={16} color={Theme.colors.primary} />
                        </View>
                        <View style={styles.transactionDetails}>
                            <Text style={styles.estateName}>{item.estate}</Text>
                            <Text style={styles.serviceName}>{item.service}</Text>
                        </View>
                        <View style={styles.transactionAmountDate}>
                            <Text style={styles.amountText}>{item.amount}</Text>
                            <Text style={styles.dateText}>{item.date}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};


const Tab = createBottomTabNavigator();
export function HomeScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'speedometer' : 'speedometer-outline';
                    } else if (route.name === 'Assets') {
                        iconName = focused ? 'diamond' : 'diamond-outline';
                    } else if (route.name === 'Estates') {
                        iconName = focused ? 'business' : 'business-outline';
                    } else if (route.name === 'ShareUnit') {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={28} color={color} />;
                },
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.gray,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ title: "Dashboard" }} />
            <Tab.Screen name="Estates" component={GroupList} />
            <Tab.Screen name="Profile" component={Profile} options={{ title: "Johnny" }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.bg,
        padding: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 13,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 12,
    },
    greetingText: {
        fontSize: 15,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.text1,
    },
    welcomeText: {
        fontSize: 14,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text2,
    },
    inboxIcon: {
        padding: 8,
    },
    card: {
        backgroundColor: Theme.colors.layer,
        borderRadius: 12,
        padding: 16,
        marginBottom: 11,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    summaryCard: {
        backgroundColor: Theme.colors.greenLight,
        borderRadius: 12,
        padding: 16,
        marginBottom: 11,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        fontSize: 16,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.text1,
        marginBottom: 4,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryItem: {
        alignItems: 'center',
        flex: 0.48
    },
    summaryNumber: {
        fontSize: 17,
        fontFamily: Theme.fonts.text700,
        color: Theme.colors.primary,
        marginBottom: 4,
    },
    summaryLabel: {
        fontSize: 14,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text2,
    },
    verticalDivider: {
        width: 1,
        height: '80%',
        backgroundColor: Theme.colors.line,
        alignSelf: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.text1,
        marginBottom: 4,
    },
    cardSubtext: {
        fontSize: 14,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text2,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 17,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.text1,
        marginBottom: 9,
    },
    estateCount: {
        fontSize: 16,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.primary,
        marginRight: Theme.sizes.xxl * 4,
    },
    transactionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    transactionIconContainer: {
        backgroundColor: 'rgba(72, 207, 173, 0.1)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    transactionDetails: {
        flex: 1,
    },
    estateName: {
        fontSize: 16,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.text1,
        marginBottom: 2,
    },
    serviceName: {
        fontSize: 14,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text2,
    },
    transactionAmountDate: {
        alignItems: 'flex-end',
    },
    amountText: {
        fontSize: 16,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.primary,
        marginBottom: 2,
    },
    dateText: {
        fontSize: 12,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text2,
    },
});