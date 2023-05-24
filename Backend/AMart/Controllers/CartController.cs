using Domain.Contacts;
using Domain.Models;
using Infrastructure.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AMart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IProductRepo _productRepo;
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public CartController(IProductRepo productRepo, ApplicationDbContext appDbContext, UserManager<IdentityUser> userManager)
        {
            _productRepo = productRepo;
            _appDbContext = appDbContext;
            _userManager = userManager;
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public async Task<IActionResult> Cart()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var itemsInCart = _appDbContext.Cart.Where(x => x.UserGuid == user.Id);
            List<int> allItemId = new List<int>();
            foreach (var item in itemsInCart) { allItemId.Add(item.ProductId); }

            List<ProductDb> allCartProducts = new List<ProductDb>();
            foreach (var id in allItemId)
            {
                allCartProducts.Add(_productRepo.AllProducts.SingleOrDefault(x => x.Id == id));
            }

            return Ok(new { allCartProducts, user });
        }


        [Authorize(Roles = "User")]
        [HttpPost]
        public async Task<IActionResult> RemoveFromCart([FromBody]int productId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var itemToBeDeleted = _appDbContext.Cart.FirstOrDefault(x => x.ProductId == productId);
            _appDbContext.Cart.Remove(itemToBeDeleted);
            _appDbContext.SaveChanges();

            return Ok();
        }

    }
}
