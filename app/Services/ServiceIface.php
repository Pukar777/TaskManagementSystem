<?php

namespace App\Services;

interface ServiceIface
{

    public function getAll();

    public function store(array $data);

    public function edit($id);

    public function update(array $data, $id);

    public function delete($id);

}


?>