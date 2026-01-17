using GastosResidenciaisAPI.Domain.DTOs.PessoaDTOs;
using GastosResidenciaisAPI.Domain.Model.PessoaAggregate;
using GastosResidenciaisAPI.Infraestrutura;
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

        public IEnumerable<PessoaResponseDto> Listar()
        {
            return _context.Pessoas.Select(p => new PessoaResponseDto
            {
                Id = p.id,
                Nome = p.nome,
                Idade = p.idade
            }).ToList();
        }

        public void Deletar(int id)
        {
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
