"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { UserPlus } from "lucide-react";
import { UserForm } from "./forms/UserForm";
import { useState } from "react";

const AddUserButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          Add User
          <UserPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>Add a new user to the database.</DialogDescription>
        </DialogHeader>
        <UserForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddUserButton;
