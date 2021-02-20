using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Movex.Models
{
    public class MenuExibicao
    {
        public MenuExibicao(string _nome,string _value)
        {
            this.Nome = _nome;
            this.Value = _value;
        }

        public string Nome { get; set; }
        public string Value { get; set; }
    }
}
