using LumenWorks.Framework.IO.Csv;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data;
using System.IO;

namespace BCG.Assessment.PolicyMart.Data
{
    public class PolicyDbContext : DbContext, IDisposable
    {
        public DbSet<Policy> Policies { get; set; }
        public PolicyDbContext(DbContextOptions<PolicyDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public void Disponse()
        {
            Database.EnsureDeleted();
        }
      
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var csvTable = new DataTable();
            using (var csvReader = new CsvReader(new StreamReader(System.IO.File.OpenRead(@"StaticData\DataSet.csv")), true))
            {
                csvTable.Load(csvReader);
            }
            modelBuilder.Entity<Policy>(entity => {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CustomerId);
                entity.Property(e => e.DOP);
                entity.Property(e => e.Fuel);
                entity.Property(e => e.Segment);
                entity.Property(e => e.Premium);
                entity.Property(e => e.BodilyInjuryLiability);
                entity.Property(e => e.CustomerRegion);
                entity.Property(e => e.Collision);
                entity.Property(e => e.IncomeGroup).HasMaxLength(10);
                entity.Property(e => e.Gender);
                entity.Property(e => e.IsComprehensive);
                entity.Property(e => e.MartialStatus);
                entity.Property(e => e.PersonalInjuryProtection);
                entity.Property(e => e.PropertyDamageLiability);
            });
            
            for (int i = 0; i < csvTable.Rows.Count; i++)
            {
                modelBuilder.Entity<Policy>().HasData(new Policy
                {
                    Id = Convert.ToInt32(csvTable.Rows[i][0].ToString()),
                    DOP = DateTime.Parse(csvTable.Rows[i][1].ToString()),
                    CustomerId = csvTable.Rows[i][2].ToString(),
                    Fuel = (FuelType)Enum.Parse(typeof(FuelType), csvTable.Rows[i][3].ToString(), true),
                    Segment = (VehicleSegment)Enum.Parse(typeof(VehicleSegment), csvTable.Rows[i][4].ToString(), true),
                    Premium = double.Parse(csvTable.Rows[i][5].ToString(), System.Globalization.CultureInfo.InvariantCulture),
                    BodilyInjuryLiability = !csvTable.Rows[i][6].ToString().Equals("0"),
                    PersonalInjuryProtection = !csvTable.Rows[i][7].ToString().Equals("0"),
                    PropertyDamageLiability = !csvTable.Rows[i][8].ToString().Equals("0"),
                    Collision = !csvTable.Rows[i][9].ToString().Equals("0"),
                    IsComprehensive = !csvTable.Rows[i][10].ToString().Equals("0"),
                    Gender = (GenderType)Enum.Parse(typeof(GenderType), csvTable.Rows[i][11].ToString(), true),
                    IncomeGroup = csvTable.Rows[i][12].ToString(),
                    CustomerRegion = (Region)Enum.Parse(typeof(Region), csvTable.Rows[i][13].ToString(), true),
                    MartialStatus = (MartialStatusType)Enum.ToObject(typeof(MartialStatusType), Convert.ToInt32(csvTable.Rows[i][14].ToString()))
                });
            }

        }


    }
}
