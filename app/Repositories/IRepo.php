<?php

namespace App\Repositories;

// namespace App\Repositories\Interfaces;

interface IRepo
{
    public function all();
    public function store($attributes);
    public function edit($id);
    public function update($attributes, $id);
    public function delete($id);
}
