import { z } from 'zod'

const ALLOWED_FILE_TYPES = {
  // Images
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
  'image/svg+xml': ['.svg'],
  // Videos
  'video/mp4': ['.mp4'],
  'video/mpeg': ['.mpeg'],
  'video/quicktime': ['.mov'],
  // Documents
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-powerpoint': ['.ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  // Spreadsheets
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  // Text
  'text/plain': ['.txt'],
  // CSV
  'text/csv': ['.csv'],
  'application/csv': ['.csv'],
  // Archives
  'application/zip': ['.zip'],
  'application/x-zip-compressed': ['.zip'],
  'application/x-rar-compressed': ['.rar'],
} as const

const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB in bytes

const fileSchema = z.array(
  z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'File size must be less than 15MB',
    })
    .refine((file) => Object.keys(ALLOWED_FILE_TYPES).includes(file.type), {
      message:
        'Invalid file type. Allowed types: images, videos, documents, spreadsheets, presentations, archives',
    }),
)

export const tenancySchema = z.object({
  landlordName: z.string(),
  landlordAddress: z.string(),
  tenantName: z.string(),
  tenantAddress: z.string(),
  amount: z.string(),
  propertyDescription: z.string(),
  duration: z.string(),
  files: fileSchema.optional(),
})

export const salesSchema = z.object({
  vendorName: z.string(),
  purchaserName: z.string(),
  propertyDescription: z.string(),
  amount: z.string(),
  files: fileSchema.optional(),
})

export const deedSchema = z.object({
  assignorName: z.string(),
  assignorAddress: z.string(),
  assigneeName: z.string(),
  assigneeAddress: z.string(),
  propertyDescription: z.string(),
  duration: z.string(),
  amount: z.string(),
  files: fileSchema.optional(),
})

export const powerSchema = z.object({
  donorName: z.string(),
  donorAddress: z.string(),
  doneeName: z.string(),
  doneeAddress: z.string(),
  propertyDescription: z.string(),
  files: fileSchema.optional(),
})

export const loanSchema = z.object({
  lenderName: z.string(),
  borrowerName: z.string(),
  interestRate: z.number(),
  duration: z.string(),
  amount: z.string(),
  files: fileSchema.optional(),
})

export const leaseSchema = z.object({
  leaserName: z.string(),
  leaserAddress: z.string(),
  lesseeName: z.string(),
  lesseeAddress: z.string(),
  propertyDescription: z.string(),
  duration: z.string(),
  amount: z.string(),
  files: fileSchema.optional(),
})
