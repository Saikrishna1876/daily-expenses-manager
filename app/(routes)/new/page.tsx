"use client";
import { Separator } from "@/components/ui/separator";
import NewForm from "./_components/new-form";
import Heading from "@/components/ui/heading";

function NewPage() {
  return (
    <section>
      <div className="">
        <Heading title="New Order" description="Create a new order" />
        <Separator className="my-4" />
      </div>
      <NewForm />
    </section>
  );
}

export default NewPage;
