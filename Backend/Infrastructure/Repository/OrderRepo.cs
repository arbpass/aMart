using Domain.Contacts;
using Domain.Models;
using Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{
    public class OrderRepo: IOrderRepo
    {
        private readonly ApplicationDbContext _appDbContext;

        public OrderRepo(ApplicationDbContext appDbContext) //accessing to appDbContext
        {
            _appDbContext = appDbContext;
        }

        public IEnumerable<OrderDb> AllOrders
        {
            get
            {
                return _appDbContext.Orders;
            }
        }
    }
}
