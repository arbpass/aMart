using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class CartDb
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string UserGuid { get; set; }
    }
}
