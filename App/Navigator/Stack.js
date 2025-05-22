import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../Screens/HomeScreen';
import { CreateEstate } from '../Screens/CreateEstate';
import { CreatedEstates } from '../Screens/CreatedEstates';
import { Profile } from '../Screens/Profile';
import { EditProfile } from '../Screens/EditProfile';
import { Estate } from '../Screens/Estate';

const Stack = createNativeStackNavigator();
export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen" >
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CreateEstate" component={CreateEstate} options={{ title: "Create An Estate" }} />
                <Stack.Screen name="CreatedEstates" component={CreatedEstates} options={{ title: "Created Estates" }} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="Estate" component={Estate} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}