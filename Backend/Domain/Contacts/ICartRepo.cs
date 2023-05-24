using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Contacts
{
    public interface ICartRepo
    {
        IEnumerable<CartDb> AllCart { get; } //returning all user in IEnumerable
    }
}
