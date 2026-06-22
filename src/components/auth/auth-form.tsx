import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  loginSchema,
  signupSchema,
  type LoginFormValues,
  type SignupFormValues,
} from "@/lib/schemas/auth";
import { getSupabase } from "@/lib/supabase/client";

export function AuthForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/dashboard";
  const [mode, setMode] = useState<"login" | "signup">("login");

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", phone: "", password: "" },
    mode: "onChange",
  });

  async function onLogin(values: LoginFormValues) {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithPassword(values);

      if (error) throw error;

      toast.success("Login realizado com sucesso.");
      navigate(nextPath);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Falha ao entrar. Tente novamente.",
      );
    }
  }

  async function onSignup(values: SignupFormValues) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.name,
            phone: values.phone,
          },
        },
      });

      if (error) throw error;

      if (data.session) {
        toast.success("Conta criada com sucesso.");
        navigate(nextPath);
        return;
      }

      toast.success("Conta criada. Verifique seu e-mail para confirmar.");
      setMode("login");
      loginForm.setValue("email", values.email);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Falha ao criar conta. Tente novamente.",
      );
    }
  }

  return (
    <Tabs
      value={mode}
      onValueChange={(value) => setMode(value as "login" | "signup")}
    >
      <TabsList variant="line" className="grid h-10 w-full grid-cols-2 bg-transparent">
        <TabsTrigger value="login" className="text-sm">
          Entrar
        </TabsTrigger>
        <TabsTrigger value="signup" className="text-sm">
          Cadastro
        </TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="mt-6">
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onLogin)}
            className="space-y-4"
            noValidate
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="voce@empresa.com"
                      className="h-10 bg-background/60"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="h-10 bg-background/60"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-10 w-full"
              disabled={loginForm.formState.isSubmitting}
            >
              {loginForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="signup" className="mt-6">
        <Form {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(onSignup)}
            className="space-y-4"
            noValidate
          >
            <FormField
              control={signupForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      placeholder="Seu nome completo"
                      className="h-10 bg-background/60"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="voce@empresa.com"
                      className="h-10 bg-background/60"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone celular</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(11) 99999-9999"
                      className="h-10 bg-background/60"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Mínimo 6 caracteres"
                      className="h-10 bg-background/60"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-10 w-full"
              disabled={signupForm.formState.isSubmitting}
            >
              {signupForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Criar conta"
              )}
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
