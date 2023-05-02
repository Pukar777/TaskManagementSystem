<?php

namespace App\Repositories;   //folder 

use App\Models\User;   

use App\Repositories\RepoIface;

use Illuminate\Support\Facades\Hash;



class UserRepo implements RepoIface
{

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }


    public function all()
    {
        return $this->user->all()->load('role');
    }

    public function getById($id)
    {
        return $this->user->findOrFail($id);
    }


    
    
    // public function create(array $data){
          
    //     return $this->user->create($data);
    // }

     public function store(array $data){
        
        $dataentry = $this->user->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'contact' => $data['contact'],
            'address' => $data['address'],
            'role_id' => $data['role_id'],
            
          
        ]);  
    
        return $dataentry;
    }


    public function edit($id){

        return $this->user->find($id);
    }

    
    public function update(array $data, $id){
        return $this->user::where('id',$id)->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'contact' => $data['contact'],
            'address' => $data['address'],
            'role_id' => $data['role_id'],
        ]);
    }


    public function delete($id){
       
        
      return $this->user->destroy($id);

    }
}



?>