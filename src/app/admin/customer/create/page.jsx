"use client"
import React,{useState, useEffect} from 'react'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import Divider from "@/components/Divider";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

const CreateCustomer = () => {
  const router = useRouter();
  const [loading,setLoading] = useState(true);
  const [customer,setCustomer] = useState({
    name:"",
    phone:"",
    email:"",
  });

  const handleChange = (field, value) => setCustomer((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) =>{
      e.preventDefault();
  setLoading(true);
  try {
    const formData = new FormData();

    formData.append("name",customer.name);
    formData.append("phone",customer.phone);
    formData.append("email",customer.email);

    const res = await fetch('/api/admin/customer/create',
      {
        method:"POST",
        body:formData
      }
    )

    const data = await res.json();
    if(data.success){
      toast.success(
              "Success",{
                description:"Successfully created customer"
              }
            )
            router.push("/admin/customer");
    }else {
          toast.error(
            "Error",{
              description:"❌ Error: " + (data.error || "Failed to create customer")
            }
          )
          
        }
  } catch (error) {
    console.error("Error creating project:", error);
        toast.error(
            "Error",{
              description:"Error creating project: " + error.message
            }
          )
  }finally{
    setLoading(false);
  }
  }
  return (
<div className="p-1 md:p-4 max-w-4xl mx-auto">
  <h1 className="text-2xl font-bold mb-4">Create Project</h1>
  <form onSubmit={handleSubmit}>
    
    <label className="block mb-1 font-medium">Name</label>
    <Input
      type="text"
      placeholder="Name"
      value={customer.name}
      onChange={e => handleChange("name", e.target.value)}
      className="mb-2 w-full"
      required
    />

    <label className="block mb-1 font-medium">Phone No</label>
    <Input
      type="tel"
      placeholder="Phone No."
      value={customer.phone}
      onChange={e => handleChange("phone", e.target.value)}
      className="mb-2 w-full"
      required
    />

    <label className="block mb-1 font-medium">Email</label>
    <Input
      type="email"
      placeholder="Email"
      value={customer.email}
      onChange={e => handleChange("email", e.target.value)}
      className="mb-2 w-full"
      required
    />

    <Divider/>

    <Button
    type="submit"
    >
    Create Customer
    </Button>
  </form>
</div>

  )
}

export default CreateCustomer