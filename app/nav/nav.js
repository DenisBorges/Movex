import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createDrawerNavigator} from 'react-navigation-drawer'
import FlatListMovie from '../components/FlatListMovie'
import HomePage from '../page/homepage'
import GenerPage from '../page/genrepage'

const drawerNavigator = createDrawerNavigator({
    
    HomePage: {
        screen: () => <HomePage></HomePage>,
        navigationOptions: {
            title: 'Pagina Inicial'
        }

    },
    SuspensePage: {
        screen: () => <GenerPage gener="suspense"></GenerPage>,
        navigationOptions: {
            title: 'Pagina Suspense'
        }

    }

});

const nav = createAppContainer(drawerNavigator)

export default nav