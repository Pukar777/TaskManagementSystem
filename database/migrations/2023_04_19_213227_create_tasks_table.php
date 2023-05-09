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
            $table->string('title', 255)->nullable(false);
            $table->string('description', 255);
            $table->date('duedate');
            $table->enum('priority', ['critical', 'high', 'medium', 'low']);
            $table->enum('status', ['ready', 'ongoing', 'pending', 'done', 'stuck']);
            $table->enum('type', ['feature', 'bug']);
            $table->unsignedBigInteger('assigner_id');
            $table->foreign('assigner_id')->references('id')->on('users')->cascadeOnUpdate()->cascadeOnDelete();
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
