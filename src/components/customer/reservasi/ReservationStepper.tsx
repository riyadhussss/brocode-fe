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
    <div className="mb-4 sm:mb-6 md:mb-8">
      {/* Horizontal Stepper with scroll on mobile */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-center relative px-4 sm:px-6 gap-2 sm:gap-0 sm:justify-between">
          {/* Steps */}
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative z-10 flex-shrink-0">
                  {/* Circle */}
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted || isCurrent
                        ? "bg-[#FDFB03] text-black"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {isCompleted ? (
                      <FaCheckCircle className="text-xl sm:text-2xl" />
                    ) : (
                      <StepIcon className="text-xl sm:text-2xl" />
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`mt-2 text-xs sm:text-sm text-center whitespace-nowrap px-1 sm:px-2 ${
                      isCurrent ? "font-semibold text-black" : "text-gray-600"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Line between steps */}
                {index < steps.length - 1 && (
                  <div
                    className="flex-1 h-1 min-w-[30px] sm:min-w-[40px] mx-1 sm:mx-2 relative"
                    style={{ marginTop: "-32px" }}
                  >
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
    </div>
  );
}
