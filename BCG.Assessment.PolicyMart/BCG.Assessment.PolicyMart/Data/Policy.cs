using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace BCG.Assessment.PolicyMart.Data
{
    public class Policy
    {
        //policy id
        [Key]
        public int Id { get; set; }

        //customer id
        public string CustomerId { get; set; }

        //date of purchase
        public DateTime DOP { get; set; }
        //fuel
        [JsonConverter(typeof(StringEnumConverter))]
        public FuelType Fuel { get; set; }

        //vehicle segment
        [JsonConverter(typeof(StringEnumConverter))]
        public VehicleSegment Segment { get; set; }

        public double Premium { get; set; }

        public bool BodilyInjuryLiability { get; set; }
        public bool PersonalInjuryProtection { get; set; }
        public bool PropertyDamageLiability { get; set; }
        public bool Collision { get; set; }

        public bool IsComprehensive { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public GenderType Gender { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public MartialStatusType MartialStatus { get; set; }
        public string IncomeGroup { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public Region CustomerRegion { get; set; }

    }

    public enum FuelType
    {
        CNG = 0,
        Petrol = 1,
        Diesel = 2
    }

    public enum VehicleSegment
    {
        A,
        B,
        C
    }
    public enum GenderType
    {
        Male = 0,
        Female
    }

    public enum Region
    {
        North,
        South,
        East,
        West
    }
    public enum MartialStatusType
    {
        Single = 0,
        Married = 1
    }
}
