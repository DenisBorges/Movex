import React, { Component } from 'react'
import { SafeAreaView, Button, Text, View, ActivityIndicator } from 'react-native'
import { SearchBar } from 'react-native-elements';
import FlatListMovie from '../components/FlatListMovie'
import wsservice from '../services/wsservice'
import Icon from 'react-native-vector-icons/MaterialIcons'



var timeOut

export default class HomePage extends Component {
    constructor(props) {

        super(props)

        this.state = {
            isBusy: true,
            data: [],
            search: '',
            page: 1,

        }

    }

    componentDidMount() {
        this.getItens();
    }


    getItens = async () => {
        
        let url = this.state.search === '' ? `movies/getmoviesbypage/${this.state.page}` : `movies/getmoviesbysearch?page=${1}&&search=${this.state.search}`

        var response = await wsservice.gethomepagedlist(url);

        if (response != null) {
            this.setState({
                data: this.state.search === '' ? [...this.state.data, ...response] : [...response],
                isBusy: false,
                page: this.state.page + 1
            });

        } else {
            this.setState({
                data: null,
                isBusy: false,
            });
        }
    }


    updateSearch = search => {

        clearTimeout(this.timeOut)

        this.timeOut = setTimeout(() => {
            console.log(search);
            this.setState({ page: 1, search })
            this.getItens();
        }, (3000));

        this.setState({search })
    }

    render() {
        if (this.state.data == null && !this.state.isBusy) {
            return <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <Text>Erro ao conectar no servidor</Text>
                <Button OnPress={() => this.getItens()} title="Recarregar" ></Button>
            </View>
        }
        else if (this.state.isBusy) {
            return <View style={{ flex: 1, justifyContent: 'center', }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        } else {
            return <SafeAreaView>
                <SearchBar
                    placeholder="Insira o nome do filme ..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    searchIcon={() => <Icon name="search" size={20} />}
                    cancelIcon={() => <Icon name="cancel" size={20} />}
                    lightTheme={true} />

                <FlatListMovie {...this.state} onEndReached={this.getItens} />
            </SafeAreaView>

        }
    }
}
