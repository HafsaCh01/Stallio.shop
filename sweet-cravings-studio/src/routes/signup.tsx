import { useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  AlertCircle,
  ArrowRight,
  AtSign,
  CheckCircle2,
  Globe,
  ImageUp,
  Loader2,
  Mail,
  Store,
  Wallet,
  X,
} from "lucide-react";
import { AuthShell, AuthCard } from "@/components/stallio/auth/AuthShell";
import { AuthPromo } from "@/components/stallio/auth/AuthPromo";
import { FormField, FieldShell } from "@/components/stallio/auth/FormField";
import { PasswordField } from "@/components/stallio/auth/PasswordField";
import { Combobox } from "@/components/stallio/auth/Combobox";
import { signupSchema, type SignupValues } from "@/lib/validation/auth";
import { useAuthNav } from "@/lib/auth-transition";
import { cn } from "@/lib/utils";

const title = "Sign Up: Stallio";
const description =
  "Create your Stallio shop in minutes: unlimited products, a mobile storefront, and an order dashboard.";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Signup,
});

const countries = [
  "Pakistan",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Saudi Arabia",
  "India",
  "Canada",
  "Australia",
  "Germany",
  "Other",
];

const currencies = [
  { code: "PKR", label: "PKR — Pakistani Rupee" },
  { code: "USD", label: "USD — US Dollar" },
  { code: "GBP", label: "GBP — British Pound" },
  { code: "AED", label: "AED — UAE Dirham" },
  { code: "SAR", label: "SAR — Saudi Riyal" },
  { code: "INR", label: "INR — Indian Rupee" },
  { code: "EUR", label: "EUR — Euro" },
];

const countryOptions = countries.map((c) => ({ value: c, label: c }));
const currencyOptions = currencies.map((c) => ({
  value: c.code,
  label: c.label,
}));

/** Stand-in for a real API call until the backend is wired up. */
async function fakeCreateShop(values: SignupValues) {
  await new Promise((resolve) => setTimeout(resolve, 1100));
  if (values.username.trim().toLowerCase() === "stallio") {
    throw new Error("That store URL is already taken. Try another one.");
  }
  return true;
}

