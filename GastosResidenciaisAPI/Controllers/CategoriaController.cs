using GastosResidenciaisAPI.Domain.DTOs.CategoriaDTOs;
using GastosResidenciaisAPI.Domain.Model.CategoriaAggregate;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciaisAPI.Controllers
{
    [ApiController]
    [Route("api/categorias")]
    public class CategoriaController : ControllerBase
    {
        public ICategoriaService _categoriaService;
        public CategoriaController(ICategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpPost]
        public IActionResult create([FromBody] CategoriaCreateDto dto)
        {
            var id = _categoriaService.Criar(dto);
            return CreatedAtAction(nameof(GetAll), new { id = id }, null);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var categorias = _categoriaService.Listar();
            return Ok(categorias);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoriaService.Delete(id);
            return NoContent();
        }
    }
}
