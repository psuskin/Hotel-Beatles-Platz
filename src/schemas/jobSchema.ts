import * as z from "zod"

const MAX_FILE_SIZE = 4 * 1024 * 1024

const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

const fileSchema = z.custom<File>((value) => value instanceof File, {
    message: "Please upload a resume file",
})
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 4MB.`)
    .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file.type),
        "Only .pdf, .doc, and .docx files are accepted."
    );

export const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().optional(),
    resume: fileSchema,
    coverLetter: z.any().optional(), 
})
