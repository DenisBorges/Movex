using NUnit.Framework;

namespace Movex.Services.Test
{
    public class Tests
    {
        private readonly IMovexServiceClient _client;

        public string genero = "comedia";
        public int page = 1;

        public Tests(IMovexServiceClient client)
        {
            _client = client;
        }

        

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async void GetMovies()
        {
            var result  = await _client.GetMovies(page);

            Assert.NotNull(result);
        }


        [Test]
        public async void GetMoviesByGenre()
        {
            var result = await _client.GetMoviesByGenre(page,genero);

            Assert.NotNull(result);
        }
    }
}