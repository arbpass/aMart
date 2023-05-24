﻿using Domain.Contacts;
using Domain.Models;
using Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{
    public class CartRepo: ICartRepo
    {
        private readonly ApplicationDbContext _appDbContext;

        public CartRepo(ApplicationDbContext appDbContext) //accessing to appDbContext
        {
            _appDbContext = appDbContext;
        }

        public IEnumerable<CartDb> AllCart
        {
            get
            {
                return _appDbContext.Cart;
            }
        }
    }
}
