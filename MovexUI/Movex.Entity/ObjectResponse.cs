using System;
using System.Collections.Generic;
using System.Text;

namespace Movex.Entity
{
    public class ObjectResponse<T> where T : class
    {
        public string status { get; set; }
        public int statusCode { get; set; }
        public string message { get; set; }
        public List<T> data { get; set; }

    }
}
