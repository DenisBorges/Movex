const transmissionInstance = require('transmission')
const transmissionConfig = require('./config/transmissionConfig.json')
const transmission = new transmissionInstance(transmissionConfig);

function TorrentAdd(magnetLink, fn) {

    transmission.addUrl(magnetLink, {
        "download-dir": "/mnt/plexmedia/Filmes",
        "incomplete-dir": "/mnt/plexmedia/temp_downloads"
    }, function (err, result) {
        if (err) {
            return console.log(err);
        }

        id = result.id;

        console.log('Just added a new torrent.');
        console.log('Torrent ID: ' + id);

        fn(id);

    });

}

 function TorrentStart(id) {
    transmission.start(id, function (err, result) {
        if (err) {
            return console.log(err);
        }
    });
}

 function GetAllActiveTorrents(fn) {

     transmission.active( function (err, result) {

        if (err) {
            console.log(err);
        }
        else {

            var data = result.torrents.map((e, i) => {
                return {
                    id: e.id,
                    name: e.name,
                    statusCode: e.status,
                    status: getStatusType(e.status),
                    sizeGb: (e.totalSize / 1073741824).toFixed(2),
                    downloadDir: e.downloadDir,
                    isFinished: e.isFinished,
                    isCompleted: e.percentDone * 100 == 100,
                    percentualDone: e.percentDone * 100
                }
            })

        
            fn(data.filter(x=> [1,2,3,4].includes(x.statusCode)));
        }
    });
}

 function FreeSpace(fn) {
    transmission.freeSpace("/mnt/plexmedia/",  function (err, arg) {

        let size = (arg["size-bytes"] / 1073741824).toFixed(2);
        fn(size);

    });
}


function getStatusType(type){
    return transmission.statusArray[type]
    if(type === 0){
        return 'STOPPED';
    } else if(type === 1){
        return 'CHECK_WAIT';
    } else if(type === 2){
        return 'CHECK';
    } else if(type === 3){
        return 'DOWNLOAD_WAIT';
    } else if(type === 4){
        return 'DOWNLOAD';
    } else if(type === 5){
        return 'SEED_WAIT';
    } else if(type === 6){
        return 'SEED';
    } else if(type === 7){
        return 'ISOLATED';
    }
}


module.exports = {
    TorrentStart,
    TorrentAdd,
    GetAllActiveTorrents,
    FreeSpace
}