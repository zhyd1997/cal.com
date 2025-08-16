// Export specific Prisma client components instead of using export *
export { PrismaClient } from "@prisma/client";
export { Prisma } from "@prisma/client";
export { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError, PrismaClientInitializationError, PrismaClientValidationError } from "@prisma/client";

// Export enums and types that are commonly used as values
export { 
  MembershipRole,
  SMSLockState,
  WorkflowTriggerEvents,
  WebhookTriggerEvents,
  PeriodType,
  WorkflowActions,
  WorkflowTemplates,
  WorkflowMethods,
  SchedulingType,
  RRResetInterval,
  RRTimestampBasis,
  BookingStatus,
  RedirectType,
  IdentityProvider,
  AppCategories,
  UserPermissionRole,
  AttributeType,
  AttributeOption
} from "@prisma/client";

// Export all the model types that the project needs
export type {
  User,
  Team,
  EventType,
  Booking,
  BookingReference,
  Credential,
  DestinationCalendar,
  SelectedCalendar,
  Availability,
  Membership,
  Profile,
  Webhook,
  ApiKey,
  Payment,
  OrganizationOnboarding,
  WorkflowStep,
  WorkflowReminder,
  EventTypeTranslation,
  FilterSegment,
  UserFilterSegmentPreference,
  Attribute,
  AttributeToUser,
  Role,
  RolePermission,
  App_RoutingForms_Form,
  App_RoutingForms_FormResponse,
  OrganizationSettings,
  UserPassword,
  CalVideoSettings,
  Host,
  HostGroup,
  Attendee,
  EventTypeCustomInput,
  ReminderMail,
  Schedule,
  Avatar
} from "@prisma/client";
