using GastosResidenciaisAPI.API.DTOs.CategoriaDTOs;
using GastosResidenciaisAPI.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciaisAPI.API.Controllers
{
    [ApiController]
    [Route("api/categorias")]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaService _categoriaService;

        public CategoriaController(ICategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        /// <summary>
        /// Cria uma nova categoria
        /// </summary>
        [HttpPost]
        public IActionResult Create([FromBody] CategoriaCreateDto dto)
        {
            var id = _categoriaService.Criar(dto);
            return CreatedAtAction(nameof(GetAll), new { id }, null);
        }

        /// <summary>
        /// Lista todas as categorias cadastradas
        /// </summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            var categorias = _categoriaService.Listar();
            return Ok(categorias);
        }

        /// <summary>
        /// Deleta uma categoria pelo ID
        /// </summary>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoriaService.Delete(id);
            return NoContent();
        }
    }
}
