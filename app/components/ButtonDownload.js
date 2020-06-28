import React from 'react'
import { View, TouchableOpacity,Text,StyleSheet} from 'react-native'

export default ButtonDownload = props => {

    return <View style={style.container}>
        <TouchableOpacity style={style.buttonDownload}
            onPress={props.getMovie}>
            <Text style={style.textButton}>Download</Text>
        </TouchableOpacity>
    </View>
}

const style = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems: "center",
        flexWrap: 'nowrap',
        paddingTop: 10
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
    textButton:{ color: 'white', fontSize: 20 }


})