function Signup() {
  const navigate = useNavigate();
  const authNav = useAuthNav();
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      shopName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      currency: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (values: SignupValues) => {
    setFormError(null);
    setStatus("submitting");
    try {
      await fakeCreateShop(values);
      setSubmittedEmail(values.email);
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setFormError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  };

  return (
    <AuthShell mode="signup" promo={<AuthPromo />}>
      <AuthCard
        eyebrow="Get started"
        size="wide"
        title="Create your shop"
        subtitle="Free trial, one store link, and a dashboard to manage products and orders."
        footer={
          status === "success" ? undefined : (
            <>
              Already have a shop?{" "}
              <Link
                to="/login"
                onClick={authNav("/login")}
                className="font-semibold text-violet transition-colors hover:text-lime-dark"
              >
                Log in
              </Link>
            </>
          )
        }
      >
        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime/15 text-lime-dark">
              <CheckCircle2 size={28} strokeWidth={2} />
            </span>
            <p className="font-display text-lg font-semibold text-ink">
              Your shop is ready!
            </p>
            <p className="max-w-xs text-sm text-ink-soft">
              We&rsquo;ve emailed you a verification link. Verify your address
              to activate your shop and open your dashboard.
            </p>
            <button
              type="button"
              onClick={() =>
                navigate({
                  to: "/verify-email",
                  search: { email: submittedEmail },
                })
              }
              className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-violet px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              Verify your email
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="auth-form flex flex-col gap-5"
          >
            {formError && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-ink"
              >
                <AlertCircle
                  size={17}
                  strokeWidth={2.25}
                  className="mt-0.5 shrink-0 text-coral"
                />
                <p>{formError}</p>
              </div>
            )}

            <div className="grid gap-5 @sm:grid-cols-2">
              <FormField id="email" label="Email" error={errors.email?.message}>
                <FieldShell
                  icon={<Mail size={16} strokeWidth={2} />}
                  error={Boolean(errors.email)}
                >
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    className="w-full flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
                    {...register("email")}
                  />
                </FieldShell>
              </FormField>

              <FormField
                id="shopName"
                label="Shop name"
                error={errors.shopName?.message}
              >
                <FieldShell
                  icon={<Store size={16} strokeWidth={2} />}
                  error={Boolean(errors.shopName)}
                >
                  <input
                    id="shopName"
                    autoComplete="organization"
                    placeholder="My Awesome Shop"
                    aria-invalid={Boolean(errors.shopName)}
                    className="w-full flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
                    {...register("shopName")}
                  />
                </FieldShell>
              </FormField>
            </div>

            <div className="grid gap-5 @sm:grid-cols-2">
              <FormField
                id="username"
                label="Username (Store URL)"
                error={errors.username?.message}
                hint={
                  !errors.username
                    ? "Letters, numbers, underscores and hyphens only"
                    : undefined
                }
              >
                <FieldShell
                  icon={<AtSign size={16} strokeWidth={2} />}
                  error={Boolean(errors.username)}
                >
                  <input
                    id="username"
                    autoComplete="off"
                    placeholder="myshop"
                    aria-invalid={Boolean(errors.username)}
                    className="w-full flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
                    {...register("username")}
                  />
                </FieldShell>
              </FormField>

              <FormField
                id="password"
                label="Password (Min 8 characters)"
                error={errors.password?.message}
              >
                <PasswordField
                  id="password"
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  error={Boolean(errors.password)}
                  showStrength
                  {...register("password")}
                />
              </FormField>
            </div>

            <div className="grid gap-5 @sm:grid-cols-2">
              <FormField
                id="confirmPassword"
                label="Confirm password"
                error={errors.confirmPassword?.message}
                valid={
                  !errors.confirmPassword &&
                  Boolean(watch("confirmPassword")) &&
                  watch("confirmPassword") === password
                }
              >
                <PasswordField
                  id="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Repeat password"
                  error={Boolean(errors.confirmPassword)}
                  {...register("confirmPassword")}
                />
              </FormField>

              <FormField
                id="country"
                label="Country"
                error={errors.country?.message}
              >
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Combobox
                      id="country"
                      icon={<Globe size={16} strokeWidth={2} />}
                      value={field.value}
                      onChange={field.onChange}
                      options={countryOptions}
                      placeholder="Select country"
                      searchPlaceholder="Search country…"
                      emptyText="No country found."
                      error={Boolean(errors.country)}
                    />
                  )}
                />
              </FormField>
            </div>

            <div className="grid gap-5 @sm:grid-cols-2">
              <FormField
                id="currency"
                label="Currency"
                error={errors.currency?.message}
              >
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Combobox
                      id="currency"
                      icon={<Wallet size={16} strokeWidth={2} />}
                      value={field.value}
                      onChange={field.onChange}
                      options={currencyOptions}
                      placeholder="Select currency"
                      searchPlaceholder="Search currency…"
                      emptyText="No currency found."
                      error={Boolean(errors.currency)}
                    />
                  )}
                />
              </FormField>

              <FormField id="logo" label="Shop Logo" optional>
                <label
                  htmlFor="logo"
                  className={cn(
                    "field-shell group flex cursor-pointer items-center gap-2.5 rounded-xl border border-dashed bg-paper px-3.5 py-2.5 text-sm transition-colors duration-200",
                    logoFile
                      ? "border-violet/40 text-ink"
                      : "border-ink/20 text-ink-faint hover:border-violet/50 hover:text-ink-soft",
                  )}
                >
                  <ImageUp
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 text-ink-faint group-hover:text-violet"
                    aria-hidden="true"
                  />
                  <span className="flex-1 truncate">
                    {logoFile ? logoFile.name : "Choose Logo"}
                  </span>
                  {logoFile && (
                    <button
                      type="button"
                      aria-label="Remove logo"
                      onClick={(e) => {
                        e.preventDefault();
                        setLogoFile(null);
                        if (logoInputRef.current)
                          logoInputRef.current.value = "";
                      }}
                      className="shrink-0 text-ink-faint transition-colors hover:text-coral"
                    >
                      <X size={14} strokeWidth={2.25} />
                    </button>
                  )}
                  <input
                    id="logo"
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </FormField>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className={cn(
                "group relative mt-1 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet/40 hover:brightness-110 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70",
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-white/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:[animation:sheen_0.9s_ease-out]"
              />
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating your shop&hellip;
                </>
              ) : (
                <>
                  Create My Shop
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>
          </form>
        )}
      </AuthCard>
    </AuthShell>
  );
}
