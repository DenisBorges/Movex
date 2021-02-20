using Microsoft.Extensions.DependencyInjection;
using Movex.Services;
using Movex.Services.Clients;
using System;
using System.Collections.Generic;
using System.Text;

namespace Movex.CrossCutting.Middlewares
{
    public static class HttpClientFactoryMiddleware
    {

        public static void AddHttpClientFactory(this IServiceCollection service)
        {
            //service.AddHttpClient<IMovexServiceClient, MovexServiceClient>();
        }
    }
}
