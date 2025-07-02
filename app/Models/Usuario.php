<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Usuario extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'usuarios';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
        'documento',
        'tipo',
        'institucion_id'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'tipo' => 'string', // El enum se maneja como string
    ];

    /**
     * Obtener la institución a la que pertenece el usuario.
     */
    public function institucion(): BelongsTo
    {
        return $this->belongsTo(Institucion::class);
    }

    /**
     * Obtener todos los préstamos del usuario.
     */
    public function prestamos(): HasMany
    {
        return $this->hasMany(Prestamo::class);
    }

    /**
     * Scope para filtrar usuarios por tipo.
     */
    public function scopePorTipo($query, $tipo)
    {
        return $query->where('tipo', $tipo);
    }

    /**
     * Accessor para el nombre en mayúsculas.
     */
    public function getNombreMayusculasAttribute()
    {
        return strtoupper($this->nombre);
    }
}
