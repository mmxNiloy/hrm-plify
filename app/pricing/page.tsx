import Icons from "@/components/ui/icons";
import React from "react";

export default function PricingPage() {
  // Overview items
  const overviewItems = [
    {
      plan: "Essential",
      pricing: "£75/month",
      employeesCovered: "Up to 10 employees",
      features:
        "Access to compliance software, document management, sponsorship tracking, basic email support",
    },
    {
      plan: "Professional",
      pricing: "£150/month",
      employeesCovered: "Up to 20 employees",
      features:
        "Includes Essential features + HR compliance consultation (1 session per quarter), assistance with Home Office",
    },
    {
      plan: "Enterprise",
      pricing: "£250/month",
      employeesCovered: "Up to 50 employees",
      features:
        "Includes Professional features + Dedicated HR advisor (monthly check-in), customized compliance strategy, employee visa sponsorship review, priority escalation handling, recruitment assistance",
    },
  ];

  const features = [
    {
      title: "Access to compliance software",
      plans: {
        essential: "yes",
        professional: "yes",
        enterprise: "yes",
      },
    },
    {
      title: "Sponsorship tracking",
      plans: {
        essential: "yes",
        professional: "yes",
        enterprise: "yes",
      },
    },
    {
      title: "Basic email support",
      plans: {
        essential: "yes",
        professional: "yes",
        enterprise: "yes",
      },
    },
    {
      title: "HR compliance consultation",
      plans: {
        essential: "no",
        professional: "Quarterly HR compliance consultation",
        enterprise: "Monthly HR compliance consultation",
      },
    },
    {
      title: "Assistance with Home Office audits",
      plans: {
        essential: "no",
        professional: "yes",
        enterprise: "yes",
      },
    },
    {
      title: "Priority email & phone support",
      plans: {
        essential: "no",
        professional: "yes",
        enterprise: "yes",
      },
    },
    {
      title: "Dedicated HR advisor",
      plans: {
        essential: "no",
        professional: "no",
        enterprise: "yes",
      },
    },
    {
      title: "Customized compliance strategy",
      plans: {
        essential: "no",
        professional: "no",
        enterprise: "yes",
      },
    },
    {
      title: "Employee visa sponsorship review",
      plans: {
        essential: "no",
        professional: "no",
        enterprise: "yes",
      },
    },
    {
      title: "Priority escalation handling",
      plans: {
        essential: "no",
        professional: "no",
        enterprise: "yes",
      },
    },
    {
      title: "Recruitment assistance",
      plans: {
        essential: "no",
        professional: "no",
        enterprise: "yes",
      },
    },
  ];

  // Function to split features and bold text after "+"
  const renderFeatures = (features: string) => {
    const parts = features.split(" + ");
    return (
      <>
        {parts.map((part, index) => (
          <span key={index}>
            {index > 0 && <span className="font-bold"> + </span>}
            <span className={index > 0 ? "font-bold" : ""}>{part}</span>
          </span>
        ))}
      </>
    );
  };

  // Function to render feature status
  const renderFeatureStatus = (status: "yes" | "no" | string) => {
    if (status === "yes")
      return <Icons.boxChecked className="text-green-500" />;
    if (status === "no") return <Icons.boxCrossed className="text-red-500" />;
    return <Icons.boxChecked className="text-green-500" />;
  };

  return (
    <main className="flex flex-col gap-4 md:gap-8 min-h-screen items-center py-6 md:py-8">
      <div className="flex flex-col gap-0.5">
        <p className="text-2xl md:text-4xl lg:text-7xl font-extrabold bg-clip-text text-transparent from-[#e51cd8] to-[#635be8] bg-gradient-to-br">
          Plans
        </p>
        <span className="h-1 rounded-full w-full from-[#f5561c] to-[#bd1cc2] bg-gradient-to-br" />
      </div>

      <section className="w-11/12 flex flex-col md:flex-row gap-6 items-start justify-center">
        {/* Essential Plan Column */}
        <div className="w-full md:w-1/3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Essential
          </h2>
          <p className="text-xl font-semibold text-blue-600 text-center">
            £75/month
          </p>
          <p className="text-gray-600 text-center">Up to 10 employees</p>
          <div className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center">
                  {renderFeatureStatus(feature.plans.essential)}
                </span>
                <span className="text-gray-700">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Plan Column - Popular Choice */}
        <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-200/70 to-blue-100/70 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-400 text-white text-sm font-semibold px-3 py-1 rounded-full">
            Most Popular
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Professional
          </h2>
          <p className="text-xl font-semibold text-blue-600 text-center">
            £150/month
          </p>
          <p className="text-gray-600 text-center">Up to 20 employees</p>
          <div className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center">
                  {renderFeatureStatus(feature.plans.professional)}
                </span>
                <span className="text-gray-700">
                  {feature.plans.professional !== "yes" &&
                  feature.plans.professional !== "no" ? (
                    <>
                      <b>{feature.plans.professional.split(" ")[0]} </b>
                      {feature.plans.professional
                        .split(" ")
                        .filter((item, index) => index > 0)
                        .join(" ")}
                    </>
                  ) : (
                    feature.title
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Plan Column - Highlighted */}
        <div className="w-full md:w-1/3 bg-gradient-to-br from-yellow-200/70 to-yellow-100/70 backdrop-blur-md rounded-2xl shadow-2xl p-6 flex flex-col gap-4 transform md:scale-105 transition-all duration-300 hover:shadow-3xl relative z-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
            Best Value
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Enterprise
          </h2>
          <p className="text-xl font-semibold text-yellow-600 text-center">
            £250/month
          </p>
          <p className="text-gray-600 text-center">Up to 50 employees</p>
          <div className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center">
                  {renderFeatureStatus(feature.plans.enterprise)}
                </span>
                <span className="text-gray-700">
                  {feature.plans.enterprise !== "yes" &&
                  feature.plans.enterprise !== "no" ? (
                    <>
                      <b>{feature.plans.enterprise.split(" ")[0]} </b>
                      {feature.plans.enterprise
                        .split(" ")
                        .filter((item, index) => index > 0)
                        .join(" ")}
                    </>
                  ) : (
                    feature.title
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex w-11/12 flex-col gap-4 items-center justify-center h-screen overflow-clip rounded-[3.25rem] from-[#f5561c]/[0.102] to-[#bd1cc2]/[0.052] bg-gradient-to-bl relative">
        {/* Background circle decors */}
        <div className="absolute -left-[6.25%] -top-1/2 lg:-top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />
        <div className="absolute -right-[6.25%] top-1/2 lg:top-1/3 w-1/2 lg:w-1/3 aspect-square rounded-full from-[#f5561c]/[0.129] to-[#bd1cc2]/[0.129] bg-gradient-to-tr" />

        <p className="text:2xl md:text:4xl lg:text-7xl font-extrabold from-[#f5561c] to-[#bd1cc2] bg-gradient-to-br bg-clip-text text-transparent">
          Overview
        </p>
        <div className="w-full max-w-5xl px-4 md:px-6">
          <table className="w-full overflow-clip bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-4 px-6 font-bold text-left">Plan</th>
                <th className="py-4 px-6 font-bold text-left">Pricing</th>
                <th className="py-4 px-6 font-bold text-left">
                  Employees Covered
                </th>
                <th className="py-4 px-6 font-bold text-left">
                  Features & Services
                </th>
              </tr>
            </thead>
            <tbody>
              {overviewItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200/50 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <td className="py-4 px-6 font-bold text-gray-800">
                    {item.plan}
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    <span className="font-bold">{item.pricing}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    {item.employeesCovered}
                  </td>
                  <td className="py-4 px-6 text-gray-700 max-w-md">
                    {renderFeatures(item.features)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
