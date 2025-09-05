import z from "zod";

export const sendDailyVideoRecordingEmailsSchema = z.object({
  recordingId: z.string(),
  bookingUID: z.string(),
});
