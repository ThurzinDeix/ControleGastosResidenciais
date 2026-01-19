using GastosResidenciaisAPI.API.DTOs.CategoriaDTOs;

namespace GastosResidenciaisAPI.Application.Interfaces
{
    public interface ICategoriaService
    {
        int Criar(CategoriaCreateDto dto);
        IEnumerable<CategoriaResponseDto> Listar();
        void Delete(int id);
    }
}
