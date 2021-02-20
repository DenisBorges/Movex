using Microsoft.AspNetCore.Mvc;
using Movex.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Movex.Views.Shared.Components
{
    public class MovieHomeComponent : ViewComponent
    {
        private readonly IMovexServiceClient _movex;
        public MovieHomeComponent(IMovexServiceClient movex)
        {
            _movex = movex;
        }
        public async Task<IViewComponentResult> InvokeAsync(int page = 1)
        {

            var lst = await _movex.GetMovies(page);

            return View(lst);
        }

    }
}
