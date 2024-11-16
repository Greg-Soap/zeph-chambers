import type {
  SingleDeed,
  SingleLease,
  SingleLoan,
  SinglePower,
  SingleSale,
  SingleTenancy,
} from '@/types/agreements'
import api from './http.service'

class AgreementsService {
  static createDeedOfAssignment(data: SingleDeed) {
    return api.post<{ message: string }>('/agreements/deed-of-assignment', data)
  }
  static updateDeedOfAssignment(data: SingleDeed) {
    return api.put<{ message: string }>(`/agreements/deed-of-assignment/${data.id}`, data)
  }
  static deleteDeedOfAssignment(id: string) {
    return api.delete<{ message: string }>(`/agreements/deed-of-assignment/${id}`)
  }
  static getDeedOfAssignment(id: string) {
    return api.get<SingleDeed>(`/agreements/deed-of-assignment/${id}`)
  }
  static getAllDeedOfAssignments() {
    return api.get<SingleDeed[]>('/agreements/deed-of-assignment')
  }

  static createLeaseAgreement(data: SingleLease) {
    return api.post<{ message: string }>('/agreements/lease', data)
  }
  static updateLeaseAgreement(data: SingleLease) {
    return api.put<{ message: string }>(`/agreements/lease/${data.id}`, data)
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
    return api.post<{ message: string }>('/agreements/loan', data)
  }
  static updateLoanAgreement(data: SingleLoan) {
    return api.put<{ message: string }>(`/agreements/loan/${data.id}`, data)
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
    return api.post<{ message: string }>('/agreements/power-of-attorney', data)
  }
  static updatePowerOfAttorney(data: SinglePower) {
    return api.put<{ message: string }>(`/agreements/power-of-attorney/${data.id}`, data)
  }
  static deletePowerOfAttorney(id: string) {
    return api.delete<{ message: string }>(`/agreements/power-of-attorney/${id}`)
  }
  static getPowerOfAttorney(id: string) {
    return api.get<SinglePower>(`/agreements/power-of-attorney/${id}`)
  }
  static getAllPowerOfAttorneys() {
    return api.get<SinglePower[]>('/agreements/power-of-attorney')
  }

  static createSaleAgreement(data: SingleSale) {
    return api.post<{ message: string }>('/agreements/sale', data)
  }
  static updateSaleAgreement(data: SingleSale) {
    return api.put<{ message: string }>(`/agreements/sale/${data.id}`, data)
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
    return api.post<{ message: string }>('/agreements/tenancy', data)
  }
  static updateTenancyAgreement(data: SingleTenancy) {
    return api.put<{ message: string }>(`/agreements/tenancy/${data.id}`, data)
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
}

const agreementsService = AgreementsService

export default agreementsService
