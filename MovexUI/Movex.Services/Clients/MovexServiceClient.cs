using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Movex.Entity;
using System.Net.Http.Headers;
using Movex.Services.Clients.Base;

namespace Movex.Services.Clients
{
    public class MovexServiceClient : ClientBase, IMovexServiceClient
    {


        public MovexServiceClient(HttpClient client, ConnectionConfig config):base(client,config){}

        public async Task<List<MagnetLink>> GetMagnetLinks(string link)
        {

            ObjectResponse<MagnetLink> resultado = null;

            try
            {

                using (HttpResponseMessage resposta = await PostData("movies/getmagnetlinks", new { url = link }))
                using (HttpContent conteudo = resposta.Content)
                {
                    string response = await conteudo.ReadAsStringAsync();

                    resultado = JsonConvert.DeserializeObject<ObjectResponse<MagnetLink>>(response, settings);
                }
            }
            catch (Exception ex) { }

            return resultado.data;
        }

        public async Task<List<Movie>> GetMovies(int page)
        {

            ObjectResponse<Movie> resultado = null;

            using (HttpResponseMessage resposta = await _client.GetAsync($"movies/getmoviesbypage/{page}"))
            using (HttpContent conteudo = resposta.Content)
            {
                string response = await conteudo.ReadAsStringAsync();

                resultado = JsonConvert.DeserializeObject<ObjectResponse<Movie>>(response, settings);
            }

            return resultado.data;

        }

        public async Task<List<Movie>> GetMoviesByGenre(int page, string genero)
        {

            ObjectResponse<Movie> resultado = null;

            try
            {

                using (HttpResponseMessage resposta = await _client.GetAsync($"movies/getmoviesbygenre?page={page}&genre={genero}"))
                using (HttpContent conteudo = resposta.Content)
                {
                    string response = await conteudo.ReadAsStringAsync();

                    resultado = JsonConvert.DeserializeObject<ObjectResponse<Movie>>(response, settings);
                }
            }
            catch (Exception ex) { }

            return resultado.data;
        }

        public async Task<List<Movie>> GetMoviesByName(int page, string search)
        {
            ObjectResponse<Movie> resultado = null;
            try
            {

                using (HttpResponseMessage resposta = await _client.GetAsync($"movies/getmoviesbysearch?page={page}&&search={search}"))
                using (HttpContent conteudo = resposta.Content)
                {
                    string response = await conteudo.ReadAsStringAsync();

                    resultado = JsonConvert.DeserializeObject<ObjectResponse<Movie>>(response, settings);
                }

            }
            catch (Exception ex) { }

            return resultado.data;
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
