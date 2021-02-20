using Movex.Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Movex.Services
{
    public interface IMovexServiceClient
    {
        Task<List<Movie>> GetMovies(int page);
        Task<List<Movie>> GetMoviesByGenre(int page, string genero);
        Task<List<Movie>> GetMoviesByName(int page, string search);
        Task<List<MagnetLink>> GetMagnetLinks(string link);
    }
}
