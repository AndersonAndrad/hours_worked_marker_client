import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

enum TypeTab {
  login = 'Login',
  singin = 'Singin'
}

/**
 * @todo pass all use state to form
 */
export function AuthenticatePage() {
  const [seePassword, setSeePassword] = useState<boolean>(false);

  const LoginSchema = z.object({
    nickNameOrEmail: z.string()
      .min(3, { message: 'User name must be at least 3 characters.' })
      .max(50, { message: 'User name must be up to 50 characters long.' })
      .trim(),
    password: z.string()
      .min(8, { message: 'User nick name must be at least 8 characters.' })
      .max(256, { message: 'User nick name must be up to 256 characters long.' })
      .trim()
  })

  const SingInSchema = z.object({
    name: z.string()
      .min(3, { message: 'User name must be at least 3 characters.' })
      .max(50, { message: 'User name must be up to 50 characters long.' })
      .trim(),
    email: z.string()
      .min(5, { message: 'User email must be at least 5 characters.' })
      .max(100, { message: 'User email must be up tp 100 characters long.' })
      .email()
      .trim(),
    nickName: z.string()
      .min(3, { message: 'User nick name must be at least 3 characters.' })
      .max(50, { message: 'User nick name must be up to 50 characters long.' })
      .trim(),
    password: z.string()
      .min(8, { message: 'User password must be at least 8 characters.' })
      .max(256, { message: 'User password must be up to 256 characters long.' })
      .trim(),
    confirmPassword: z.string()
      .min(8, { message: 'User confirm password must be at least 8 characters.' })
      .max(256, { message: 'User confirm password must be up to 256 characters long.' })
      .trim()
  })
    .refine(({ password, confirmPassword }) => password === confirmPassword, { message: 'Passwords does not match.', path: ['passwords'] })

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      nickNameOrEmail: '',
      password: ''
    }
  })

  const singInForm = useForm<z.infer<typeof SingInSchema>>({
    resolver: zodResolver(SingInSchema),
    defaultValues: {
      name: '',
      confirmPassword: '',
      email: '',
      nickName: '',
      password: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log({ data });
  }

  return (
    <div className="w-full flex justify-center items-center">
      <Tabs defaultValue={TypeTab.login} className="w-[300px]">
        <TabsList className="w-full mb-6">
          <TabsTrigger value={TypeTab.login} className="w-full">{TypeTab.login}</TabsTrigger>
          <TabsTrigger value={TypeTab.singin} className="w-full">{TypeTab.singin}</TabsTrigger>
        </TabsList>
        <TabsContent value={TypeTab.singin} className="h-[600px]">
          <Form {...singInForm}>
            <form onSubmit={singInForm.handleSubmit(onSubmit)}>
              <FormField
                control={singInForm.control}
                name='name'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="User name" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-500">
                      {fieldState?.error?.message}
                    </FormDescription>
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={singInForm.control}
                name='nickName'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nick name</FormLabel>
                    <FormControl>
                      <Input placeholder="User nick name" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-500">
                      {fieldState?.error?.message}
                    </FormDescription>
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={singInForm.control}
                name='email'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="User email" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-500">
                      {fieldState?.error?.message}
                    </FormDescription>
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={singInForm.control}
                name='password'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="User password" type="password" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-500">
                      {fieldState?.error?.message}
                    </FormDescription>
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={singInForm.control}
                name='confirmPassword'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input placeholder="User confirm password" type="password" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-500">
                      {fieldState?.error?.message}
                    </FormDescription>
                  </FormItem>
                )}
              >
              </FormField>
              <Button className="w-full" variant='secondary' type="submit">{TypeTab.singin}</Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value={TypeTab.login} className="h-[600px]">
          <Form {...loginForm}>
            <form>
              <FormField
                control={loginForm.control}
                name='nickNameOrEmail'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>NickName / Email</FormLabel>
                    <FormControl>
                      <Input placeholder="User nickName / email " {...field} />
                    </FormControl>
                    <FormDescription className="text-red-500">
                      {fieldState?.error?.message}
                    </FormDescription>
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={loginForm.control}
                name='password'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormDescription className="text-red-500">
                      {fieldState?.error?.message}
                    </FormDescription>
                  </FormItem>
                )}
              >
              </FormField>
              <Button className="w-full" variant='secondary' type="submit">{TypeTab.login}</Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div >
  )
}