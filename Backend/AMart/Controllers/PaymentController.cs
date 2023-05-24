using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Domain.Models.Payment;
using Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace RazorpayWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ILogger<PaymentController> _logger;
        private readonly IPaymentService _service;
        private IHttpContextAccessor _httpContextAccessor;
        public PaymentController(ILogger<PaymentController> logger, IPaymentService service, IHttpContextAccessor httpContextAccessor)
        {
            _logger = logger;
            _service = service;
            _httpContextAccessor = httpContextAccessor;
        }

        [Authorize]
        [Route("Process")]
        [HttpPost]
        public async Task<IActionResult> ProcessRequestOrder(PaymentRequest _paymentRequest)
        {
            MerchantOrder _marchantOrder = await _service.ProcessMerchantOrder(_paymentRequest);
            return Ok(_marchantOrder);
        }


        [Authorize]
        [Route("Complete")]
        [HttpPost]
        public async Task<IActionResult> CompleteOrderProcess(PaymentResponse _paymentResponse)
        {
            string PaymentMessage = await _service.CompleteOrderProcess(_paymentResponse);
            if (PaymentMessage == "captured")
            {
                return Ok(new Response { Status = "Success", Message = "Payment done successfully!" });
            }
            else
            {
                return BadRequest(new Response { Status = "Failed", Message = "Payment Failed!" });
            }
        }
        
    }
}
