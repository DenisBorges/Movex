import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../page/homepage'
import GenerPage from '../page/genrepage'



// const drawerNavigator = createDrawerNavigator({
    
//     HomePage: {
//         screen: () => <HomePage></HomePage>,
//         navigationOptions: {
//             title: 'Pagina Inicial'
//         }

//     },
//     SuspensePage: {
//         screen: () => <GenerPage gener="suspense"></GenerPage>,
//         navigationOptions: {
//             title: 'Pagina Suspense'
//         }

//     }

// });


const Drawer = createDrawerNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomePage">
        <Drawer.Screen name="HomePage" component={HomePage} />
        <Drawer.Screen name="SuspensePage" component={<GenerPage gener="suspense"/>} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}