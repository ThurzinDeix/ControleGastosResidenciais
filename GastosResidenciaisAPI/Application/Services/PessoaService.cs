using GastosResidenciaisAPI.API.DTOs.PessoaDTOs;
using GastosResidenciaisAPI.Application.Interfaces;
using GastosResidenciaisAPI.Domain.Entities;
using GastosResidenciaisAPI.Infraestrutura.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciaisAPI.Application.Services
{
    public class PessoaService : IPessoaService
    {
        private readonly ConnectionContext _context;

        public PessoaService(ConnectionContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Cria uma nova pessoa
        /// </summary>
        public int Criar(PessoaCreateDto dto)
        {
            var pessoa = new Pessoa
            {
                nome = dto.Nome,
                idade = dto.Idade
            };

            _context.Pessoas.Add(pessoa);
            _context.SaveChanges();

            return pessoa.id;
        }

        /// <summary>
        /// Lista todas as pessoas cadastradas
        /// </summary>
        public IEnumerable<PessoaResponseDto> Listar()
        {
            return _context.Pessoas.Select(p => new PessoaResponseDto
            {
                Id = p.id,
                Nome = p.nome,
                Idade = p.idade
            }).ToList();
        }

        /// <summary>
        /// Deleta uma pessoa pelo ID
        /// Atenção: todas as transações relacionadas também serão removidas
        /// </summary>
        public void Deletar(int id)
        {
            // Inclui transações para garantir que sejam removidas junto da pessoa
            var pessoa = _context.Pessoas
                .Include(p => p.transacoes)
                .FirstOrDefault(p => p.id == id);

            if (pessoa == null)
                throw new Exception("Pessoa não encontrada");

            _context.Pessoas.Remove(pessoa);
            _context.SaveChanges();
        }
    }
}
