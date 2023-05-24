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
    public class ProductRepo: IProductRepo
    {
        private readonly ApplicationDbContext _appDbContext;

        public ProductRepo(ApplicationDbContext appDbContext) //accessing to appDbContext
        {
            _appDbContext = appDbContext;
        }

        public IEnumerable<ProductDb> AllProducts
        {
            get
            {
                return _appDbContext.Products;
            }
        }
    }
}
