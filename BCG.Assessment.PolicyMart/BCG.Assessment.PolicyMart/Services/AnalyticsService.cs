using BCG.Assessment.PolicyMart.Data;
using BCG.Assessment.PolicyMart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BCG.Assessment.PolicyMart.Services
{
    public class AnalyticsService : IAnalyticsService
    {
        private readonly PolicyDbContext _policyDbContext;
        public AnalyticsService(PolicyDbContext dbContext)
        {
            _policyDbContext = dbContext;
        }

        public DashboardAnalytics GetDashbaordStats()
        {
            var policyByMonth = _policyDbContext.Policies.GroupBy(
        policy => policy.DOP.Month,
        policy => policy,
        (month, ids) => new
        {
            Key = System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month),
            Count = ids.Count(),
        }).ToDictionary(i => i.Key, i => i.Count);

            var fuelTypeCount = _policyDbContext.Policies.GroupBy(
       policy => policy.Fuel,
       policy => policy,
       (fuel, policy) => new
       {
           Key = fuel,
           Count = policy.Count(),
       }).ToDictionary(i => i.Key, i => i.Count);

            var policyByRegion = _policyDbContext.Policies.GroupBy(
               policy => policy.CustomerRegion,
               policy => policy,
               (region, ids) => new
               {
                   Key = region,
                   Count = ids.Count(),
               }).ToDictionary(i => i.Key, i => i.Count);

            var policyPremiumByMonth = _policyDbContext.Policies.GroupBy(
               policy => policy.DOP.Month,
               policy => policy,
               (monthNumber, policies) => new
               {
                   Key = System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(monthNumber),
                   Sum = policies.Sum(i => i.Premium),
               }).ToDictionary(i => i.Key, i => i.Sum);

            var policyOwnedByGender = _policyDbContext.Policies.GroupBy(
               policy => policy.Gender,
               policy => policy,
               (gender, policies) => new
               {
                   Key = gender,
                   Sum = policies.Count(),
               }).ToDictionary(i => i.Key, i => i.Sum);

            return new DashboardAnalytics {
            PolicyCountPerMonth = policyByMonth,
            PolicyPremiunByMonth = policyPremiumByMonth,
            PolicyOwnedByGender = policyOwnedByGender, 
            PolicyCountByRegion = policyByRegion, 
            PolicyByFuelType = fuelTypeCount
            };
        }
    }
}
