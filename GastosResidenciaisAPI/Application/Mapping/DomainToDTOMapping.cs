using AutoMapper;
using GastosResidenciaisAPI.Domain.DTOs;
using GastosResidenciaisAPI.Domain.Model;

namespace GastosResidenciaisAPI.Application.Mapping
{
    public class DomainToDTOMapping : Profile
    {
        public DomainToDTOMapping()
        {
            CreateMap<Employee, EmployeeDTO>()
                .ForMember(dest => dest.NomeEmp, m => m.MapFrom(orig => orig.nome));
                
        }
    }
}
