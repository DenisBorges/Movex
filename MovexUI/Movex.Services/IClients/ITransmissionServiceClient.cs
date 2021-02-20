using Movex.Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Movex.Services
{
    public interface ITransmissionServiceClient
    {
        Task<bool> TorrentAddStart(Movie movie);
        Task<decimal?> GetDirectoryFreeSpace();
    }
}
