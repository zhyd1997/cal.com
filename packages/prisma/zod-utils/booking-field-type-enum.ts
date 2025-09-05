import { fieldsSchema as formBuilderFieldsSchema } from "@calcom/features/form-builder/schema";
import type { FieldType as FormBuilderFieldType } from "@calcom/features/form-builder/schema";

export const BookingFieldTypeEnum = formBuilderFieldsSchema.element.shape.type.Enum;
export type BookingFieldType = FormBuilderFieldType;
