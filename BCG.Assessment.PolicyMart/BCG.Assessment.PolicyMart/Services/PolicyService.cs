using BCG.Assessment.PolicyMart.Data;
using BCG.Assessment.PolicyMart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BCG.Assessment.PolicyMart.Services
{
    public class PolicyService : IPolicyService
    {
        private readonly PolicyDbContext _policyContext;
        public PolicyService(PolicyDbContext dbContext)
        {
            _policyContext = dbContext;
        }

        public async Task<bool> Add(Policy model)
        {
            try
            {
                await _policyContext.Policies.AddAsync(model);
                _policyContext.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }

        public bool Delete(int id)
        {
            try
            {
                var objToBeDeleted = _policyContext.Policies.Where(i => i.Id == id).FirstOrDefault();
                _policyContext.Policies.Remove(objToBeDeleted);
                _policyContext.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public IEnumerable<Policy> GetAll()
        {
            return _policyContext.Policies;
        }

        public Policy GetById(int id)
        {
            return _policyContext.Policies.Where(i => i.Id == id).FirstOrDefault();
        }

        public MetaData GetMetadata()
        {
            return new MetaData
            {
                GenderList = Enum.GetValues(typeof(GenderType)).Cast<GenderType>().ToDictionary(i => (int)i, j => j.ToString()),
                FuelTypeList = Enum.GetValues(typeof(FuelType)).Cast<FuelType>().ToDictionary(i => (int)i, j => j.ToString()),
                MartialStatusList = Enum.GetValues(typeof(MartialStatusType)).Cast<MartialStatusType>().ToDictionary(i => (int)i, j => j.ToString()),
                RegionList = Enum.GetValues(typeof(Region)).Cast<Region>().ToDictionary(i => (int)i, j => j.ToString()),
                SegmentList = Enum.GetValues(typeof(VehicleSegment)).Cast<VehicleSegment>().ToDictionary(i => (int)i, j => j.ToString()),
                IncomeGroups = _policyContext.Policies.Select(i => i.IncomeGroup).Distinct().ToList()
        };
        }

        public ApiResponse<List<Policy>> GetPaginated(int currentPage, int pageSize)
        {
            var data = _policyContext.Policies.Skip(pageSize * currentPage).Take(pageSize);
            var count = _policyContext.Policies.Count();
            return new ApiResponse<List<Policy>> { Data = data.ToList(), TotalRecords = count };
        }

        public ApiResponse<List<Policy>> Search(string query)
        {
            var data = _policyContext.Policies.Where(i => i.Id  == Convert.ToInt32(query) || i.CustomerId.StartsWith(query)).Take(10).ToList();
            var count = data.Count();
            return new ApiResponse<List<Policy>> { Data = data, TotalRecords = count };
        }

        public bool Update(Policy model)
        {
            try
            {
                _policyContext.Policies.Update(model);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
