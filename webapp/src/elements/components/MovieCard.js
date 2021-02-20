import React from 'react'
import BlockUi from './BlockUi'
import { useState } from 'react';
import { Card, Button } from 'react-bootstrap'
import WsService from '../../services/wsService'

export default (props) => {

    var [isBlockCard, setIsBlockCard] = useState(false);
    var [lstMagnetLinks, setLstMagnetLinks] = useState([]);
    var [isDownloaded, setIsDownloaded] = useState(props.isDownloaded);

    async function blockUI(_isBlock) {
        setIsBlockCard(_isBlock);
    };


    async function showLinks(link) {
        setIsBlockCard(true);

        let _lstMagneLinks = await WsService.getmagnetlinks(link);

        if (!!_lstMagneLinks)
            setLstMagnetLinks(_lstMagneLinks);

        setIsBlockCard(false);
    }

    async function startTorrent(title, link) {
        setIsBlockCard(true);

        let isSuccess = await WsService.starttorrent(title, link);

        setIsDownloaded(isSuccess);
        setIsBlockCard(false);
    }

    return (
        <BlockUi isBlock={props.isBlockCard}>
            <Card className="movieCard" style={{ width: '18rem' }}>
                <Card.Img variant="top" className="movieImg" src={props.ImgSrc} />
                <Card.Body>
                    {isDownloaded
                        ?
                        <div className="container-baixado">
                            <label>BAIXADO</label>
                        </div>

                        :

                        <React.Fragment>
                            <Card.Title>{props.Titulo}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{props.Idioma}</Card.Subtitle>
                            <Card.Text>
                                <div className="movieInfo">
                                    <label className="mb-2 text-muted">Nota:</label>
                                    <label>{props.Nota}</label>
                                    <label className="mb-2 text-muted">Idioma:</label>
                                    <label>{props.Idioma}</label>
                                    <label className="mb-2 text-muted">Qual:</label>
                                    <label>{props.Qualidade}</label>
                                    <label className="mb-2 text-muted">Gênero:</label>
                                    <label>{props.Genero}</label>
                                </div>
                            </Card.Text>
                            <div className="magnetLinksContainer">
                                {lstMagnetLinks.length > 0 ?

                                    lstMagnetLinks.map((e, i) => {
                                        return <Button
                                            onClick={() => { startTorrent(props.Titulo, e.Href) }}
                                            className="buttonMagnet"
                                            key={i}>
                                            {e.Title}
                                        </Button>
                                    })
                                    :
                                    <Button variant="primary" onClick={() => showLinks(props.Link)}>Magnet Links</Button>
                                }
                            </div>
                        </React.Fragment>
                    }

                </Card.Body>
            </Card>

        </BlockUi>
    );
}