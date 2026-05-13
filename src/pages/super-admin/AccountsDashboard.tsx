import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Users, 
  MapPin, 
  TrendingUp, 
  Plus, 
  Search,
  MoreVertical,
  ShieldCheck,
  CalendarDays
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LOCATIONS, STUDENTS, INVOICES } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { DateRange } from "react-day-picker";

export default function AccountsDashboard() {
  const [isAddLocationOpen, setIsAddLocationOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
  const navigate = useNavigate();

  const stats = React.useMemo(() => {
    let filteredInvoices = INVOICES;
    let filteredStudents = STUDENTS;

    if (dateRange?.from) {
      const start = startOfDay(dateRange.from);
      const end = dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from);

      filteredInvoices = INVOICES.filter(inv => {
        const d = parseISO(inv.date);
        return isWithinInterval(d, { start, end });
      });

      filteredStudents = STUDENTS.filter(s => {
        const d = parseISO(s.joinedAt);
        return isWithinInterval(d, { start, end });
      });
    }

    const totalRevenue = filteredInvoices.reduce((acc, inv) => acc + inv.total, 0);

    return [
      { label: 'Total Branches', value: LOCATIONS.length.toString(), icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
      { label: dateRange ? 'Joined in Range' : 'Global Students', value: (dateRange ? filteredStudents.length : 2482).toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Active Regions', value: '4', icon: MapPin, color: 'text-green-600', bg: 'bg-green-50' },
      { label: dateRange ? 'Period Revenue' : 'Total Revenue', value: `₹${(totalRevenue / 1000).toFixed(1)}k`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];
  }, [dateRange]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 tracking-tight">Accounts Dashboard</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage global branches and location-specific access.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-11 justify-start text-left font-bold border-slate-200 bg-white min-w-[260px] shadow-sm hover:bg-slate-50 transition-all",
                  !dateRange && "text-slate-500"
                )}
              >
                <CalendarDays className="mr-2.5 h-4 w-4 text-indigo-500" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM dd, yyyy")
                  )
                ) : (
                  <span>Global Performance Range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {dateRange && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setDateRange(undefined)}
              className="h-11 text-xs font-bold text-slate-500 hover:text-indigo-600"
            >
              Reset
            </Button>
          )}

          <div className="h-8 w-px bg-slate-200 mx-1 hidden md:block" />
          
          <Dialog open={isAddLocationOpen} onOpenChange={setIsAddLocationOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary gap-2 h-11 px-6">
                <Plus className="w-5 h-5" />
                Add New Location
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold font-display">Create New Branch</DialogTitle>
                <p className="text-sm text-gray-500 mt-1">Set up a new location with its own management credentials.</p>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500">Location Name</Label>
                  <Input id="name" placeholder="e.g. Downtown Sports Arena" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-xs font-bold uppercase tracking-wider text-gray-500">Location Image URL</Label>
                  <Input id="image" placeholder="https://..." className="h-11" />
                </div>
                <div className="p-4 bg-gray-50 rounded-xl space-y-4 border border-gray-100">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Branch Credentials</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] font-bold text-gray-600">User Email</Label>
                    <Input id="email" type="email" placeholder="branch@example.com" className="h-9 bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pass" className="text-[10px] font-bold text-gray-600">Initial Password</Label>
                    <Input id="pass" type="password" placeholder="••••••••" className="h-9 bg-white" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddLocationOpen(false)}>Cancel</Button>
                <Button className="btn-primary px-8" onClick={() => setIsAddLocationOpen(false)}>Create Branch</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-bold mt-2 text-gray-900">{stat.value}</h3>
              </div>
              <div className={cn("p-2 rounded-lg", stat.bg, stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Locations Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-gray-900">Active Branches</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search branches..." className="pl-10 h-10 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCATIONS.map((location) => (
            <Card key={location.id} className="overflow-hidden border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm border-none shadow-sm capitalize">
                    {location.region}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{location.name}</h3>
                    <p className="text-sm text-gray-500">{location.address}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100 mb-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Students</p>
                    <p className="font-bold text-gray-900">240</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin</p>
                    <p className="text-xs font-medium text-indigo-600 truncate">manager@branch.com</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 text-xs gap-2">
                    Manage Staff
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 text-xs gap-2 bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100"
                    onClick={() => navigate(`/super-admin/branch/${location.id}`)}
                  >
                    Branch Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
