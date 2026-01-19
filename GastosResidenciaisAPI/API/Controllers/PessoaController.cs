using GastosResidenciaisAPI.API.DTOs.PessoaDTOs;
using GastosResidenciaisAPI.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciaisAPI.API.Controllers
{
    [ApiController]
    [Route("api/pessoas")]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaService _pessoaService;

        public PessoaController(IPessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        /// <summary>
        /// Cria uma nova pessoa
        /// </summary>
        [HttpPost]
        public IActionResult Create([FromBody] PessoaCreateDto dto)
        {
            var id = _pessoaService.Criar(dto);
            return CreatedAtAction(nameof(GetAll), new { id }, null);
        }

        /// <summary>
        /// Lista todas as pessoas cadastradas
        /// </summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            var pessoas = _pessoaService.Listar();
            return Ok(pessoas);
        }

        /// <summary>
        /// Deleta uma pessoa pelo ID
        /// Atenção: ao deletar, todas as transações relacionadas também serão removidas
        /// </summary>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _pessoaService.Deletar(id);
            return NoContent();
        }
    }
}
