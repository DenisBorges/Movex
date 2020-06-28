import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import wsservice from '../services/wsservice'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ButtonLinks from './ButtonLinks'
import ButtonDownload from './ButtonDownload'
import MovieItem from './MovieItem'

export default class MovieCardItem extends Component {

    constructor(props) {

   
        super(props)

        this.state = {
            showBtnDownload: false,
            magnetLinks: [],
            isDownloadStarted: false,
            isVisible: false
        }
    }

    getMovie = async ({ titulo, link }) => {


        this.setState({ showBtnDownload: true });

        var response = await wsservice.getmagnetlinks(link)
        debugger;
        if (response != null)
            this.setState({ showBtnDownload: false, magnetLinks: response })

    }

    startTorrent = async (titulo, link) => {

        var response = await wsservice.starttorrent(titulo,link);

        if (response != null)
            this.setState({ isDownloadStarted: true });

    }

    showModal = ({ isVisible }) => {
        this.setState({ isVisible: !isVisible })
    }


    renderWaitingProgress = () => {
        return <View style={style.column}>
            <ActivityIndicator size="large"></ActivityIndicator>
        </View>
    }

    render() {

        return <View style={style.container}>
            {
                this.state.isDownloadStarted ?
                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1, flexDirection: "column" }}>
                        <Text>{this.props.Titulo}</Text>
                        <Icon name="check-circle" size={20} />
                    </View>
                    :
                    <MovieItem {...this.props} />
            }

            {
                this.state.isDownloadStarted ? <View></View> :
                    (
                        this.state.magnetLinks.length > 0 ?
                            <ButtonLinks
                                titulo={this.props.Titulo}
                                magnetLinks={this.state.magnetLinks}
                                startTorrent={this.startTorrent} /> :
                            (
                                !this.state.showBtnDownload ?
                                    <ButtonDownload
                                        getMovie={() => this.getMovie({
                                            titulo: this.props.Titulo,
                                            link: this.props.Link
                                        })} />
                                    :
                                    this.renderWaitingProgress()
                            )
                    )
            }
        </View>
    }

}


const style = StyleSheet.create({
    column: {
        flexDirection: 'column',
        alignItems: "center",
        flexWrap: 'nowrap',
        paddingTop: 10
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    container: {
        elevation: 1,
        flexWrap: 'nowrap',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 20,
        backgroundColor: 'white',
    },
    image: {
        width: 120,
        height: 150,
        borderColor: 'lightgray',
    },
    txt: {
        fontSize: 15,
        fontWeight: 'bold'
    }
})