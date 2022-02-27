using BCG.Assessment.PolicyMart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BCG.Assessment.PolicyMart.Services
{
    public interface IAnalyticsService
    {
        DashboardAnalytics GetDashbaordStats();
    }
}
