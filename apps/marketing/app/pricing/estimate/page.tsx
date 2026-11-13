import { Suspense } from 'react';
import { ProjectEstimatorWizard } from '@/components/estimator/ProjectEstimatorWizard';

export default function PricingEstimatePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
          در حال بارگذاری برآوردگر…
        </main>
      }
    >
      <ProjectEstimatorWizard />
    </Suspense>
  );
}
