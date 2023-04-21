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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name',50);
            $table->string('email',150)->unique();
            $table->string('password');
            $table->string('contact',15);
            $table->string('address',150);    
            $table->boolean('isSuper')->nullable();    
            // $table->string('role_id')->nullable()->cascadeOnDelete();    
            $table->foreignId('role_id')->nullable()->constrainted('roles')->cascadeOnDelete(); 
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        // Schema::table('roles', function (Blueprint $table) {
        //     $table->foreign('role_id')->references('id')->on('roles');
        // });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
