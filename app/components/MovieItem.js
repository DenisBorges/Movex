import React from 'react'
import {StyleSheet,View,Text,Image} from 'react-native'

export default MovieItem = props => {

return <View style={style.row}>
            <Image style={style.image} source={{ uri: props.ImgSrc }}></Image>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={style.txt}>Título: {props.Titulo}</Text>
                <Text style={style.txt}>Imdb: {props.Nota}</Text>
                <Text style={style.txt}>Idioma: {props.Idioma}</Text>
                <Text style={style.txt}>Qualidade: {props.Qualidade}</Text>
                <Text style={style.txt}>Gênero: {props.Genero.slice(0,10)}</Text>
            </View>
        </View>
}

const style = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    image: {
        width: 120,
        height: 150,
        borderColor: 'lightgray',
    },
    txt: {
        flex:1,
        fontSize: 15,
        fontWeight: 'bold'
    }
});