using GastosResidenciaisAPI.Domain.DTOs.CategoriaDTOs;

namespace GastosResidenciaisAPI.Domain.Model.CategoriaAggregate
{
    public interface ICategoriaService
    {
        int Criar(CategoriaCreateDto dto);
        IEnumerable<CategoriaResponseDto> Listar();
        void Delete(int id);
    }
}
