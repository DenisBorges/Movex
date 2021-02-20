import React, { useState } from 'react'
import Home from './Home'
import wsService from '../../../services/wsService';
import { useEffect, useRef } from 'react';

export default (props) => {

    var [lstMovies, setLstMovies] = useState({
        data:[],
        page:1
    });
    var [isBlockPage, setIsBlockPage] = useState(false);
    var [filter, setFilter] = useState(props.filter);
    
    useEffect(() => {
        async function GetMovies() {
            setIsBlockPage(true);

            let url = '';

            if (!!props.filter) {
                url =`movies/getmoviesbysearch?page=1&&search=${props.filter}`;
            } else {
                url = `movies/getmoviesbypage/1`;
            }

            let _lstMovies = await wsService.gethomepagedlist(url);

            setIsBlockPage(false);

            if (!!_lstMovies){
                setLstMovies({data:_lstMovies,page:1});
            }
        };

        GetMovies();

    }, [props.filter])

    async function GetMovies(page) {
        setIsBlockPage(true);

        let url = '';

        if (!!props.filter) {
            url =`movies/getmoviesbysearch?page=${page}&&search=${props.filter}`;
        } else {
            url = `movies/getmoviesbypage/${page}`;
        }

        let _lstMovies = await wsService.gethomepagedlist(url);

        setIsBlockPage(false);

        if (!!_lstMovies)
            setLstMovies({data:_lstMovies});
    };

    var paginationMethods = {
        MoveFirst: async function () {
            await GetMovies(1);
        },
        MovePage: async function (page) {
            await GetMovies(page);
        },
        MoveLast: async function () {
            await GetMovies(50);
        }
    }

    return (
        <Home
            isBlockPage={isBlockPage}
            lstMovies={lstMovies.data}
            {...paginationMethods}
            page={lstMovies.page}
        />
    )
}