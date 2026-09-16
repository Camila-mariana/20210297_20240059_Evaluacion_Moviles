import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';
import Register from '../screens/Register';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { usuario, cargandoSesion } = useAuth();

  if (cargandoSesion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C3FA6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#6C3FA6' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        {usuario ? (
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Mi perfil' }} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
