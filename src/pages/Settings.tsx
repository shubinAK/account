import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Building2, 
  User, 
  Bell, 
  ShieldCheck, 
  CreditCard,
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { GST_RATES } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function Settings() {
  const [activeTab, setActiveTab] = React.useState('Organization');
  const [gstRates, setGstRates] = React.useState(GST_RATES);

  const handleDeleteGst = (id: string) => {
    setGstRates(gstRates.filter(rate => rate.id !== id));
    toast.success('GST rate removed');
  };

  const handleSetDefault = (id: string) => {
    setGstRates(gstRates.map(rate => ({
      ...rate,
      isDefault: rate.id === id
    })));
    toast.success('Default GST rate updated');
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your organization profile, billing, and staff users.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="space-y-1">
          {[
            { label: 'Organization', icon: Building2 },
            { label: 'User Profile', icon: User },
            { label: 'Notifications', icon: Bell },
            { label: 'Billing & GST', icon: CreditCard },
            { label: 'Security', icon: ShieldCheck },
          ].map((item) => (
            <Button
              key={item.label}
              variant={activeTab === item.label ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab(item.label)}
              className={`w-full justify-start gap-3 rounded-xl h-11 ${activeTab === item.label ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-500'}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          ))}
        </aside>

        <div className="lg:col-span-3 space-y-8">
          {activeTab === 'Organization' && (
            <>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg font-display font-bold">Organization Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-indigo-100">
                      K
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" className="gap-2 h-9 text-xs">
                        <ImageIcon className="w-4 h-4" />
                        Change Logo
                      </Button>
                      <p className="text-[10px] text-slate-400">Recommended: Square image, minimum 400x400px.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Academy Name</label>
                      <Input defaultValue="Kickstart Sports Academy" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registration ID</label>
                      <Input defaultValue="KA/MYS/2024/0942" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">GST Number</label>
                      <Input defaultValue="29AAAAA0000A1Z5" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</label>
                      <Input defaultValue="+91 98765 43210" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Headquarters Address</label>
                    <Input defaultValue="123 Sport Street, Main Campus, Mysore - 570001" />
                  </div>

                  <div className="pt-4 border-t flex justify-end gap-3">
                    <Button variant="outline">Discard Changes</Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-red-100">
                <CardHeader>
                  <CardTitle className="text-lg font-display font-bold text-slate-900">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-red-700">Deactivate Academy</p>
                      <p className="text-sm text-red-600/80">Temporarily suspend all branch operations and billing.</p>
                    </div>
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700">Deactivate</Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'Billing & GST' && (
            <Card className="glass-card">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-lg font-display font-bold">GST Configuration</CardTitle>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Rate
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-slate-500">Define the GST percentages used across your academy packages. Default rate is automatically applied to new packages.</p>
                
                <div className="space-y-3">
                  {gstRates.map((rate) => (
                    <div key={rate.id} className="group p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between hover:border-indigo-200 hover:shadow-sm transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                          {rate.percentage}%
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 flex items-center gap-2">
                            {rate.name}
                            {rate.isDefault && (
                              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[10px] uppercase font-black px-2">Default</Badge>
                            )}
                          </p>
                          <p className="text-xs text-slate-400">Apply {rate.percentage}% tax to invoices</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!rate.isDefault && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleSetDefault(rate.id)}
                            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 h-8 px-3 text-xs font-bold uppercase tracking-wider"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-2" />
                            Set Default
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteGst(rate.id)}
                          className="text-slate-400 hover:text-red-600 hover:bg-red-50 h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t">
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                    <Bell className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 leading-relaxed">
                      <strong>Important:</strong> Changing global GST rates will only affect new invoices. Existing invoices and receipts will maintain their original tax calculations at the time of issuance for compliance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {(activeTab === 'User Profile' || activeTab === 'Notifications' || activeTab === 'Security') && (
            <div className="h-64 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 text-slate-400">
               <p className="font-medium">{activeTab} settings coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

