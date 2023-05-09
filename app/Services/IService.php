<?php

namespace App\Services;

// namespace APP\Services\Interfaces;


interface IService
{
    public function all();
    public function store($data);
    public function edit($id);
    public function update($data, $id);
    public function delete($id);
}
