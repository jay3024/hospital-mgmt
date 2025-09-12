import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Hospital, 
  Users, 
  UserCheck, 
  Activity, 
  Loader2, 
  TrendingUp, 
  TrendingDown,
  Stethoscope,
  Heart,
  AlertTriangle,
  Calendar,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { Doctor, Hospital as HospitalType, Patient } from "@/types/api";
import { GetAllDoctor, GetAllHospital, GetAllPatients } from "@/api";

const Dashboard = () => {
  const [hospitals, setHospitals] = useState<HospitalType[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from APIs
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch hospitals and doctors
      const [hospitalsResponse, doctorsResponse] = await Promise.all([
        fetch(GetAllHospital),
        fetch(GetAllDoctor)
      ]);

      if (!hospitalsResponse.ok || !doctorsResponse.ok) {
        throw new Error('Failed to fetch hospitals and doctors data');
      }

      const hospitalsData = await hospitalsResponse.json();
      const doctorsData = await doctorsResponse.json();

      setHospitals(hospitalsData);
      setDoctors(doctorsData);

      // Fetch all patients (linked and unlinked)
      try {
        const patientsResponse = await fetch(GetAllPatients, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hospitalId: 0,
            showAll: true
          })
        });

        if (patientsResponse.ok) {
          const patientsData = await patientsResponse.json();
          setPatients(patientsData);
        }
      } catch (err) {
        console.warn('Failed to fetch patients data:', err);
        // Continue without patients data
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate statistics with proper null checks
  const totalHospitals = hospitals.length || 0;
  const activeHospitals = hospitals.filter(h => h?.status === 'Active').length || 0;
  const inactiveHospitals = hospitals.filter(h => h?.status === 'Inactive').length || 0;
  
  const totalPatients = patients.length || 0;
  const admittedPatients = patients.filter(p => p?.status === 'Admitted').length || 0;
  const criticalPatients = patients.filter(p => p?.status === 'Critical').length || 0;
  const dischargedPatients = patients.filter(p => p?.status === 'Discharged').length || 0;
  const stablePatients = patients.filter(p => p?.status === 'Stable').length || 0;
  const notLinkedPatients = patients.filter(p => p?.hospitalId === 0).length || 0;
  
  const totalDoctors = doctors.length || 0;
  const doctorsBySpecialization = doctors.reduce((acc, doctor) => {
    const spec = doctor?.specialization || 'General';
    acc[spec] = (acc[spec] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const totalBeds = hospitals.reduce((sum, h) => sum + (h?.totalBeds || 0), 0);
  const availableBeds = hospitals.reduce((sum, h) => sum + (h?.availableBeds || 0), 0);
  const occupiedBeds = Math.max(0, totalBeds - availableBeds);
  const bedOccupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  // Get recent data (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentHospitals = hospitals
    .filter(h => {
      try {
        const establishedDate = new Date(h?.established);
        return !isNaN(establishedDate.getTime()) && establishedDate >= sevenDaysAgo;
      } catch {
        return false;
      }
    })
    .sort((a, b) => {
      try {
        const dateA = new Date(a?.established);
        const dateB = new Date(b?.established);
        return dateB.getTime() - dateA.getTime();
      } catch {
        return 0;
      }
    })
    .slice(0, 5);

  const recentDoctors = doctors
    .filter(d => {
      try {
        const createdDate = new Date(d?.createdAt);
        return !isNaN(createdDate.getTime()) && createdDate >= sevenDaysAgo;
      } catch {
        return false;
      }
    })
    .sort((a, b) => {
      try {
        const dateA = new Date(a?.createdAt);
        const dateB = new Date(b?.createdAt);
        return dateB.getTime() - dateA.getTime();
      } catch {
        return 0;
      }
    })
    .slice(0, 5);

  const recentPatients = patients
    .filter(p => {
      try {
        const createdDate = new Date(p?.createdAt);
        return !isNaN(createdDate.getTime()) && createdDate >= sevenDaysAgo;
      } catch {
        return false;
      }
    })
    .sort((a, b) => {
      try {
        const dateA = new Date(a?.createdAt);
        const dateB = new Date(b?.createdAt);
        return dateB.getTime() - dateA.getTime();
      } catch {
        return 0;
      }
    })
    .slice(0, 5);

  // Get top specializations
  const topSpecializations = Object.entries(doctorsBySpecialization)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your healthcare management system</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-muted-foreground">Loading dashboard data...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your healthcare management system</p>
        </div>
        <Card className="shadow-card border-0">
          <CardContent className="p-12 text-center">
            <div className="text-destructive mb-4">
              <Activity className="h-12 w-12 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Error Loading Dashboard</h3>
              <p className="text-muted-foreground mt-2">{error}</p>
            </div>
            <button 
              onClick={fetchData}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Hospitals",
      value: totalHospitals,
      description: `${activeHospitals} Active`,
      icon: Hospital,
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: activeHospitals > 0 ? "up" : "neutral"
    },
    {
      title: "Total Patients",
      value: totalPatients,
      description: `${criticalPatients} Critical`,
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10",
      trend: totalPatients > 0 ? "up" : "neutral"
    },
    {
      title: "Total Doctors",
      value: totalDoctors,
      description: `${Object.keys(doctorsBySpecialization).length} Specializations`,
      icon: UserCheck,
      color: "text-success",
      bgColor: "bg-success/10",
      trend: totalDoctors > 0 ? "up" : "neutral"
    },
    {
      title: "Bed Occupancy",
      value: `${bedOccupancyRate}%`,
      description: `${availableBeds} Available`,
      icon: Activity,
      color: bedOccupancyRate > 80 ? "text-destructive" : bedOccupancyRate > 60 ? "text-warning" : "text-success",
      bgColor: bedOccupancyRate > 80 ? "bg-destructive/10" : bedOccupancyRate > 60 ? "bg-warning/10" : "bg-success/10",
      trend: bedOccupancyRate > 80 ? "up" : "down"
    },
  ];

  const patientStats = [
    {
      title: "Admitted",
      value: admittedPatients,
      color: "text-primary",
      bgColor: "bg-primary/10",
      icon: Hospital
    },
    {
      title: "Critical",
      value: criticalPatients,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      icon: AlertTriangle
    },
    {
      title: "Discharged",
      value: dischargedPatients,
      color: "text-success",
      bgColor: "bg-success/10",
      icon: TrendingUp
    },
    {
      title: "Stable",
      value: stablePatients,
      color: "text-accent",
      bgColor: "bg-accent/10",
      icon: Heart
    },
    {
      title: "Not Linked",
      value: notLinkedPatients,
      color: "text-warning",
      bgColor: "bg-warning/10",
      icon: Users
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of SwasthyaHub healthcare management system
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              {stat.trend && (
                <div className="flex items-center mt-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-success mr-1" />
                  ) : stat.trend === "down" ? (
                    <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                  ) : null}
                  <span className="text-xs text-muted-foreground">
                    {stat.trend === "up" ? "Increasing" : stat.trend === "down" ? "Decreasing" : "Stable"}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Patient Status Overview */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-accent" />
            <span>Patient Status Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {patientStats.map((stat) => (
              <div key={stat.title} className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts and Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Specializations */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Stethoscope className="h-5 w-5 text-success" />
              <span>Top Specializations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSpecializations.map(([specialization, count], index) => (
                <div key={specialization} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{specialization}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(count / totalDoctors) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hospital Types Distribution */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Hospital className="h-5 w-5 text-primary" />
              <span>Hospital Types</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(
                hospitals.reduce((acc, h) => {
                  const type = h?.type || 'Unknown';
                  acc[type] = (acc[type] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="font-medium">{type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${totalHospitals > 0 ? (count / totalHospitals) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
              {totalHospitals === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No hospital data available
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Hospitals */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Hospital className="h-5 w-5 text-primary" />
              <span>Recent Hospitals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentHospitals.length > 0 ? recentHospitals.map((hospital) => (
                <div key={hospital.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{hospital.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">{hospital.type}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {hospital.availableBeds} beds available
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-success">{hospital.status}</p>
                    <p className="text-xs text-muted-foreground">
                      {(() => {
                        try {
                          const date = new Date(hospital?.established);
                          return !isNaN(date.getTime()) ? date.toLocaleDateString() : '-';
                        } catch {
                          return '-';
                        }
                      })()}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-center text-muted-foreground py-4">
                  No recent hospitals
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Doctors */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-success" />
              <span>Recent Doctors</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDoctors.length > 0 ? recentDoctors.map((doctor) => (
                <div key={doctor.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{doctor.fullName || '-'}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {doctor.specialization || 'General'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {doctor.yearsOfExperience || 0} years exp
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">
                      {(() => {
                        try {
                          const date = new Date(doctor?.createdAt);
                          return !isNaN(date.getTime()) ? date.toLocaleDateString() : '-';
                        } catch {
                          return '-';
                        }
                      })()}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-center text-muted-foreground py-4">
                  No recent doctors
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-accent" />
              <span>Recent Patients</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.length > 0 ? recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{patient.fullName || '-'}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant={patient.status === 'Critical' ? 'destructive' : 
                                patient.status === 'Admitted' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {patient.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {patient.currentCondition || '-'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">
                      {(() => {
                        try {
                          const date = new Date(patient?.createdAt);
                          return !isNaN(date.getTime()) ? date.toLocaleDateString() : '-';
                        } catch {
                          return '-';
                        }
                      })()}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-center text-muted-foreground py-4">
                  No recent patients
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-warning" />
            <span>System Health</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {isNaN(bedOccupancyRate) ? '0' : bedOccupancyRate}%
              </div>
              <p className="text-sm text-muted-foreground">Bed Occupancy</p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    bedOccupancyRate > 80 ? 'bg-destructive' : 
                    bedOccupancyRate > 60 ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{ width: `${isNaN(bedOccupancyRate) ? 0 : bedOccupancyRate}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {totalHospitals > 0 ? Math.round((activeHospitals / totalHospitals) * 100) : 0}%
              </div>
              <p className="text-sm text-muted-foreground">Active Hospitals</p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${totalHospitals > 0 ? (activeHospitals / totalHospitals) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {totalPatients > 0 ? Math.round((criticalPatients / totalPatients) * 100) : 0}%
              </div>
              <p className="text-sm text-muted-foreground">Critical Patients</p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-destructive h-2 rounded-full" 
                  style={{ width: `${totalPatients > 0 ? (criticalPatients / totalPatients) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {totalPatients > 0 ? Math.round((notLinkedPatients / totalPatients) * 100) : 0}%
              </div>
              <p className="text-sm text-muted-foreground">Unlinked Patients</p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-warning h-2 rounded-full" 
                  style={{ width: `${totalPatients > 0 ? (notLinkedPatients / totalPatients) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;