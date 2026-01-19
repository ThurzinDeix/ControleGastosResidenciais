using GastosResidenciaisAPI.API.DTOs.CategoriaDTOs;
using GastosResidenciaisAPI.Application.Interfaces;
using GastosResidenciaisAPI.Domain.Enums;
using GastosResidenciaisAPI.Domain.Entities;
using GastosResidenciaisAPI.Infraestrutura.Data;

namespace GastosResidenciaisAPI.Application.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly ConnectionContext _context;

        public CategoriaService(ConnectionContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Cria uma nova categoria
        /// </summary>
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

        /// <summary>
        /// Lista todas as categorias cadastradas
        /// </summary>
        public IEnumerable<CategoriaResponseDto> Listar()
        {
            return _context.Categorias.Select(c => new CategoriaResponseDto
            {
                Id = c.id,
                Descricao = c.descricao,
                Finalidade = c.finalidade
            }).ToList();
        }

        /// <summary>
        /// Deleta uma categoria pelo ID
        /// </summary>
        public void Delete(int id)
        {
            var categoria = _context.Categorias.Find(id);

            if (categoria == null)
            {
                // Retorna erro se a categoria não existir
                throw new Exception("Categoria não encontrada.");
            }

            _context.Categorias.Remove(categoria);
            _context.SaveChanges();
        }
    }
}
