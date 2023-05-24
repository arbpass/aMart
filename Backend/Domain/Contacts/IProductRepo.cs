﻿using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Contacts
{
    public interface IProductRepo
    {
        IEnumerable<ProductDb> AllProducts { get; } //returning all user in IEnumerable
    }
}
