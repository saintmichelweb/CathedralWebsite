export enum PortalUserStatus {
  UNVERIFIED = "Unverified",
  RESETPASSWORD = "Reset Password",
  ACTIVE = "Active",
  DISABLED = "Disabled",
}

export enum CommonStatusType {
  COMPLETED = 'Completed',
  PROCESSING = 'Processing',
  FAILED = 'Failed'
}

export enum StatusType {
  ACTIVATED = 'Activated',
  DEACTIVATED = 'Deactivated'
}

export enum MassDaysEnum {
  WEEKDAYS = 'Monday - Friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

export const MassDaysEnumFrAndRW = {
  WEEKDAYS : {
    fr: 'Lundi - Vendredi',
    rw: 'Kuwa Mbere - Kuwa Gatanu'
  },
  SATURDAY : {
    fr: 'Samedi',
    rw: 'Kuwa Gatandatu'
  },
  SUNDAY : {
    fr: 'Dimanche',
    rw: 'Kuwa Cyumweru'
  } 
}