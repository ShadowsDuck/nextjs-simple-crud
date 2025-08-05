"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUser, updateUser } from "@/lib/services/user";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
  email?: string;
  username?: string;
  onClose: () => void;
}

const formSchema = z.object({
  email: z.email(),
  username: z.string().min(2).max(50),
});

export function UserForm({ userId, email, username, onClose }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
      username: username || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const userData = {
        ...values,
        password: "password123",
      };

      if (userId) {
        await updateUser(userId, userData);
      } else {
        await createUser(userData);
      }

      form.reset();
      toast.success(`User ${userId ? "updated" : "added"} successfully`);
      onClose();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error(`Failed to ${userId ? "update" : "add new"} user`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {userId ? "Update User" : "Add User"}{" "}
          {isLoading && <Loader2 className="size-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
