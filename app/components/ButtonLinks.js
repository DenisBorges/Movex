import React from 'react'
import { StyleSheet,Text,TouchableOpacity ,View} from 'react-native'

export default ButtonLinks = props => {
    return <View style={style.container}>
        {props.magnetLinks.map((item, index) => {
           
            return <TouchableOpacity
                style={style.buttonDownload}
                onPress={() => { props.startTorrent(props.titulo, item.Href) }}
                key={index}>
                <Text style={style.textLink} key={index}>{item.Title}</Text>
            </TouchableOpacity>
        })
        }
    </View>
}

const style = StyleSheet.create({

    container: {
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    buttonDownload: {
        width: '100%',
        height: 50,
        backgroundColor: '#7388FF',
        color: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 50, height: 50 },
        width: '40%'
    },
    textLink:{ color: 'white', fontSize: 15 }

})