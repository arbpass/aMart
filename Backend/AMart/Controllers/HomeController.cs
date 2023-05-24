using Domain.Contacts;
using Domain.Models;
using Domain.ViewModels;
using Infrastructure.Context;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http.Headers;
using System.Net.Http;

namespace AMart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IProductRepo _productRepo;
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public HomeController(IProductRepo productRepo, ApplicationDbContext appDbContext, UserManager<IdentityUser> userManager)
        {
            _productRepo = productRepo;
            _appDbContext = appDbContext;
            _userManager = userManager;
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        public async Task<IActionResult> Home()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var itemsInCart = _appDbContext.Cart.Where(x => x.UserGuid == user.Id);
            List<int> allItemId = new List<int>();
            foreach (var item in itemsInCart) { allItemId.Add(item.ProductId); }

            return Ok(new { _productRepo.AllProducts, allItemId, user});
        }

        [Authorize(Roles = "User")]
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody]int itemId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            CartDb temp = new CartDb();
            temp.ProductId = itemId;
            temp.UserGuid = user.Id;

            _appDbContext.Cart.Add(temp);
            _appDbContext.SaveChanges();

            var itemsInCart = _appDbContext.Cart.Where(x=> x.UserGuid == user.Id);
            List<int> allItemId = new List<int>();
            foreach(var item in itemsInCart) { allItemId.Add(item.ProductId);}
            

            return Ok(allItemId);
        }


        [Authorize(Roles = "User")]
        [HttpGet("{Category}")]
        public async Task<IActionResult> GetCategory(string category)
        {
            var products = _productRepo.AllProducts.Where(x => x.Category == category);
            return Ok(products);
        }
    }
}
