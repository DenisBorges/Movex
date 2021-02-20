using Movex.Entity;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Movex.Services
{
    public class TransmissionServiceClient : ITransmissionServiceClient
    {
        private readonly HttpClient _client;
        private JsonSerializerSettings settings => new JsonSerializerSettings() { NullValueHandling = NullValueHandling.Ignore };

        public TransmissionServiceClient(HttpClient client, ConnectionConfig config)
        {

            client.BaseAddress = new Uri(config.Endpoint);

            _client = client;

        }
        public async Task<decimal?> GetDirectoryFreeSpace()
        {
            decimal? resultado = null;

            using (HttpResponseMessage resposta = await _client.GetAsync($"transmission/torrentaddstart"))
            using (HttpContent conteudo = resposta.Content)
            {
                string response = await conteudo.ReadAsStringAsync();

                resultado = JsonConvert.DeserializeObject<decimal>(response,settings);
            }

            return resultado;
        }

        public async Task<bool> TorrentAddStart(Movie movie)
        {
            var serializedObject = SerializeObject(movie);

            using (HttpResponseMessage resposta = await _client.PostAsync($"transmission/torrentaddstart", serializedObject))
            {
                return resposta.StatusCode == System.Net.HttpStatusCode.OK;
            }

        }

        public ByteArrayContent SerializeObject(object data)
        {
            var myContent = JsonConvert.SerializeObject(data);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return byteContent;
        }
    }
}
