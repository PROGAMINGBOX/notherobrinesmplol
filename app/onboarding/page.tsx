"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

const BUSINESS_TYPES = [
  "SaaS",
  "E-commerce",
  "Mobile App",
  "Fintech",
  "Healthcare",
  "EdTech",
  "Marketplace",
  "Other",
];

const TECH_STACK_OPTIONS = [
  "iOS/App Store",
  "Android/Play Store",
  "Web Application",
  "React/Next.js",
  "Node.js",
  "Python",
  "AWS",
  "GCP",
  "Azure",
  "Stripe/Payments",
  "Database/SQL",
  "Docker/Kubernetes",
];

const REGION_OPTIONS = [
  { value: "EU", label: "EU (GDPR)" },
  { value: "US-California", label: "US - California (CCPA/CPRA)" },
  { value: "US-Federal", label: "US - Federal" },
  { value: "UK", label: "United Kingdom" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "Brazil", label: "Brazil" },
  { value: "Global", label: "Global" },
  { value: "Singapore", label: "Singapore" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canProceed =
    (step === 1 && businessType !== "") ||
    (step === 2 && techStack.length > 0) ||
    (step === 3 && regions.length > 0);

  const toggleTechStack = (item: string) => {
    setTechStack((prev) =>
      prev.includes(item) ? prev.filter((t) => t !== item) : [...prev, item]
    );
  };

  const toggleRegion = (value: string) => {
    setRegions((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessType, techStack, regions }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Set up your compliance profile
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Step {step} of 3
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mb-8">
          <div
            className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Step 1: Business Type */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              What type of business do you run?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {BUSINESS_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setBusinessType(type)}
                  className={`p-4 rounded-lg border-2 text-sm font-medium transition-all ${
                    businessType === type
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Tech Stack */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              What technologies do you use?
            </h2>
            <div className="flex flex-wrap gap-3">
              {TECH_STACK_OPTIONS.map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleTechStack(tech)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    techStack.includes(tech)
                      ? "bg-primary-600 dark:bg-primary-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Regions */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Which regions do you operate in?
            </h2>
            <div className="space-y-2">
              {REGION_OPTIONS.map((region) => (
                <button
                  key={region.value}
                  onClick={() => toggleRegion(region.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    regions.includes(region.value)
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 1}
          >
            Back
          </Button>
          {step < 3 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed}
              loading={loading}
            >
              Complete Setup
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
