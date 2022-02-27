using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BCG.Assessment.PolicyMart.Data;
using BCG.Assessment.PolicyMart.Models;
using BCG.Assessment.PolicyMart.Services;
using Microsoft.AspNetCore.Mvc;

namespace BCG.Assessment.PolicyMart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PolicyController : ControllerBase
    {
        private readonly IPolicyService _policyService;
        public PolicyController(IPolicyService policyService)
        {
            _policyService = policyService;
        }

        [HttpGet("all")]
        public List<Policy> GetAll()
        {
            return _policyService.GetAll().ToList();
        }

        [HttpPut("Add")]
        public async Task<bool> Add([FromBody] Policy model)
        {
            return await _policyService.Add(model);
        }

        [HttpPut("Update")]
        public bool Update([FromBody] Policy model)
        {
            return _policyService.Update(model);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete([FromRoute] int id)
        {
            return _policyService.Delete(id);
        }

        [HttpGet("get/{id}")]
        public Policy GetById([FromRoute] int id)
        {
            return _policyService.GetById(id);
        }

        [HttpGet("Search")]
        public ApiResponse<List<Policy>> Search([FromQuery] string query)
        {
            if(query == null) { return null; }
            return _policyService.Search(query); 
        }

        [HttpGet("GetPaginated")]
        public ApiResponse<List<Policy>> GetPaginated([FromQuery] int currentPage, int pageSize)
        {
            return _policyService.GetPaginated(currentPage, pageSize);
        }
        [HttpGet("metadata")]
        public MetaData GetMetaData()
        {
            return _policyService.GetMetadata();
        }


    }
}
