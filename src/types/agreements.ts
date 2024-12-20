export interface Files {
  createdAt: string
  fileableId: string
  fileableType: string
  id: string
  isArchived: boolean
  originalName: string
  publicId: string
  resourceType: string
  secureUrl: string
  updatedAt: string
  userId: string
}

interface User {
  id: string
  fullName: string
  email: string
  isArchived: boolean
}

export interface SingleTenancy {
  id?: string
  landlordName: string
  landlordAddress: string
  tenantName: string
  tenantAddress: string
  propertyDescription: string
  duration: string
  amount: number
  uploadedFiles?: Files[]
  user?: User
  metadata?: {
    status: 'paid' | 'unpaid'
  }
}

export interface SingleSale {
  id?: string
  vendorName: string
  purchaserName: string
  propertyDescription: string
  amount: number
  uploadedFiles?: Files[]
  user?: User
  metadata?: {
    status: 'paid' | 'unpaid'
  }
}

export interface SingleDeed {
  id?: string
  assignorName: string
  assignorAddress: string
  assigneeName: string
  assigneeAddress: string
  propertyDescription: string
  duration: string
  amount: number
  uploadedFiles?: Files[]
  user?: User
  metadata?: {
    status: 'paid' | 'unpaid'
  }
}

export interface SinglePower {
  id?: string
  donorName: string
  donorAddress: string
  doneeName: string
  doneeAddress: string
  propertyDescription: string
  uploadedFiles?: Files[]
  user?: User
  metadata?: {
    status: 'paid' | 'unpaid'
  }
}

export interface SingleLoan {
  id?: string
  lenderName: string
  borrowerName: string
  interestRate: number
  duration: string
  amount: number
  uploadedFiles?: Files[]
  user?: User
  metadata?: {
    status: 'paid' | 'unpaid'
  }
}

export interface SingleLease {
  id?: string
  leaserName: string
  leaserAddress: string
  lesseeName: string
  lesseeAddress: string
  propertyDescription: string
  duration: string
  amount: number
  uploadedFiles?: Files[]
  user?: User
  metadata?: {
    status: 'paid' | 'unpaid'
  }
}

export interface Tenancies {
  data: SingleTenancy[]
  meta: {
    total: number
  }
}

export interface Sales {
  data: SingleSale[]
  meta: {
    total: number
  }
}

export interface Deeds {
  data: SingleDeed[]
  meta: {
    total: number
  }
}

export interface Powers {
  data: SinglePower[]
  meta: {
    total: number
  }
}

export interface Loans {
  data: SingleLoan[]
  meta: {
    total: number
  }
}

export interface Leases {
  data: SingleLease[]
  meta: {
    total: number
  }
}
