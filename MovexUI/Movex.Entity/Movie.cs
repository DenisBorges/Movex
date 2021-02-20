using System;
using System.Collections.Generic;
using System.Text;

namespace Movex.Entity
{
    public class Movie
    {
        public int id { get; set; }
        public string Titulo { get; set; }
        public string Nota { get; set; }
        public string Idioma { get; set; }
        public string ImgSrc { get; set; }
        public string Link { get; set; }
        public string Genero { get; set; }
        public string Qualidade { get; set; }
        public bool isDownloaded { get; set; }
        public MagnetLink magnetLink { get; set; }

    }
}
