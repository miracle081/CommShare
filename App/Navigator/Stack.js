import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../Screens/HomeScreen';
import { CreateEstate } from '../Screens/CreateEstate';
import { Communities } from '../Screens/Communities';
import { Profile } from '../Screens/Profile';
import { EditProfile } from '../Screens/EditProfile';
import { Estate } from '../Screens/Estate';
import { LogIn } from '../Screens/LogIn';
import { SignUp } from '../Screens/SignUp';
import { ForgotPassword } from '../Screens/ForgotPassword';
import { UpdateEstate } from '../Screens/UpdateEstate';
import { AddUsers } from '../Screens/AddUsers';
import { Residents } from '../Screens/Residents';
import { Contributions } from '../Screens/Contributions';
import { AddContribution } from '../Screens/AddContribution';
import { Payment } from '../Screens/Payment';

const Stack = createNativeStackNavigator();
export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LogIn" >
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Sign Up" }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: "Forgot Password" }} />
                <Stack.Screen name="CreateEstate" component={CreateEstate} options={{ title: "Create An Estate" }} />
                <Stack.Screen name="Communities" component={Communities} options={{ title: "Created Estates" }} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="Estate" component={Estate} />
                <Stack.Screen name="UpdateEstate" component={UpdateEstate} />
                <Stack.Screen name="Residents" component={Residents} />
                <Stack.Screen name="AddUsers" component={AddUsers} />
                <Stack.Screen name="Contributions" component={Contributions} />
                <Stack.Screen name="AddContribution" component={AddContribution} options={{ title: "" }} />
                <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}