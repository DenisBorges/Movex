import React, { Component } from 'react'
import { SafeAreaView,Button, Text,View,ActivityIndicator } from 'react-native'
import { SearchBar} from 'react-native-elements';
import FlatListMovie from '../components/FlatListMovie'
import wsservice from '../services/wsservice'
import Icon from 'react-native-vector-icons/MaterialIcons'


var timeOut

export default class GenrePage extends Component {
    constructor(props) {

        super(props)

        this.state = {
            gener: props.gener,
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

        var response = await wsservice.getgenrepagedlist(`movies/getmoviesbygenre?page=${this.state.page}&&genre=${this.state.gener}`);

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
            this.getItens()
        }, (3000));

        this.setState({ search })
    }

    render() {
        if (this.state.data == null && !this.state.isBusy) {
            return <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <Text>Erro ao conectar no servidor</Text>
                <Button OnPress={() => { this.setState({isBusy:true}); this.getItens();}} title="Recarregar" ></Button>
            </View>
        }
        else if (this.state.isBusy) {
            return <View style={{ flex: 1, justifyContent: 'center', }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        } else {
            return  <SafeAreaView>
                <SearchBar
                    placeholder="Insira o nome do filme ..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    searchIcon ={() => <Icon name="search" size={20}/> }
                    cancelIcon = {() => <Icon name="cancel" size={20}/> }
                    lightTheme={true} />
               
                    <FlatListMovie {...this.state} onEndReached={this.getItens} />
                </SafeAreaView>
            
        }
    }
}
