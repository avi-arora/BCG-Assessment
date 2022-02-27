using BCG.Assessment.PolicyMart.Data;
using BCG.Assessment.PolicyMart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BCG.Assessment.PolicyMart.Services
{
    public interface IPolicyService
    {
        IEnumerable<Policy> GetAll();
        ApiResponse<List<Policy>> GetPaginated(int page, int offset);

        ApiResponse<List<Policy>> Search(string query);
        Task<bool> Add(Policy model);
        bool Update(Policy model);
        bool Delete(int id);

        Policy GetById(int id);

        MetaData GetMetadata();

       
    }
}
