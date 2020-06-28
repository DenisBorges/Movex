import api from './base/api'

export default wsservice = {

    gethomepagedlist: async (url) => {
        let responseData = [];

        await api.get(url)
            .then(response => {
         
                responseData = response.status === 200 ? response.data : [];

            }).catch(error => {
                responseData = null;
                console.log(error);
            })

        return responseData;
    },
    getgenrepagedlist: async (url) => {
        let responseData = [];

        await api.get(url)
            .then(response => {
         
                responseData = response.status === 200 ? response.data : [];

            }).catch(error => {
                responseData = null;
                console.log(error);
            })

        return responseData;
    },
    getmagnetlinks: async (link) => {

        let responseData = [];

        await api.post('movies/getmagnetlinks', { url: link })
            .then(response => {
                responseData = response.status === 200 ? response.data : [];
            })
            .catch(error => {
                responseData = null;
                console.log(error);
            })

        return responseData;


    },
    starttorrent: async (title,url) => {

        let responseData = [];

        await api.post('transmission/torrentaddstart',{titulo:title,magnetLink:url})
            .then(response => {
           
                responseData = response.status === 200;
            })
            .catch(error => {
                responseData = false;
                console.log(error);
            })

        return responseData;
    }

}




