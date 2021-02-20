using Movex.Entity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Movex.Services.Clients.Base
{
    public class ClientBase
    {

        protected readonly HttpClient _client;
        protected JsonSerializerSettings settings => new JsonSerializerSettings() { NullValueHandling = NullValueHandling.Ignore };

        public ClientBase(HttpClient client, ConnectionConfig config)
        {

            client.BaseAddress = new Uri(config.Endpoint);

            _client = client;

        }

        protected async Task<HttpResponseMessage> PostData(string requestUri, object data)
        {

            var serializedObject = SerializeObject(data);

            return await _client.PostAsync(requestUri, serializedObject);
        }

        private static ByteArrayContent SerializeObject(object data)
        {
            var myContent = JsonConvert.SerializeObject(data);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return byteContent;
        }


    }
}
