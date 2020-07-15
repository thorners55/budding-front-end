import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PlantOptionsNavigator from './components/new_plant/PlantOptionsNavigator';
import GardenNavigator from './components/garden/GardenNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Login';
import Profile from './components/Profile';
import { Entypo, AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function App() {
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [name, setName] = useState(null);
  // to log in straight away and not go through login page,
  // set userId state to 1 and username to robert_plant

  const logIn = (Id, user, fullName) => {
    setUserId(Id);
    setUsername(user);
    setName(fullName);
  };

  const logOut = () => {
    setUserId(null);
    Alert.alert('Logged out', 'See you soon - in the meantime, keep growing!');
  };

  const userInfo = {
    userId,
    username,
    name,
  };

  // if user isn't logged in, displays login component, passes logIn func to component so can set user info in app state
  // if user is logged in, navigates to garden page, passing userId down through garden navigator

  return (
    <>
      {!userId && <Login logIn={logIn} />}
      {userId && (
        <>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  if (route.name === 'garden') {
                    return <Entypo name="tree" size={size} color={color} />;
                  } else if (route.name === 'new plant') {
                    return <Entypo name={'plus'} size={size} color={color} />;
                  } else if (route.name === 'profile') {
                    return <AntDesign name="user" size={size} color={color} />;
                  }
                },
              })}
              tabBarOptions={{
                inactiveTintColor: '#52875a',
                activeTintColor: 'white',
                style: styles.bottomNav,
              }}
            >
              <Tab.Screen name="garden">
                {(navigation) => (
                  <GardenNavigator {...navigation} userId={userId} />
                )}
              </Tab.Screen>
              <Tab.Screen name="new plant">
                {(navigation) => (
                  <PlantOptionsNavigator {...navigation} userId={userId} />
                )}
              </Tab.Screen>
              <Tab.Screen name="profile">
                {(navigation) => (
                  <Profile
                    {...navigation}
                    userInfo={userInfo}
                    logOut={logOut}
                  />
                )}
              </Tab.Screen>
            </Tab.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNav: {
    paddingTop: 10,
    backgroundColor: '#355a3a',
    color: 'white',
  },
});
