import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../Screens/HomeScreen';
import { CreateEstate } from '../Screens/CreateEstate';
import { CreatedEstates } from '../Screens/CreatedEstates';
import { Profile } from '../Screens/Profile';
import { EditProfile } from '../Screens/EditProfile';

const Stack = createStackNavigator();
export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen" >
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CreateEstate" component={CreateEstate} />
                <Stack.Screen name="CreatedEstates" component={CreatedEstates} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}