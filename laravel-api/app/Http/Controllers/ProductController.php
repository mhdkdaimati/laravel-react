<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Str;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Product::select('image','title','description')->get();

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'description'=>'required',
            'title'=>'required',
            'image'=>'required|image'
        ]);

        $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('product/image',$request->image,$imageName);
        Product::create($request->post()+['image'=>$request->image]);
        
        return response()->json([
            'message'=>'product added'
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json([
            'product'=>$product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'image'=>'required',
            'title'=>'required',
            'description'=>'nullable'
        ]);

        $product->fill($request->post())->update();


        if($request->hasFile('image')){

            if($product->image){
                $exist=Storage::disk('public')->exists("product/image/{$product->image}");
                if($exist){
                    Storage::disk('public')->delete("product/image/{$product->image}");
                }
            }
            
    
            $imageName = Str::random().'.'.$request->image->getClientOrigionalExtension();
            Storage::disk('public')->putFileAs('product/image',$request->image,$imageName);
            $product->image =$imageName;
            $product->save();        

            return response()->json([
                'message'=>'product updated'
            ]);
    
        }        
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if($product->image){
            $exist=Storage::disk('public')->exists("product/image/{$product->image}");
            if($exist){
                Storage::disk('public')->delete("product/image/{$product->image}");
            }
        }
        $product->delete();
        return response()->json([
            'message'=>'product deleted'
        ]);



    }
}
