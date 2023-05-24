using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Contacts
{
    public interface IOrderRepo
    {
        IEnumerable<OrderDb> AllOrders { get; } //returning all user in IEnumerable
    }
}
