const transmissionInstance = require('transmission')
const transmissionConfig = require('./config/transmissionConfig.json')
const transmission = new transmissionInstance(transmissionConfig);
const checkDiskSpace = require('check-disk-space');

function TorrentAdd(magnetLink, fn) {

    transmission.addUrl(magnetLink, {
        "download-dir": "/mnt/plexmedia/Filmes",
        "incomplete-dir": "/mnt/plexmedia/temp_downloads"
    }, function (err, result) {
        if (err) {
            return console.log(err);
        }

        var id = result.id;

        // transmission.waitForState(parseInt(id), "CHECK",
        //     function (err, arg) {

        //         var { files } = arg;

        //         if (!!files) {


        //             let maxValue = Math.max.apply(Math, files.map(function (o) {
        //                 return o.length;
        //             }));

        //             var filtered = files.filter((e, i) => e.length == maxValue);

        //             arg.files = filtered;

        //             transmission.set(id, arg, function (err, arg) { });
        //         }

        //     });

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

function TorrentAwaitForState(id, targetState, fn) {
    transmission.waitForState(parseInt(id), targetState, function (err, arg) {
        fn(arg);
    });
}

function TorrentStop(id, fn) {
    transmission.stop(parseInt(id), function (err, arg) {
        if (err)
            return console.log(err);
        else
            fn(true);

    });
}

function GetAllActiveTorrents(fn) {

    transmission.active(function (err, result) {

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


            fn(data.filter(x => [1, 2, 3, 4].includes(x.statusCode)));
        }
    });
}

function FreeSpace(fn) {
    transmission.freeSpace("/mnt/plexmedia/", function (err, arg) {

        let size = (arg["size-bytes"] / 1073741824).toFixed(2);
        fn(size);
    });

    // // On Linux or macOS
    // checkDiskSpace('/mnt/plexmedia/').then((diskSpace) => {
    //     console.log(diskSpace)
    //     // {
    //     //     free: 12345678,
    //     //     size: 98756432
    //     // }
    // })


}

function VerifyTorrentData(id, fn) {

    transmission.verify([2, 3, 4, 58], function (err, args) {

        if (err)
            console.log(err);
        else
            fn(args.torrents);

    });
}

function GetById(id, fn) {

    if (!!id) {

        transmission.get([parseInt(id)], function (err, arg) {
            if (err)
                console.log(err);
            else
                fn(arg.torrents);

        });

    } else {
        transmission.get(function (err, arg) {
            if (err)
                console.log(err);
            else
                fn(arg.torrents);
        });
    }

}


function getStatusType(type) {
    return transmission.statusArray[type]
    if (type === 0) {
        return 'STOPPED';
    } else if (type === 1) {
        return 'CHECK_WAIT';
    } else if (type === 2) {
        return 'CHECK';
    } else if (type === 3) {
        return 'DOWNLOAD_WAIT';
    } else if (type === 4) {
        return 'DOWNLOAD';
    } else if (type === 5) {
        return 'SEED_WAIT';
    } else if (type === 6) {
        return 'SEED';
    } else if (type === 7) {
        return 'ISOLATED';
    }
}


module.exports = {
    TorrentStart,
    TorrentAdd,
    GetAllActiveTorrents,
    FreeSpace,
    VerifyTorrentData,
    GetById
}