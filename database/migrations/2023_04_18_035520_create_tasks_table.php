<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title',20);
            $table->string('description',512);
            $table->date('dueDate');
            $table->enum('priority', ['critcal', 'high', 'medium', 'low']);
            $table->enum('status', ['ready to start', 'waiting to review', 'done', 'stuck']);
            $table->enum('type', ['feature','bug']);
            $table->foreignId('created_by')->nullable()->constrainted('users')->cascadeOnDelete(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
