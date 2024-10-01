import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { RegisterModel, registerSchema } from "./utils/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const form = useForm<RegisterModel>({
    resolver: zodResolver(registerSchema),
  });
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="username"
        render={() => (
          <FormItem>
            <FormLabel />
            <FormControl>{/* Your form field */}</FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default Register;
