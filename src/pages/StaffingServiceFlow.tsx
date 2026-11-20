import { ArchitectureOfferingsWorkflow } from '../components/common/ArchitectureOfferingsWorkflow';
import { EnterpriseArchitectureJourney } from '../components/common/EnterpriseArchitectureJourney';
import { StaffingCapabilitiesOrbit } from './StaffingCapabilitiesOrbit';
import type { ServiceItem } from '../types';

export function StaffingServiceFlow({
  service,
  offerings = service.capabilities,
}: {
  service: ServiceItem;
  offerings?: ServiceItem['capabilities'];
}) {
  return (
    <>
      <ArchitectureOfferingsWorkflow
        title={service.offeringsTitle || `${service.title} Services`}
        description={service.offeringsSubtitle || service.shortDesc}
        services={offerings}
        ariaLabel={service.title}
      />
      <EnterpriseArchitectureJourney
        title={service.processTitle || `Why Choose Prakvi for ${service.title}?`}
        description={service.processSubtitle || 'Our approach to service delivery.'}
        steps={service.deliverySteps}
        ariaLabel={service.title}
      />
      <StaffingCapabilitiesOrbit
        title={service.stackTitle || `${service.title} Capabilities`}
        description={service.stackSummary || service.shortDesc}
        tabs={service.stackTabs || []}
        idPrefix={service.slug === 'staffing' ? 'staffing-capability' : `${service.slug}-capability`}
      />
    </>
  );
}
