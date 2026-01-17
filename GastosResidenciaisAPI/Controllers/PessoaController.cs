using GastosResidenciaisAPI.Domain.DTOs.PessoaDTOs;
using GastosResidenciaisAPI.Domain.Model.PessoaAggregate;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciaisAPI.Controllers
{
    [ApiController]
    [Route("api/pessoas")]
    public class PessoaController : ControllerBase
    {
        public IPessoaService _pessoaService;

        public PessoaController(IPessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] PessoaCreateDto dto)
        {
            var id = _pessoaService.Criar(dto);
            return CreatedAtAction(nameof(GetAll), new { id = id }, null);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var pessoas = _pessoaService.Listar();
            return Ok(pessoas);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _pessoaService.Deletar(id);
            return NoContent();
        }
    }
}
