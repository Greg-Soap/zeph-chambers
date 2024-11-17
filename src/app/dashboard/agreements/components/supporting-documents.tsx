import type { Files } from '@/types/agreements'
import { Button } from '@/components/ui/button'
import { Download, ExternalLink } from 'lucide-react'

export default function SupportingDocuments({ files }: { files: Files[] }) {
  function getFileFormat(fileName: string): string {
    const extension = fileName.split('.').pop()?.toUpperCase() || 'Unknown'
    return extension
  }

  function handleDownload(file: Files) {
    const link = document.createElement('a')
    link.href = file.secureUrl
    link.download = file.originalName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function handleOpenExternal(url: string) {
    window.open(url, '_blank')
  }

  return (
    <div className='rounded-lg border p-6 space-y-4'>
      <h2 className='text-lg font-semibold'>Supporting Documents</h2>
      {files && files.length > 0 ? (
        <div className='space-y-4'>
          {files.map((file) => (
            <div key={file.id} className='flex items-center justify-between p-3 border rounded-lg'>
              <div className='space-y-1'>
                <p className='text-base font-medium'>{file.originalName}</p>
                <p className='text-sm text-muted-foreground'>{getFileFormat(file.originalName)}</p>
              </div>
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => handleOpenExternal(file.secureUrl)}
                  title='Open in new tab'>
                  <ExternalLink className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => handleDownload(file)}
                  title='Download file'>
                  <Download className='h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-sm text-muted-foreground'>No documents uploaded</p>
      )}
    </div>
  )
}
