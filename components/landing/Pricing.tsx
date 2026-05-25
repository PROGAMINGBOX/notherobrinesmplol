import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Get started with basic compliance monitoring.",
    features: [
      "Up to 5 tracked regulations",
      "1 region",
      "Basic email alerts",
      "Community support",
    ],
    cta: "Start Free",
    ctaHref: "/signup",
    ctaVariant: "outline" as const,
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Everything you need for growing teams.",
    features: [
      "Unlimited regulations",
      "All regions",
      "Priority alerts",
      "Team collaboration (up to 5 members)",
      "API access",
      "Slack integration",
    ],
    cta: "Start Pro Trial",
    ctaHref: "/signup",
    ctaVariant: "primary" as const,
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced needs.",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "SSO/SAML",
    ],
    cta: "Contact Sales",
    ctaHref: "#",
    ctaVariant: "outline" as const,
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Choose the plan that fits your team. No hidden fees.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 ${
                tier.featured
                  ? "border-primary-500 bg-white shadow-lg scale-105 dark:border-primary-400 dark:bg-gray-900"
                  : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge color="blue" size="md">
                    Most Popular
                  </Badge>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {tier.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {tier.description}
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  variant={tier.ctaVariant}
                  size="md"
                  href={tier.ctaHref}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
