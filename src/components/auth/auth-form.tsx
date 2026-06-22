import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn, UserPlus } from "lucide-react";
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
import { cn } from "@/lib/utils";

const inputClassName =
  "h-11 w-full border-border/50 bg-background/50 px-3 text-base backdrop-blur-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary/50 focus-visible:ring-primary/20 md:text-sm";

const formGridClassName = "grid w-full grid-cols-1 gap-4";

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
      orientation="horizontal"
      className="flex w-full flex-col"
    >
      <TabsList
        variant="default"
        className="grid h-11 w-full grid-cols-2 gap-1 rounded-xl border border-border/40 bg-muted/30 p-1 backdrop-blur-sm"
      >
        <TabsTrigger
          value="login"
          className={cn(
            "h-full w-full gap-2 rounded-lg text-sm font-medium transition-all duration-200",
            "data-active:bg-background data-active:text-foreground data-active:shadow-sm",
          )}
        >
          <LogIn className="size-4 shrink-0" />
          Entrar
        </TabsTrigger>
        <TabsTrigger
          value="signup"
          className={cn(
            "h-full w-full gap-2 rounded-lg text-sm font-medium transition-all duration-200",
            "data-active:bg-background data-active:text-foreground data-active:shadow-sm",
          )}
        >
          <UserPlus className="size-4 shrink-0" />
          Criar Conta
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="login"
        className="mt-6 w-full animate-in fade-in slide-in-from-bottom-1 duration-300"
      >
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onLogin)}
            className={formGridClassName}
            noValidate
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="voce@empresa.com"
                      className={inputClassName}
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
                <FormItem className="w-full">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className={inputClassName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-11 w-full text-sm font-semibold"
              disabled={loginForm.formState.isSubmitting}
            >
              {loginForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent
        value="signup"
        className="mt-6 w-full animate-in fade-in slide-in-from-bottom-1 duration-300"
      >
        <Form {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(onSignup)}
            className={formGridClassName}
            noValidate
          >
            <FormField
              control={signupForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      placeholder="Seu nome completo"
                      className={inputClassName}
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
                <FormItem className="w-full">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="voce@empresa.com"
                      className={inputClassName}
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
                <FormItem className="w-full">
                  <FormLabel>Telefone celular</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(11) 99999-9999"
                      className={inputClassName}
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
                <FormItem className="w-full">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Mínimo 6 caracteres"
                      className={inputClassName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-11 w-full text-sm font-semibold"
              disabled={signupForm.formState.isSubmitting}
            >
              {signupForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
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
