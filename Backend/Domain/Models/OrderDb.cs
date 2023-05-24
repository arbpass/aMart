using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class OrderDb
    {
        [Key]
        public int Id { get; set; }

        public string Orders { get; set; }
        public int OrderPrice { get; set; }
        public string UserGuid { get; set; }
        public string OrderTime { get; set; }
    }
}
