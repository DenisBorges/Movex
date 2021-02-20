using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Movex.Entity;
using Movex.Models;
using Movex.Services;
using Newtonsoft.Json.Linq;

namespace Movex.Controllers
{
    public class HomeController : BaseController
    {

        public HomeController(ILogger<HomeController> logger,
            IMovexServiceClient movex,
            ITransmissionServiceClient transmission,
            IHttpContextAccessor httpContextAccessor) :base(movex,transmission, httpContextAccessor)
        {
        }

        public async Task<IActionResult> Index(int page = 1,string returnUrl = null)
        {
            List<Movie> lstMovies = null;
            try
            {
                 lstMovies = await _movex.GetMovies(page);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
            
            return View(lstMovies);
        }

        [HttpGet]
        public async Task<IActionResult> _PartialListMovies(int page = 1,string genero ="", string search = "")
        {
            

            List<Movie> lst = new List<Movie>();

            if (!string.IsNullOrEmpty(search))
                lst = await _movex.GetMoviesByName(page, search);
            else if (!string.IsNullOrEmpty(genero))
                lst = await _movex.GetMoviesByGenre(page, genero);
            else
                lst = await _movex.GetMovies(page);

            _session.Set<List<Movie>>("MOVIELIST", lst);

            return PartialView("_PartialListCards",lst);

        }

        [HttpPost]
        public async Task<IActionResult> _PartialMagnetLinks([FromBody]Movie mov)
        {
            List<MagnetLink> lst = new List<MagnetLink>();

            lst = await _movex.GetMagnetLinks(mov.Link);

            return PartialView("_PartialListMagnetLinks", lst);

        }


        [HttpGet]
        public async Task<IActionResult> _PartialProgressBar()
        {

            var lst = await _transmission.GetDirectoryFreeSpace();

            return PartialView("_PartialProgressBar", lst);

        }

        public IActionResult MovieByGenre(int page = 1, string genero="", string returnUrl = null)
        {
            if (string.IsNullOrEmpty(genero))
                return RedirectToAction("Home");

            return View("MovieByGenre",genero);
        }

        [HttpPost]
        public async Task<IActionResult> StartTorrent([FromBody] MagnetLink mag)
        {
            bool result = false;

            var lstMovie = _session.Get<List<Movie>>("MOVIELIST") ?? new List<Movie>();

            if (lstMovie.Any())
            {
                var movie = lstMovie.ElementAt<Movie>(mag.idMovie);
                movie.magnetLink = mag;

                result = await _transmission.TorrentAddStart(movie);
            }
            
            return Json(result);

        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
