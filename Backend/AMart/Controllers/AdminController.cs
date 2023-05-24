using Domain.Contacts;
using Domain.Models;
using Domain.ViewModels;
using Infrastructure.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AMart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IProductRepo _productRepo;
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public AdminController(IProductRepo productRepo, ApplicationDbContext appDbContext, UserManager<IdentityUser> userManager)
        {
            _productRepo = productRepo;
            _appDbContext = appDbContext;
            _userManager = userManager;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Admin()
        {
            return Ok(_productRepo.AllProducts);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] ProductDb product)
        {
            ProductDb temp = new ProductDb();
            temp.Name = product.Name;
            temp.Price = product.Price;
            temp.Image = product.Image;
            temp.Details = product.Details;
            temp.Category = product.Category;
            temp.Stock = product.Stock;

            _appDbContext.Products.Add(temp);
            _appDbContext.SaveChanges();
            return Ok(new Response { Status = "Success", Message = "Product added successfully!" });
        }


        [Route("Delete")]
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> DeleteProduct([FromBody] int productId)
        {
            var productToBeDeleted = _productRepo.AllProducts.SingleOrDefault(x => x.Id == productId);

            _appDbContext.Products.Remove(productToBeDeleted);
            _appDbContext.SaveChanges();
            return Ok(new Response { Status = "Success", Message = "Product deleted successfully!" });
        }


        [Route("Update")]
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductDb product)
        {
            var itemToBeEdited = _productRepo.AllProducts.SingleOrDefault(x=>x.Id == product.Id);

            _appDbContext.Products.Update(itemToBeEdited).CurrentValues.SetValues(product);
            _appDbContext.SaveChanges();
            return Ok(new Response { Status = "Success", Message = "Product updated successfully!" });
        }


        [Route("Orders")]
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Orders()
        {
            return Ok(_appDbContext.Orders);
        }
    }
}
