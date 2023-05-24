using Domain.Contacts;
using Domain.Models;
using Domain.ViewModels;
using Infrastructure.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace AMart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IProductRepo _productRepo;
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public OrderController(IProductRepo productRepo, ApplicationDbContext appDbContext, UserManager<IdentityUser> userManager)
        {
            _productRepo = productRepo;
            _appDbContext = appDbContext;
            _userManager = userManager;
        }

        [Authorize(Roles = "User")]
        [HttpPost("{totalPrice}")]
        public async Task<IActionResult> Order(int totalPrice, [FromBody]object orders)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            OrderDb temp = new OrderDb();
            temp.Orders = orders.ToString();
            temp.OrderPrice = totalPrice;
            temp.UserGuid = user.Id;

            TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("Asia/Kolkata");
            DateTime indianTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE);
            temp.OrderTime = indianTime.ToString("F");

            _appDbContext.Orders.Add(temp);
            _appDbContext.SaveChanges();

            _appDbContext.Cart.RemoveRange(_appDbContext.Cart.Where(x => x.UserGuid == user.Id));
            _appDbContext.SaveChanges();

            return Ok();
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var orders = _appDbContext.Orders.Where(x => x.UserGuid == user.Id);

            return Ok(orders);
        }
    }
}
