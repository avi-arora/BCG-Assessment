using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BCG.Assessment.PolicyMart.Models
{
    public class ApiResponse<T>
    {
        public int TotalRecords { get; set; }

        public T Data { get; set; }

    }
}
