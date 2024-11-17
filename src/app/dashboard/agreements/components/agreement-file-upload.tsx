import FileUpload from '@/components/ui/file-upload'
import { useFormContext } from 'react-hook-form'

interface AgreementFileUploadProps {
  title?: string
  description?: string
  acceptedFormats?: string
  maxSize?: string
}

export function AgreementFileUpload({
  title = 'Supporting Documents',
  description = 'Upload property documentation and other relevant files',
  acceptedFormats = 'Images (PNG, JPG, GIF, WEBP), Documents (PDF, DOC, DOCX), Spreadsheets (XLS, XLSX, CSV), Presentations (PPT, PPTX), Others (SVG, TXT, ZIP, RAR)',
  maxSize = '15MB',
}: AgreementFileUploadProps) {
  const form = useFormContext()
  const files = form.watch('files') || []

  const handleFilesUploaded = (newFiles: File | File[] | null) => {
    form.setValue('files', newFiles ? (Array.isArray(newFiles) ? newFiles : [newFiles]) : [])
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-lg font-semibold'>{title}</h2>
      <FileUpload
        files={files}
        uploadMode='multi'
        defaultText={description}
        otherText={`Accepted formats: ${acceptedFormats} (Max: ${maxSize} per file)`}
        maxSize={15 * 1024 * 1024}
        acceptedFileTypes={{
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
          // Spreadsheets
          'application/vnd.ms-excel': ['.xls'],
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
          'text/csv': ['.csv'],
          // Presentations
          'application/vnd.ms-powerpoint': ['.ppt'],
          'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
          // Others
          'text/plain': ['.txt'],
          'application/zip': ['.zip'],
          'application/x-zip-compressed': ['.zip'],
          'application/x-rar-compressed': ['.rar'],
        }}
        onFilesUploaded={handleFilesUploaded}
        errors={form.formState.errors.files?.message as string}
      />
    </div>
  )
}
