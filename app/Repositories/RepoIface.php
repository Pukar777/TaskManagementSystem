<?php

namespace App\Repositories;

interface RepoIface{
     
   //interfaces method
    
    public function all();

    

    public function store(array $data); //store change

    public function update(array $data,$id);

    public function delete($id);

    public function edit($id);

}

?>