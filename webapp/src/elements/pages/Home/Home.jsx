import React from 'react';
import MovieCard from '../../components/MovieCard';
import { useEffect } from 'react';
import './HomeStyle.css';
import BlockUI from '../../components/BlockUi'
import Pagination from '../../components/Pagination/Pagination'

export default (props) => {

    const { lstMovies, isBlockPage, ...rest } = props;
console.log(props.page);
    return (
        <BlockUI isBlock={props.isBlockPage}>
            <Pagination {...rest}>
                <div className="homepage_container">
                    {lstMovies.map((e, i) => {
                        return (
                            <MovieCard key={i} {...e} />
                        );
                    })}
                </div>
            </Pagination>
        </BlockUI>
    )
};

