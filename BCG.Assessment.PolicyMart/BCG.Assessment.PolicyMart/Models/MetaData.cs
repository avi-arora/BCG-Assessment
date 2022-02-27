using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BCG.Assessment.PolicyMart.Models
{
    public class MetaData
    {
        public Dictionary<int, string> GenderList { get; set; }
        public Dictionary<int, string> RegionList { get; set; }
        public Dictionary<int, string> MartialStatusList { get; set; }
        public Dictionary<int, string> FuelTypeList { get; set; }
        public Dictionary<int, string> SegmentList { get; set; }
        public List<string> IncomeGroups { get; set; }
    }
}
