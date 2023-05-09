<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'duedate',
        'priority',
        'status',
        'type',
        'assigner_id'
    ];

    public function assignedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigner_id', 'id');
    }

    public function undertakingPro(): HasMany
    {
        return $this->hasMany(User::class, 'task_users', 'task_id', 'user_id');
    }
}
