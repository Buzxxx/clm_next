/**
 * @path src/components/contracts/features/vendorAuthForm.tsx
 */


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Image from "next/image"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
})

export default function VendorAuthForm() {
  const [isLogin, setIsLogin] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", name: "" },
  })

  const toggleForm = () => setIsLogin(!isLogin)

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isLogin) {
      // Perform login logic here
      console.log("Logging in with:", data)
    } else {
      // Perform signup logic here
      console.log("Signing up with:", data)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-500">

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input {...field} placeholder="Your Name" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} placeholder="Email" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} type="password" placeholder="Password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full hover:bg-gray-950">
              {isLogin ? "Login" : "Signup"}
            </Button>
          </form>
        </Form>

        <div className="flex items-center justify-center mt-6 cursor-pointer bg-white border border-gray-300 rounded-md p-2 hover:bg-gray-100">
          <Image
            src="/contracts/assets/googleLogo.png"
            alt="Google logo"
            width={24}
            height={24}
            className="w-6 h-6 mr-2"
          />
          <span className="text-gray-700">Login with Google</span>
        </div>

        <div
          onClick={toggleForm}
          className="mt-4 text-center text-sm text-gray-600 cursor-pointer hover:text-blue-700"
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </div>
      </div>
    </div>
  )
}
