using GastosResidenciaisAPI.API.DTOs.PessoaDTOs;

namespace GastosResidenciaisAPI.Application.Interfaces
{
    public interface IPessoaService
    {
        int Criar(PessoaCreateDto dto);
        IEnumerable<PessoaResponseDto> Listar();
        void Deletar(int id);
    }
}
