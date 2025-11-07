import React from "react";
import { IconType } from "react-icons";
import { FaCheckCircle } from "react-icons/fa";

interface Step {
  id: number;
  label: string;
  icon: IconType;
}

interface ReservationStepperProps {
  steps: Step[];
  currentStep: number;
}

export default function ReservationStepper({
  steps,
  currentStep,
}: ReservationStepperProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center relative px-6">
        {/* Steps */}
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative z-10">
                {/* Circle */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted || isCurrent
                      ? "bg-[#FDFB03] text-black"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {isCompleted ? (
                    <FaCheckCircle className="text-2xl" />
                  ) : (
                    <StepIcon className="text-2xl" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`mt-2 text-xs md:text-sm text-center max-w-[100px] ${
                    isCurrent ? "font-semibold text-black" : "text-gray-600"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Line between steps */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 relative top-[-20px]">
                  <div className="h-full bg-gray-300"></div>
                  {currentStep > step.id && (
                    <div className="absolute top-0 left-0 h-full bg-[#FDFB03] w-full transition-all duration-300"></div>
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
