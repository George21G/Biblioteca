import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, User, Users, Briefcase, Calendar } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface Institucion {
  id: number;
  nombre: string;
}

interface Usuario {
  id: number;
  nombre: string;
  documento: string;
  tipo: 'natural' | 'estudiante' | 'empresa';
  institucion?: Institucion;
  created_at: string;
  updated_at: string;
}

interface Props {
  usuario: Usuario;
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
    title: 'Detalles',
    href: '#',
  },
];

const tipoIcons = {
  natural: User,
  estudiante: Users,
  empresa: Briefcase,
};

const tipoColors = {
  natural: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  estudiante: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  empresa: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
};

export default function UsuarioShow({ usuario }: Props) {
  const getTipoIcon = (tipo: string) => {
    const IconComponent = tipoIcons[tipo as keyof typeof tipoIcons];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Usuario - ${usuario.nombre}`} />
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{usuario.nombre}</h1>
            <p className="text-muted-foreground">Detalles del usuario</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/usuarios/${usuario.id}/edit`}>
              <Button>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </Link>
            <Link href="/usuarios">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Información del Usuario */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Información General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nombre</label>
                <p className="text-lg font-semibold">{usuario.nombre}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Documento</label>
                <p className="text-lg font-semibold">{usuario.documento}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tipo</label>
                <div className="mt-1">
                  <Badge className={tipoColors[usuario.tipo]}>
                    <span className="flex items-center gap-1">
                      {getTipoIcon(usuario.tipo)}
                      {usuario.tipo}
                    </span>
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Institución</label>
                <p className="text-lg font-semibold">{usuario.institucion?.nombre || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Fecha de Creación</label>
                <p className="text-sm">{new Date(usuario.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Última Actualización</label>
                <p className="text-sm">{new Date(usuario.updated_at).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
} 