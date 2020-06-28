import React from 'react'
import { View, Modal, Text, TouchableHighlight } from 'react-native'

const modalDetails = props => {

    return <View>
        <Modal
            transparent={true}
            visible={props.isVisible}
            animationType="slide">
            <View style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#00ff00',
              padding: 100
            }}>
                <View style={{
                    width: 300,
                    height: 300
                }}>
                    <Text>Hello World!</Text>
                    <TouchableHighlight
                        onPress={() => {
                            props.showModal(!props.isVisible);
                        }}>
                        <Text>Hide Modal</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    </View>
}

export default modalDetails