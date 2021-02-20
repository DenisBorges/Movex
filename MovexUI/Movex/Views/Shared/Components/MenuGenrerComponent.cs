using Microsoft.AspNetCore.Mvc;
using Movex.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Movex.Views.Shared.Components
{
    public class MenuGenrerComponent:ViewComponent
    {
        public IViewComponentResult Invoke()
        {

            var lst = GetMenus();

            return View(lst);
        }

        private List<MenuExibicao> GetMenus()
        {
            List<MenuExibicao> generos = new List<MenuExibicao>();

            Type t = typeof(EnumGeneros);
            FieldInfo[] fields = t.GetFields(BindingFlags.Static | BindingFlags.Public);

            foreach (FieldInfo fi in fields)
            {
                var obj = (string[])fi.GetValue(null);

                generos.Add(new MenuExibicao(obj[0], obj[1]));

            }

            return generos;
        }
    }
}
