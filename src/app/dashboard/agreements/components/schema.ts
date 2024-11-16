import { z } from 'zod'

export const tenancySchema = z.object({
  landlordName: z.string(),
  landlordAddress: z.string(),
  tenantName: z.string(),
  tenantAddress: z.string(),
  amount: z.string(),
  propertyDescription: z.string(),
  duration: z.string(),
  files: z.array(
    z.string().refine(
      (file) => {
        // Convert base64 string to bytes and check if less than 10MB
        const sizeInBytes = Buffer.from(file, 'base64').length
        const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes
        return sizeInBytes <= MAX_FILE_SIZE
      },
      {
        message: 'File size must be less than 10MB',
      },
    ),
  ),
})

export const salesSchema = z.object({
  vendorName: z.string(),
  purchaserName: z.string(),
  propertyDescription: z.string(),
  amount: z.number(),
  files: z.array(
    z.string().refine((file) => Buffer.from(file, 'base64').length <= 10 * 1024 * 1024, {
      message: 'File size must be less than 10MB',
    }),
  ),
})

export const deedSchema = z.object({
  assignorName: z.string(),
  assignorAddress: z.string(),
  assigneeName: z.string(),
  assigneeAddress: z.string(),
  propertyDescription: z.string(),
  duration: z.string(),
  amount: z.number(),
  files: z.array(
    z.string().refine((file) => Buffer.from(file, 'base64').length <= 10 * 1024 * 1024, {
      message: 'File size must be less than 10MB',
    }),
  ),
})

export const powerSchema = z.object({
  donorName: z.string(),
  donorAddress: z.string(),
  doneeName: z.string(),
  doneeAddress: z.string(),
  propertyDescription: z.string(),
  files: z.array(
    z.string().refine((file) => Buffer.from(file, 'base64').length <= 10 * 1024 * 1024, {
      message: 'File size must be less than 10MB',
    }),
  ),
})

export const loanSchema = z.object({
  lenderName: z.string(),
  borrowerName: z.string(),
  interestRate: z.number(),
  duration: z.string(),
  amount: z.number(),
  files: z.array(
    z.string().refine((file) => Buffer.from(file, 'base64').length <= 10 * 1024 * 1024, {
      message: 'File size must be less than 10MB',
    }),
  ),
})

export const leaseSchema = z.object({
  leaserName: z.string(),
  leaserAddress: z.string(),
  lesseeName: z.string(),
  lesseeAddress: z.string(),
  propertyDescription: z.string(),
  duration: z.string(),
  amount: z.number(),
  files: z.array(
    z.string().refine((file) => Buffer.from(file, 'base64').length <= 10 * 1024 * 1024, {
      message: 'File size must be less than 10MB',
    }),
  ),
})
