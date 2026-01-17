using GastosResidenciaisAPI.Domain.DTOs.CategoriaDTOs;
using GastosResidenciaisAPI.Domain.Enums;
using GastosResidenciaisAPI.Domain.Model.CategoriaAggregate;
using GastosResidenciaisAPI.Infraestrutura;

namespace GastosResidenciaisAPI.Application.Services
{
    public class CategoriaService : ICategoriaService
    {
        public readonly ConnectionContext _context;

        public CategoriaService(ConnectionContext context)
        {
            _context = context;
        }

        public int Criar(CategoriaCreateDto dto)
        {
            var categoria = new Categoria
            {
                descricao = dto.Descricao,
                finalidade = dto.Finalidade
            };

            _context.Categorias.Add(categoria);
            _context.SaveChanges();

            return categoria.id;
        }

        public IEnumerable<CategoriaResponseDto> Listar()
        {
            return _context.Categorias.Select(c => new CategoriaResponseDto
            {
                Id = c.id,
                Descricao = c.descricao,
                Finalidade = c.finalidade
            }).ToList();
        }

        public void Delete(int id) 
        {
            var categoria = _context.Categorias.Find(id);
            if (categoria == null)
            {
                throw new Exception("Categoria não encontrada.");
            }
           
            _context.Categorias.Remove(categoria);
            _context.SaveChanges();

        }

    }
}
