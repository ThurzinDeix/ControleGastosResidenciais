using GastosResidenciaisAPI.Domain.DTOs.PessoaDTOs;

namespace GastosResidenciaisAPI.Domain.Model.PessoaAggregate
{
    public interface IPessoaService
    {
        int Criar(PessoaCreateDto dto);
        IEnumerable<PessoaResponseDto> Listar();
        void Deletar(int id);
    }
}
