using BCG.Assessment.PolicyMart.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BCG.Assessment.PolicyMart.Models
{
    public class DashboardAnalytics
    {
        public Dictionary<string, int> PolicyCountPerMonth { get; set; }
        public Dictionary<Region, int> PolicyCountByRegion { get; set; }

        public Dictionary<string, double> PolicyPremiunByMonth { get; set; }

        public Dictionary<GenderType, int> PolicyOwnedByGender { get; set; }

        public Dictionary<FuelType, int> PolicyByFuelType { get; set; }
    }
}
