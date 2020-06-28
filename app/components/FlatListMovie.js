import { FlatList, View, ActivityIndicator, Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import MovieCardItem from './MovieCardItem'

export default props => {
    {
            return <View>
                <FlatList
                    style={{ backgroundColor: '#DBD8D7' }}
                    contentContainerStyle={{paddingBottom: 150}}
                    data={props.data}
                    onRefresh={props.onEndReached}
                    refreshing = {false}
                    renderItem={({item}) => <MovieCardItem {...item} />}
                    keyExtractor={(_, index) => index.toString()}
                    onEndReached={props.onEndReached}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => {
                        if (props.isBusy) return null;
                        return (
                            <View style={style.waiting}>
                                <ActivityIndicator />
                            </View>
                        );
                    }}
                ></FlatList>
            </View>

    }

}

const style = StyleSheet.create({
    waiting: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        margin: 10,
        backgroundColor: '#DCDCDC',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        padding: 10
    },

})