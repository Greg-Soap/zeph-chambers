import type {
  SingleDeed,
  SingleLease,
  SingleLoan,
  SinglePower,
  SingleSale,
  SingleTenancy,
} from '@/types/agreements'
import api, { multipartHeaders } from './http.service'

class AgreementsService {
  static createDeedOfAssignment(data: SingleDeed) {
    return api.post<{ message: string }>('/agreements/deed', data, multipartHeaders)
  }
  static updateDeedOfAssignment(data: SingleDeed) {
    return api.put<{ message: string }>(`/agreements/deed/${data.id}`, data, multipartHeaders)
  }
  static deleteDeedOfAssignment(id: string) {
    return api.delete<{ message: string }>(`/agreements/deed/${id}`)
  }
  static getDeedOfAssignment(id: string) {
    return api.get<SingleDeed>(`/agreements/deed/${id}`)
  }
  static getAllDeedOfAssignments() {
    return api.get<SingleDeed[]>('/agreements/deed')
  }

  static createLeaseAgreement(data: SingleLease) {
    return api.post<{ message: string }>('/agreements/lease', data, multipartHeaders)
  }
  static updateLeaseAgreement(data: SingleLease) {
    return api.put<{ message: string }>(`/agreements/lease/${data.id}`, data, multipartHeaders)
  }
  static deleteLeaseAgreement(id: string) {
    return api.delete<{ message: string }>(`/agreements/lease/${id}`)
  }
  static getLeaseAgreement(id: string) {
    return api.get<SingleLease>(`/agreements/lease/${id}`)
  }
  static getAllLeaseAgreements() {
    return api.get<SingleLease[]>('/agreements/lease')
  }

  static createLoanAgreement(data: SingleLoan) {
    return api.post<{ message: string }>('/agreements/loan', data, multipartHeaders)
  }
  static updateLoanAgreement(data: SingleLoan) {
    return api.put<{ message: string }>(`/agreements/loan/${data.id}`, data, multipartHeaders)
  }
  static deleteLoanAgreement(id: string) {
    return api.delete<{ message: string }>(`/agreements/loan/${id}`)
  }
  static getLoanAgreement(id: string) {
    return api.get<SingleLoan>(`/agreements/loan/${id}`)
  }
  static getAllLoanAgreements() {
    return api.get<SingleLoan[]>('/agreements/loan')
  }

  static createPowerOfAttorney(data: SinglePower) {
    return api.post<{ message: string }>('/agreements/power', data, multipartHeaders)
  }
  static updatePowerOfAttorney(data: SinglePower) {
    return api.put<{ message: string }>(`/agreements/power/${data.id}`, data, multipartHeaders)
  }
  static deletePowerOfAttorney(id: string) {
    return api.delete<{ message: string }>(`/agreements/power/${id}`)
  }
  static getPowerOfAttorney(id: string) {
    return api.get<SinglePower>(`/agreements/power/${id}`)
  }
  static getAllPowerOfAttorneys() {
    return api.get<SinglePower[]>('/agreements/power')
  }

  static createSaleAgreement(data: SingleSale) {
    return api.post<{ message: string }>('/agreements/sale', data, multipartHeaders)
  }
  static updateSaleAgreement(data: SingleSale) {
    return api.put<{ message: string }>(`/agreements/sale/${data.id}`, data, multipartHeaders)
  }
  static deleteSaleAgreement(id: string) {
    return api.delete<{ message: string }>(`/agreements/sale/${id}`)
  }
  static getSaleAgreement(id: string) {
    return api.get<SingleSale>(`/agreements/sale/${id}`)
  }
  static getAllSaleAgreements() {
    return api.get<SingleSale[]>('/agreements/sale')
  }

  static createTenancyAgreement(data: SingleTenancy) {
    return api.post<{ message: string }>('/agreements/tenancy', data, multipartHeaders)
  }
  static updateTenancyAgreement(data: SingleTenancy) {
    return api.put<{ message: string }>(`/agreements/tenancy/${data.id}`, data, multipartHeaders)
  }
  static deleteTenancyAgreement(id: string) {
    return api.delete<{ message: string }>(`/agreements/tenancy/${id}`)
  }
  static getTenancyAgreement(id: string) {
    return api.get<SingleTenancy>(`/agreements/tenancy/${id}`)
  }
  static getAllTenancyAgreements() {
    return api.get<SingleTenancy[]>('/agreements/tenancy')
  }

  static sendLitigationMessage(data: {
    litigation: string
    message: string
    email?: string
    fullName?: string
  }) {
    return api.post<{ message: string }>('/messages/litigations/message', data)
  }

  static sendIncorporationMessage(data: {
    message: string
    email?: string
    fullName?: string
  }) {
    return api.post<{ message: string }>('/messages/incorporations/message', data)
  }
}

const agreementsService = AgreementsService

export default agreementsService
