import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'


export default props => {

    var [page, setPage] = useState(props.page);
    var [isFirstPage, setIsFirstPage] = useState(false);
    var [isLastPage, setIsLastPage] = useState(false);

    function moveFirstPage() {

        window.scrollTo({
            top: 400,
            behavior: 'smooth',
        });

        setPage(1);
        setIsFirstPage(true);
        setIsLastPage(false);
        props.MoveFirst();

    }

    function movePage(value) {

        if (page <= 1 && value == -1)
            return;

        let currentPage = page + value;

        props.MovePage(currentPage);
        setPage(currentPage);

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })


    }

    function moveLastPage() {
        setIsFirstPage(false);
        setIsLastPage(true);
    }

    return (
        <>
            <Pagination size="lg">
                <Pagination.First onClick={() => moveFirstPage()} />
                <Pagination.Prev onClick={() => movePage(-1)} disabled={isFirstPage} />
                <Pagination.Next onClick={() => movePage(+1)} />
                <Pagination.Last onClick={() => moveLastPage()} disabled={isLastPage} />
            </Pagination>

            {!!props.children ?
                <>
                    {props.children}
                    <Pagination size="lg">
                        <Pagination.First onClick={() => moveFirstPage()} />
                        <Pagination.Prev onClick={() => movePage(-1)} disabled={isFirstPage} />
                        <Pagination.Next onClick={() => movePage(+1)} />
                        <Pagination.Last onClick={() => moveLastPage()} disabled={isLastPage} />
                    </Pagination>
                </>
                :
                null
            }
        </>
    );
}