import React, { useState, useEffect } from 'react'
import BlockUi from 'react-block-ui'
import { Loader } from 'react-loaders'
import 'react-block-ui/style.css';

export default (props) => {

    return (
        <div>
            <BlockUi tag="div" blocking={props.isBlock} loader={<Loader active type='ball-triangle-path' color="#02a17c" />}>
                {props.children}
            </BlockUi>
        </div>
    )

}