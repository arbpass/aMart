using System.ComponentModel.DataAnnotations;

namespace Domain.Models.Payment
{
    public class PaymentResponse
    {
        [Required]
        public string OrderId { get; set; }
        [Required]
        public string PaymentId { get; set; }
        [Required]
        public string Signature { get; set; }
    }
}
