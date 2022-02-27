using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BCG.Assessment.PolicyMart.Models;
using BCG.Assessment.PolicyMart.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BCG.Assessment.PolicyMart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        private readonly IAnalyticsService _analyticsService;

        public AnalyticsController(IAnalyticsService analyticsService)
        {
            _analyticsService = analyticsService;
        }

        [HttpGet("dashboard")]
        public DashboardAnalytics GetDashboardAnalytics()
        {
            return _analyticsService.GetDashbaordStats();
        }
    }
}
