'use client'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import api from '@/services/http.service'
import { toast } from 'sonner'

type AgreementType =
  | 'tenancy'
  | 'sales'
  | 'deed of assignment'
  | 'power of attorney'
  | 'loan'
  | 'lease'

interface PaymentButtonProps {
  agreementId: string | null
  agreementType: AgreementType
  amount?: number
  buttonText?: string
  loadingText?: string
}

interface PaymentResponse {
  data: {
    authorization_url: string
    reference: string
  }
}

interface PaymentPayload {
  amount: number
  agreementId: string
  type: AgreementType
}

const DEFAULT_AMOUNT = 5000 // 5000 naira
const DEFAULT_BUTTON_TEXT = 'Pay for Consultation'
const DEFAULT_LOADING_TEXT = 'Processing...'

function createPaymentPayload(props: PaymentButtonProps): PaymentPayload {
  return {
    amount: props.amount ?? DEFAULT_AMOUNT,
    agreementId: props.agreementId ?? '',
    type: props.agreementType,
  }
}

export default function PaymentButton({
  agreementId,
  agreementType,
  amount = DEFAULT_AMOUNT,
  buttonText = DEFAULT_BUTTON_TEXT,
  loadingText = DEFAULT_LOADING_TEXT,
}: PaymentButtonProps) {
  const { mutate: initializePayment, isPending } = useMutation<PaymentResponse, Error>({
    mutationFn: async () => {
      const payload = createPaymentPayload({ agreementId, agreementType, amount })
      console.log('payload', payload)
      const response = await api.post<PaymentResponse>('/payments/initialize', payload)
      console.log('response', response)
      return response.data
    },
    onSuccess: (data) => {
      if (data?.data?.authorization_url) {
        window.location.href = data.data.authorization_url
      } else {
        throw new Error('Invalid payment authorization URL')
      }
    },
    onError: (error) => {
      const errorMessage = error?.message || 'Failed to initialize payment'
      toast.error(errorMessage)
    },
  })

  return (
    <Button
      onClick={() => initializePayment()}
      disabled={isPending}
      className='w-full sm:w-auto mb-6'>
      {isPending ? loadingText : buttonText}
    </Button>
  )
}
