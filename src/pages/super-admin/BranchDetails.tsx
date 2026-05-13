import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Mail, 
  ShieldAlert, 
  ArrowLeft,
  Key,
  PieChart as PieChartIcon,
  CreditCard,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LOCATIONS } from '@/data/mockData';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { toast } from 'sonner';

const SPORT_COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

export default function BranchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = LOCATIONS.find(l => l.id === id) || LOCATIONS[0];

  const handleResetPassword = () => {
    toast.success('Password reset link sent to branch email.');
  };

  const studentData = [
    { name: 'Football', value: 45 },
    { name: 'Badminton', value: 30 },
    { name: 'Cricket', value: 25 },
  ];

  const revenueByMonth = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 tracking-tight">{location.name}</h1>
          <p className="text-gray-500 font-medium">Branch Intelligence & Control Panel</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Branch Overview Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="glass-card p-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Students</p>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-2xl font-bold text-gray-900">{location.studentsCount}</h3>
                <Users className="w-5 h-5 text-indigo-500" />
              </div>
            </Card>
            <Card className="glass-card p-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Revenue</p>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-2xl font-bold text-gray-900">₹{location.revenue.toLocaleString()}</h3>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
            </Card>
            <Card className="glass-card p-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Sports</p>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-2xl font-bold text-gray-900">{location.activeSports.length}</h3>
                <Target className="w-5 h-5 text-amber-500" />
              </div>
            </Card>
          </div>

          {/* Revenue Performance */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Revenue Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={v => `₹${v/1000}k`} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0/0.1)' }} />
                    <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Demographics */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-base font-bold">Sport Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={studentData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {studentData.map((_, i) => <Cell key={i} fill={SPORT_COLORS[i % SPORT_COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-base font-bold">Branch Access Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Creation Date</span>
                  <span className="text-sm font-bold">Jan 12, 2024</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Plan Type</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">Enterprise</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-500">Status</span>
                  <Badge className="bg-green-100 text-green-700">Online</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          {/* Credential Management */}
          <Card className="glass-card border-indigo-100">
            <CardHeader className="bg-indigo-50/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-indigo-900">
                <Key className="w-5 h-5" />
                Branch Access
              </CardTitle>
              <CardDescription>View and manage credentials for this location.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2">
                   <Mail className="w-3 h-3" /> Branch Admin Email
                </Label>
                <div className="flex gap-2">
                  <Input readOnly value={location.email} className="h-10 bg-gray-50 font-medium" />
                  <Button variant="outline" size="sm" onClick={() => {
                    navigator.clipboard.writeText(location.email);
                    toast.success('Email copied to clipboard');
                  }}>Copy</Button>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Security Controls</p>
                <Button className="w-full btn-primary h-11 shadow-indigo-100" onClick={handleResetPassword}>
                  Reset Password Link
                </Button>
                <Button variant="outline" className="w-full text-red-600 border-red-100 hover:bg-red-50 h-11">
                  Freeze Account Access
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Activity Log Shortlist */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-500" />
                Recent Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { action: 'New Student Signup', time: '10 mins ago', user: 'Branch Admin' },
                { action: 'Invoice Generated', time: '1 hour ago', user: 'Accountant' },
                { action: 'Login Successful', time: '3 hours ago', user: 'Branch Admin' }
              ].map((log, i) => (
                <div key={i} className="flex gap-3 items-start text-xs border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">{log.action}</p>
                    <p className="text-gray-500">{log.time} • by {log.user}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-indigo-600 font-bold text-xs">View Full Audit Log</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
