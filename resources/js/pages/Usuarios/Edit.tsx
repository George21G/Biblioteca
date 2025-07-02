import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface Institucion {
  id: number;
  nombre: string;
}

interface Usuario {
  id: number;
  nombre: string;
  documento: string;
  tipo: string;
  institucion_id?: number;
}

interface Props {
  usuario: Usuario;
  instituciones: Institucion[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Usuarios',
    href: '/usuarios',
  },
  {
    title: 'Editar',
    href: '#',
  },
];

export default function UsuarioEdit({ usuario, instituciones }: Props) {
  const { data, setData, put, processing, errors, reset } = useForm({
    nombre: usuario.nombre || '',
    documento: usuario.documento || '',
    tipo: usuario.tipo || 'natural',
    institucion_id: usuario.institucion_id || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/usuarios/${usuario.id}`);
  };

  const handleInputChange = (field: 'nombre' | 'documento' | 'tipo' | 'institucion_id', value: string) => {
    setData(field, value);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Editar Usuario - ${usuario.nombre}`} />
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Editar Usuario</h1>
            <p className="text-muted-foreground">Modifica la información del usuario</p>
          </div>
          <Link href="/usuarios">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
        </div>

        {/* Form */}
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Información del Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  type="text"
                  value={data.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  placeholder="Ingrese el nombre del usuario"
                  className={errors.nombre ? 'border-red-500' : ''}
                />
                {errors.nombre && (
                  <p className="text-sm text-red-600">{errors.nombre}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="documento">Documento</Label>
                <Input
                  id="documento"
                  type="text"
                  value={data.documento}
                  onChange={(e) => handleInputChange('documento', e.target.value)}
                  placeholder="Ingrese el documento del usuario"
                  className={errors.documento ? 'border-red-500' : ''}
                />
                {errors.documento && (
                  <p className="text-sm text-red-600">{errors.documento}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Usuario</Label>
                <Select
                  value={data.tipo}
                  onValueChange={(value) => handleInputChange('tipo', value)}
                >
                  <SelectTrigger className={errors.tipo ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Seleccione el tipo de usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="natural">Persona natural</SelectItem>
                    <SelectItem value="estudiante">Estudiante</SelectItem>
                    <SelectItem value="empresa">Empresa</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tipo && (
                  <p className="text-sm text-red-600">{errors.tipo}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="institucion_id">Institución</Label>
                <Select
                  value={data.institucion_id?.toString() || 'none'}
                  onValueChange={(value) => handleInputChange('institucion_id', value === 'none' ? '' : value)}
                >
                  <SelectTrigger className={errors.institucion_id ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Seleccione una institución" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sin institución</SelectItem>
                    {instituciones.map(inst => (
                      <SelectItem key={inst.id} value={inst.id.toString()}>{inst.nombre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.institucion_id && (
                  <p className="text-sm text-red-600">{errors.institucion_id}</p>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={processing}>
                  <Save className="w-4 h-4 mr-2" />
                  {processing ? 'Guardando...' : 'Actualizar Usuario'}
                </Button>
                <Link href="/usuarios">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
} 